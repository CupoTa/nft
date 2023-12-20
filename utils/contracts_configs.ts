import kuiperNFTFactory from '../contracts/KuiperNFTFactory-contract-address.json'
import kuiperNFTFactoryArtifact from '../contracts/KuiperNFTFactory.json'
import kuipeNFTMarketplace from '../contracts/KuiperNFTMarketplace-contract-address.json'
import kuipeNFTMarketplaceArtifact from '../contracts/KuiperNFTMarketplace.json'
import { Address } from 'viem';

type NFTContractsType = {
    [key: string]: any;
}

const factoryAddress: NFTContractsType = kuiperNFTFactory
const factoryAbi: NFTContractsType = kuiperNFTFactoryArtifact
const marketplaceAddress: NFTContractsType = kuipeNFTMarketplace
const marketplaceAbi: NFTContractsType = kuipeNFTMarketplaceArtifact

export const factoryNFT = {
    address: factoryAddress?.KuiperNFTFactory as Address,
    abi: factoryAbi?.abi
} as const

export const marketplaceNFT = {
    address: marketplaceAddress?.KuiperNFTMarketplace as Address ,
    abi: marketplaceAbi?.abi 
} as const

