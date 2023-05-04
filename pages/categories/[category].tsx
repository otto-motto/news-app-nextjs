import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Alert } from 'react-bootstrap';

import NewsArticlesGrid from '@/components/NewsArticlesGrid';
import { NewsArticles, NewsArticlesResponse } from '@/models/NewsArticles';

interface CategoryNewsPageProps {
	newsArticles: NewsArticles[];
}

export const getStaticPaths = async () => {
	//TODO: THIS IS THE PATHS THAT WILL BE GENERATED ON THE FLY BUT PREDIFINED
	//TODO: you could do an api call here to get the categories as well
	const categorySlugs = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

	const paths = categorySlugs.map((categorySlug) => ({ params: { category: categorySlug } }));

	return {
		//TODO: PATHS IS OBJECT WITH PARAMS AND PARAMS IS OBJECT WITH CATEGORY AND CATEGORY IS STRING
		paths,
		//TODO: FALLBACK TRUE MEANS IF THE PAGE IS NOT FOUND IT WILL BE GENERATED ON THE FLY, BUT FALSE MEANS IT WILL 404
		//TODO: WE CAN MAKE A CUSTOM 404 PAGE SO THAT WE HAVE A NAVBAR TO GO BACK TO HOME PAGE EASILY
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({ params }) => {
	const category = params?.category?.toString();

	const response = await fetch(
		`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=` + process.env.NEWS_API_KEY
	);
	const newsResponse: NewsArticlesResponse = await response.json();

	return {
		props: {
			newsArticles: newsResponse.articles,
		},
		//TODO: REVALIDATE IS HOW OFTEN THE PAGE IS REGENERATED when someone visits the page but static pages are cached and are very fast
		revalidate: 5 * 60,
	};
	//TODO: COULD MAKE A FALLBACK PAGE HERE FOR WHEN THE PAGE IS NOT FOUND BUT WE HAVE FALLBACK FALSE SO IT WILL 404 PAGE
};

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
	const router = useRouter();
	const categoryName = router.query.category?.toString();

	const title = 'Category: ' + categoryName;

	return (
		<>
			<Head>
				<title key='title'>{`${title} - News App`}</title>
				<meta
					key='description'
					name='description'
					content={title}
				/>
			</Head>
			<main>
				<h1>{title}</h1>
				<Alert>
					This page uses <strong>getStaticProps</strong> for very high page loading speed and{' '}
					<strong>incremental static generation (ISG)</strong> to show data not older than <strong>5 minutes</strong>
				</Alert>
				<NewsArticlesGrid articles={newsArticles} />
			</main>
		</>
	);
};

export default CategoryNewsPage;
