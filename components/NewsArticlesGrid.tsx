import { Row } from 'react-bootstrap';

import { NewsArticles } from '@/models/NewsArticles';

import NewsArticleEntry from './NewsArticleEntry';

interface NewsArticlesGridProps {
	articles: NewsArticles[];
}

const NewsArticlesGrid = ({ articles }: NewsArticlesGridProps) => {
	return (
		<div>
			<Row
				xs={1}
				sm={2}
				xl={3}
				className='g-4'>
				{articles.map((article) => (
					<NewsArticleEntry
						key={article.url}
						article={article}
					/>
				))}
			</Row>
		</div>
	);
};

export default NewsArticlesGrid;
