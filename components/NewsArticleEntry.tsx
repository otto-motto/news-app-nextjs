import Image from 'next/image';
import { Card } from 'react-bootstrap';

import placeHolderImage from '@/assets/images/campingImage.jpg';
import { NewsArticles } from '@/models/NewsArticles';
import styles from '@/styles/NewsArticleEntry.module.css';

interface NewsArticlesEntryProps {
	article: NewsArticles;
}

const NewsArticleEntry = ({ article: { title, description, url, urlToImage } }: NewsArticlesEntryProps) => {
	const validImageUrl =
		urlToImage?.startsWith('http://') || urlToImage?.startsWith('https://') ? urlToImage : undefined;

	return (
		<a href={url}>
			<Card className='h-100'>
				<Image
					src={validImageUrl || placeHolderImage}
					width={500}
					height={200}
					alt={`Article Image ${title}`}
					className={`${styles.image} card-img-top`}
				/>
				<Card.Body className='text-black'>
					<Card.Title>{title}</Card.Title>
					<Card.Text>{description}</Card.Text>
				</Card.Body>
			</Card>
		</a>
	);
};

export default NewsArticleEntry;
