'use client'

import { Collections } from '../../../components/Collections'
import  RedirectNoTConnected  from '../../../components/RedirectNotConnected'

export default function Page() {


    return(
        <>
        <RedirectNoTConnected/>
        <h1 className="text-center">Collections User Page</h1>
        <Collections/>
        </>
        
    )
}