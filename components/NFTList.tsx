'use client'

import { useState, FC, useEffect } from 'react'
import { BaseError } from 'viem'
import { type Address, useAccount, useContractReads } from 'wagmi'
import { abi } from '../utils/nft_abi'
import { Abi } from 'viem'
import Link from 'next/link'

import { NFT } from './NFT'

type Props = {
    collectionAddress: Address
}

export const NFTList: FC<Props> = ({ collectionAddress }) => {

    const [count, setCount] = useState<any[]>([])
    const { address } = useAccount()

    const collectionContract = {
        address: collectionAddress,
        abi: abi as Abi,
    }

    const { data, error, isLoading, isSuccess, refetch, isRefetching } = useContractReads({
        contracts: [
            {
                ...collectionContract,
                functionName: 'balanceOf',
                args: [String(address)],
            },
            {
                ...collectionContract,
                functionName: 'name',
            },
        ],
        onSuccess: (res) => {
            let array: any[] = []
            if (!isLoading && isSuccess && data) {
                for (let i = 0; i < Number(data[0]?.result); i++) {
                    array[i] = i
                }
                setCount(array)
            }
        }
    })



    return (
        <div>
            {error && <div>{(error as BaseError).shortMessage}</div>}
            <div>
                {
                    data && Number(data?.[0]?.result) > 0 ? count.map((id, key) => {
                        if(Number(data[0]?.result) > id){
                            return <NFT key={key} id={id} name={String(data?.[1]?.result)} address={collectionAddress} />
                        }
                        
                    })
                        :
                        <h4>Your no nft in this collection, <Link href="/user/create" className='underline'>create nft</Link>.</h4>
                }

            </div>
        </div>
    )
}

