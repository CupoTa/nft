'use client'

import { useState } from 'react'
import { BaseError } from 'viem'
import { type Address } from 'wagmi'

import { MintNFTCollection } from './MintNFTCollection'
import { NFTList } from './NFTList'
import { useUserCollections } from '../hooks/useUserCollections'
import Link from 'next/link'
import SelectCollections from './SelectCollections'
import { FileUpdate } from './FileUpdate'


export function Collections() {

    const { collectionsList: data, error } = useUserCollections()
    const [value, setValue] = useState<any>("")

    return (
        <div>
            <FileUpdate/>
            {data ?
                <SelectCollections value={value} setValue={setValue} />
                :
                <NoCollections />}

            {
                value != '' && <NFTList collectionAddress={value} />
            }

            {error && <div>{(error as BaseError).shortMessage}</div>}
        </div>
    )
}

function NoCollections() {
    return (
        <div className=' d-flex w-100 flex-column justify-between text-center'>
            <h3 className=' text-info text-center'>No collection</h3>
            <h4 className='text-warning'>
                <abbr title="go page create">
                    <Link href="/user/create">Create</Link>
                </abbr>
            </h4>
        </div>
    )
}

