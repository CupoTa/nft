import { useState } from 'react'
import { useContractRead, useAccount } from 'wagmi'
import { factoryNFT } from '../utils/contracts_configs'

export function useUserCollections() {

    const [collectionsList, setCollectionsList] = useState<any[]>([])
    const { address } = useAccount()

    const { data, error, isLoading, isSuccess } = useContractRead({
        ...factoryNFT,
        functionName: 'getOwnCollections',
        account: address,
        onSuccess: (result) => {
            setCollectionsList(result)
        }
    })


    return {collectionsList, isSuccess, error, isLoading}
}
