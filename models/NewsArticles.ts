export interface NewsArticles {
	author: string;
	title: string;
	description: string;
	url: string;
	urlToImage?: string;
	publishedAt: string;
	content: string;
}

export interface NewsArticlesResponse {
	articles: NewsArticles[];
}
