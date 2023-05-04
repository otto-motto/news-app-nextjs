import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Alert } from 'react-bootstrap';

import NewsArticleEntry from '@/components/NewsArticleEntry';
import NewsArticlesGrid from '@/components/NewsArticlesGrid';
import { NewsArticles, NewsArticlesResponse } from '@/models/NewsArticles';

interface BreakingNewsPageProps {
	newsArticles: NewsArticles[];
}
//TODO: GET SERVER SIDE PROPS IS SECURE! NO USEEFFECT OR PROGRESS BAR PRERENERED
//TODO: CAN USE GET STATIC PROPS FOR STATIC PAGES
//TODO!: IF WE WANT FRONT END ENV WE NEED TO PREPEND NEXT_PUBLIC_ TO THE ENV VAR
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
	const res = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + process.env.NEWS_API_KEY);
	// const data = await res.json();
	const newsArticles: NewsArticlesResponse = await res.json();

	return {
		props: {
			newsArticles: newsArticles.articles,
		},
	};
	//TODO: COULD MAKE A FALLBACK PAGE HERE FOR WHEN THE PAGE IS NOT FOUND BUT WE HAVE FALLBACK FALSE SO IT WILL 404 PAGE
};

export default function BreakingNewsPage({ newsArticles }: BreakingNewsPageProps) {
	return (
		<>
			<Head>
				<title key='title'>Breaking News</title>
				<meta
					key='description'
					name='description'
					content='Breaking News'
				/>
			</Head>
			<main>
				<h1>Breaking News</h1>
				<Alert>
					This page uses <strong>getServerSideProps</strong> to fetch data server-side to every request. This allows
					search engines to crawl the page content and <strong>improves SEO</strong>.
				</Alert>
				<NewsArticlesGrid articles={newsArticles} />
			</main>
		</>
	);
}
