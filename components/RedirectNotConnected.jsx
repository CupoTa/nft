'use client'

import { useAccount } from 'wagmi'
import { redirect } from 'next/navigation'

export default function RedisrectNotConnected () {

    const { isConnected } = useAccount()


    if (!isConnected) return redirect('/')
    return null
}