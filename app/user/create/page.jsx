'use client'

import { CreateCollection } from '../../../components/CreateCollection'
import { MintNFTCollection } from '../../../components/MintNFTCollection'
import  RedirectNoTConnected  from '../../../components/RedirectNotConnected'

export default function Page() {


    return(
        <>
        <RedirectNoTConnected/>
        <h1 className="text-center">CREATE  Page</h1>
        <div>
            <CreateCollection/>
        </div>
        <div>
            <MintNFTCollection/>
        </div>
        </>
        
    )
}