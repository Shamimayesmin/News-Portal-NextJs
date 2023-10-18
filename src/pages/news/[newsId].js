import RootLayout from "@/components/Layouts/RootLayout";
import React from "react";
import { Col, Row } from "antd";
import Image from "next/image";

const NewsDetailPage = ({ news }) => {
	return (
		<div>
			<Row
				gutter={{
					xs: 8,
					sm: 16,
					md: 24,
					lg: 32,
				}}
			>
				<Col className="gutter-row" span={12}>
					<div>
						<Image
							src={news?.image_url}
							width={500}
							height={300}
							responsive
							alt="news image"
						/>
					</div>
				</Col>
				<Col className="gutter-row" span={12}>
					<div>col-6</div>
				</Col>
			</Row>
		</div>
	);
};

export default NewsDetailPage;

NewsDetailPage.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
	const res = await fetch("http://localhost:5000/news");
	const newses = await res.json();

	const paths = newses.map((news) => ({
		params: { newsId: news.id },
	}));

	return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
	const { params } = context;
	const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
	const data = await res.json();

	return {
		props: {
			news: data,
		},
	};
};
