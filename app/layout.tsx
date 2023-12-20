'use client'

import 'bootstrap/dist/css/bootstrap.css';
import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css';
import BootstrapClient from '../components/BootstrapClient';
import Head from 'next/head';
import { Providers } from './providers';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAccount } from 'wagmi';


function RootLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname()

    return (
        <html lang="en">
            <head>
                <title>Wish Power NFT | Scroll Maiinet domain.scroll</title>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <meta name="description" content="Wish Power NFT marketplace? mint new collection and nft to mainnet Scroll"/>
                <meta name="keywords" content="airdrop scroll, nft scroll, mainnet, drop, conracts scroll, marketpalace scroll"/>
            </head>
            <body className='outline'>
                <Providers>
                    <Header />
                    <div className='container-fluid d-flex '>
                        <main className='w-100'>
                            {children}
                        </main>
                        <Connected>
                            <div className='ms-auto order-2'>
                                <ul className='nav nav-pills nav-fill'>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Личный кабинет
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><Link className={`dropdown-item ${pathname === '/user' ? 'active' : ''}`} href="/user">Profile</Link></li>
                                            <li><Link className={`dropdown-item ${pathname === '/user/collections' ? 'active' : ''}`} href="/user/collections">Collections</Link></li>
                                            <li><Link className={`dropdown-item ${pathname === '/user/create' ? 'active' : ''}`} href="/user/create">Create</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </Connected>
                    </div>
                    <Footer />
                    <BootstrapClient />
                </Providers>
            </body>
        </html>
    );
}

export default RootLayout;

function Header() {

    const pathname = usePathname()

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">WishPower NFT</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathname === '/collection' ? 'active' : ''}`} href="/collection">Collection</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathname === '/nft' ? 'active' : ''}`} href="/nft">NFT</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <ConnectButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}


function Footer() {
    return (
        <footer className='co container-fluid'>
            <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
                Footer
            </a>
        </footer>
    )
}

function Connected({ children }: { children: React.ReactNode }) {
    const { isConnected } = useAccount()


    if (!isConnected) return null
    return <>{children}</>
}
