'use client'

import { useState } from 'react'
import { BaseError } from 'viem'
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite, useAccount } from 'wagmi'

import { stringify } from '../utils/stringify'
import { factoryNFT } from '../utils/contracts_configs'
import { useDebounce } from '../hooks/useDebounce'

export function CreateCollection() {

    const [nftData, setNftData] = useState({
        name: '',
        symbol: ''
    })
    const debounceNftData = useDebounce(nftData)

    const { address } = useAccount();

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        ...factoryNFT,
        functionName: 'createNFTCollection',
        enabled: Boolean(debounceNftData),
        args: [debounceNftData.name, debounceNftData.symbol, BigInt(1000), address],
    })

    const { write, data, error, isLoading, isError } = useContractWrite(config)
    const {
        data: receipt,
        isLoading: isPending,
        isSuccess,
    } = useWaitForTransaction({ hash: data?.hash })

    return (
        <>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    write?.()
                }}
            >
                <input
                    placeholder="collection symbol"
                    onChange={(e) => setNftData({
                        name: nftData.name,
                        symbol: e.target.value
                    })
                    }
                />
                <input
                    placeholder="collection name"
                    onChange={(e) => setNftData({
                        name: e.target.value,
                        symbol: nftData.symbol
                    })
                    }
                />
                <button disabled={!write} type="submit">
                    Create Collection
                </button>
            </form>


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
            {isError && <div className='error'>{(error as BaseError)?.shortMessage}</div>}
        </>
    )
}
