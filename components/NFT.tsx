'use client'

import React, { FC, useState } from 'react'

import { useContractRead, type Address } from 'wagmi'

import { abi } from '../utils/nft_abi'

type Props = {
    id: Number;
    name: string;
    address: string;
}

export const NFT: FC<Props> = ({id, name, address}) => {

    const [ uri, setUri ] = useState<string>('')

    const test = async (tokenUri: any) => {
        const uri = process.env.NEXT_PUBLIC_IPFS_PATH + tokenUri

        const res = await fetch(uri, {
            method: "GET"
        })

        const resData = await res.json()
        setUri(process.env.NEXT_PUBLIC_IPFS_PATH + (resData.image).split('//')[1])
    }

    const { data, isError, isLoading} = useContractRead({
        address: address as Address,
        abi: abi,
        functionName: "tokenURI",
        args: [id],
        onSuccess: async res => {
            await test(res)
        }
    })

    return(
        <div style={{'border': "1px solid red", "display": "flex", "width": "25%", "flexDirection": "column"}}>
            <p>name nft collection: {name}</p>
            <p>ID nft: {id.toString()}</p>
            <p>contract address collection: {address}</p>
            <figure>img nft <img src={uri} style={{"width": "150px", "height": "auto"}} className='img-thumbnail'/></figure>
        </div>
    )
}
