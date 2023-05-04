import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import NextProgress from 'nextjs-progressbar';
import { Container, SSRProvider } from 'react-bootstrap';

import NavBar from '@/components/NavBar';
import styles from '@/styles/App.module.css';

import type { AppProps } from 'next/app';
const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SSRProvider>
			<div className={`${inter.className}`}>
				<Head>
					<title key='title'>News App</title>
					<meta
						name='description'
						content='News course to practice coding'
					/>
					<meta
						name='viewport'
						content='width=device-width, initial-scale=1'
					/>
					<link
						rel='icon'
						href='/favicon.ico'
					/>
				</Head>
				<NextProgress />
				<NavBar />
				<Container className={styles.pageContainer}>
					<Component {...pageProps} />
				</Container>
			</div>
		</SSRProvider>
	);
}
