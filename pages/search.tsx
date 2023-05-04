import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';

import NewsArticlesGrid from '@/components/NewsArticlesGrid';
import { NewsArticles } from '@/models/NewsArticles';

const SearchNewsPage = () => {
	const [searchResults, setSearchResults] = useState<NewsArticles[] | null>(null);
	const [searchResultsLoading, setSearchResultsLoading] = useState(false);
	const [searchResultsIsError, setSearchResultsIsError] = useState(false);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);

		//TODO: used  ? to check if the value is null or undefined and string to convert formdata to string then trim to remove white space on front and back
		const searchQuery = formData.get('searchQuery')?.toString().trim();

		//TODO!: CANT USE API KEY BECAUSE WE ARE IN FRONT END AND EXPOSED
		//TODO: use try catch because network request from front end and can fail
		if (searchQuery) {
			try {
				setSearchResults(null);
				setSearchResultsIsError(false);
				setSearchResultsLoading(true);
				const response = await fetch('/api/search-news?q=' + searchQuery);
				const articles: NewsArticles[] = await response.json();
				setSearchResults(articles);
			} catch (error) {
				console.error(error);
				setSearchResultsIsError(true);
			} finally {
				setSearchResultsLoading(false);
			}
		}
	}

	return (
		<>
			<Head>
				<title key='title'>Search News</title>
				<meta
					key='description'
					name='description'
					content='Search News'
				/>
			</Head>
			<main>
				<h1>Search News</h1>
				<Alert>
					This page uses <strong>client-side data fetching</strong> to show data for every search. Requests are handled
					by our backend via <strong>API routes</strong>.
				</Alert>
				<Form onSubmit={handleSubmit}>
					<Form.Group
						className='mb-3'
						controlId='search-input'>
						<Form.Label>Search Query</Form.Label>
						<Form.Control
							name='searchQuery'
							type='text'
							placeholder='E.g. politics, sports, ..'
						/>
					</Form.Group>
					<Button
						type='submit'
						className='mb-3'
						disabled={searchResultsLoading}>
						Search
					</Button>
				</Form>
				<div className='d-flex flex-column align-items-center'>
					{searchResultsLoading && <Spinner animation='border' />}
					{searchResultsIsError && <p>Something went wrong...</p>}
					{searchResults?.length === 0 && <p>No results found... Try a different query</p>}
					{searchResults && <NewsArticlesGrid articles={searchResults} />}
				</div>
			</main>
		</>
	);
};

export default SearchNewsPage;
