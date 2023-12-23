'use client'

import { useEffect } from "react"
import { useUserCollections } from "../hooks/useUserCollections"
import { useContractRead, type Address } from "wagmi"
import { abi } from '../utils/nft_abi'
import { Select, Stack } from '@chakra-ui/react'

type TSelectOptions = {
    value: string,
    setValue: any
}

export default function SelectCollections(data: TSelectOptions) {

    const { collectionsList, isSuccess: colIsSucccess, error: colError, isLoading: colIsLoading } = useUserCollections()

    return (
        <Stack spacing={3}>
            <Select _placeholder={{ color: 'inherit' }} color='teal' variant='outline' placeholder='Select collection' size={'lg'} defaultValue={''} onChange={(e) => data.setValue(e.target.value)}>
                {
                    collectionsList && collectionsList.length > 0 && collectionsList.map((item, key) => {
                        return <SelectOption wallet={item} key={key} />
                    })
                }
            </Select>
        </Stack>
    )
}

type TOption = {
    wallet: Address
}

function SelectOption(contract: TOption) {

    const { data, isLoading, error, isSuccess } = useContractRead({
        address: contract.wallet,
        abi: abi,
        functionName: "name"
    })

    return (
        <>
            <option value={contract.wallet}>{data?.toString()}</option>
        </>
    )
}