import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

export default function Home() {

	const BackroomCanvas = dynamic( () => import( "../components/BackroomCanvas" ), {
		ssr: false,
	} );

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
				<BackroomCanvas />
			</main>
		</>
	)
}