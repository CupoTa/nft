'use client'

import { useEffect } from "react"
import { useUserCollections } from "../hooks/useUserCollections"
import { useContractRead, type Address } from "wagmi"
import { abi } from '../utils/nft_abi'

type TSelectOptions = {
    value: string,
    setValue: any
}

export default function SelectCollections(data: TSelectOptions) {

    const { collectionsList, isSuccess: colIsSucccess, error: colError, isLoading: colIsLoading } = useUserCollections()

    return (
        <select className="form-select form-select-lg mb-3" defaultValue={''} aria-label=".form-select-lg example" onChange={(e) => data.setValue(e.target.value)}>
            <option value={''} disabled>Select Collection</option>
            {
                collectionsList && collectionsList.length > 0 && collectionsList.map((item, key) => {
                    return <SelectOption wallet={item} key={key} />
                })
            }
        </select>
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