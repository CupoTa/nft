'use client'

import { useState, FC, useEffect } from 'react'
import { BaseError } from 'viem'
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite, type Address, useAccount, useContractRead } from 'wagmi'

import { stringify } from '../utils/stringify'
import { useDebounce } from '../hooks/useDebounce'
import SelectCollections from './SelectCollections'
import { abi } from '../utils/nft_abi'
import axios from 'axios'

type Props = {
    collectionAddress: Address
}

export const MintNFTCollection: FC<Props> = ({ collectionAddress }) => {

    const [tokenUri, setTokenUri] = useState<any>('')
    const [file, setFile] = useState<File>()
    const [value, setValue] = useState<any>("")
    const debouncedTokenUri = useDebounce(tokenUri)
    const [infoToken, setInfoToken] = useState<any>({
        name: '',
        description: ''
    })
    const { address } = useAccount()

    const [errorData, setErrorData] = useState('')

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: value,
        abi: abi,
        functionName: 'safeMint',
        enabled: Boolean(debouncedTokenUri) && Boolean(value),
        args: [address, String(debouncedTokenUri)],
    })

    const { write, data, error, isLoading, isError } = useContractWrite(config)
    const {
        data: receipt,
        isLoading: isPending,
        isSuccess,
    } = useWaitForTransaction({ hash: data?.hash })

    const uploadMetadata = async (name: string, description: string, external_url: string, CID: string) => {
        try {
            const data = JSON.stringify({
                pinataContent: {
                    name: `${name}`,
                    description: `${description}`,
                    external_url: `${external_url}`,
                    image: `ipfs://${CID}`,
                },
                pinataMetadata: {
                    name: name,
                },
            });

            const res = await axios("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
                },
                data: data
            })
            const resData = await res.data
            console.log("Metadata uploaded, CID:", resData?.IpfsHash)
            setTokenUri(resData?.IpfsHash)
        } catch (error) {
            console.log(error)
        }
    }


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) {
            setErrorData("File empty")
            return
        }
        if (!Boolean(value)) {
            setErrorData("No selected collection")
            return
        }

        try {
            const data = new FormData()
            data.append('file', file)



            const pinData = JSON.stringify({
                name: infoToken.name
            })
            data.append('pinataMetadata', pinData)

            const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
                },
                body: data as any
            })
            const resData = await res.json()
            // if (!resData.ok) throw new Error(await res.text())
            console.log("File uploaded, CID:", resData.IpfsHash)

            await uploadMetadata(infoToken.name, infoToken.description, "https://wishpower.io", resData.IpfsHash)


        } catch (e: any) {
            // Handle errors here
            console.error(e)
        }
    }


    return (
        <>
            <h3>Mint a NFT</h3>

            <p>Select active collection <SelectCollections value={value} setValue={setValue} /></p>


            {
                Boolean(errorData) && <div className="alert alert-danger" role="alert">{errorData}</div>
            }
            <form onSubmit={(e) => {
                e.preventDefault()
                onSubmit(e)
            }}>
                <input
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                />
                <input
                required
                    placeholder="Name"
                    onChange={(e) => setInfoToken({
                        name: e.target.value,
                        description: infoToken.description
                    })
                    }
                />
                <input
                required
                    placeholder="Description"
                    onChange={(e) => setInfoToken({
                        name: infoToken.name,
                        description: e.target.value
                    })
                    }
                />
                <input type="submit" value="Upload" disabled={!Boolean(value)}/>
            </form>

            <button disabled={!write} type="submit" onClick={() => write?.()}>
                Mint
            </button>


            {isLoading && <div>Check wallet...</div>}
            {isPending && <div>Transaction pending...</div>}
            {isSuccess && (
                <>
                    <div>Transaction Hash: {data?.hash}</div>
                    <div>
                        Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
                    </div>
                </>
            )}
            {isError && <div>{(error as BaseError)?.shortMessage}</div>}
        </>
    )
}


