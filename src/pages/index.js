import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Generator from '@/components/Generator'
import { Canvas } from '@react-three/fiber'
import KeyboardControls from '@/components/controls/KeyboardControls'
import LookControls from '@/components/controls/LookControls'
import { useEffect } from 'react'
import InitCamera from '@/components/InitCamera'

const inter = Inter( { subsets: [ 'latin' ] } )

export default function Home() {

	useEffect( () => {
		document.addEventListener( 'contextmenu', ( e ) => {
			e.preventDefault();
		} );
	}, [] )

	return (
		<>
			<Head>
				<title>Backroom Generator</title>
				<meta name="description" content="" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<Canvas resize={{ scroll: true }} >
					<ambientLight />
					<pointLight position={[ 10, 10, 10 ]} />
					<InitCamera />
					<KeyboardControls />
					<LookControls />
					<gridHelper args={[ 100, 100, 'white', 'white' ]} />
					<Generator />
				</Canvas >
			</main>
		</>
	)
}