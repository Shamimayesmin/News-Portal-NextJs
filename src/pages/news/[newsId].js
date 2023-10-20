import RootLayout from "@/components/Layouts/RootLayout";
import React from "react";
import { Col, Row } from "antd";
import Image from "next/image";
import {
	ArrowRightOutlined,
	CalendarOutlined,
	CommentOutlined,
	ProfileOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useGetSingleNewsQuery } from "@/redux/api/apiSlice";
import { useRouter } from "next/router";

const NewsDetailPage = ({ news }) => {
	
	// const router = useRouter();
	// const { id } = router.query;

	// const { data, isLoading, isError, error } = useGetSingleNewsQuery(id);
	// console.log(data);

	if (!news) {
		return <p>Loading.....</p>;
	}

	return (
		<div>
			<Row style={{ marginTop: "80px", alignItems: "center" }}>
				<Col md={6} lg={12}>
					<Image
						src={news?.image_url}
						width={500}
						height={300}
						responsive
						alt="news image"
					/>
				</Col>
				<Col md={6} lg={12} style={{ paddingRight: "20px" }}>
					<div>
						<h1 style={{ fontSize: "30px" }}>{news?.title}</h1>

						<span
							style={{
								color: "gray",
								display: "block",
								fontSize: "20px",
							}}
						>
							<UserOutlined /> {news?.author}
						</span>
						<div
							className="line"
							style={{
								height: "5px",
								margin: "20px 0",
								background: "#000",
								width: "100%",
							}}
						>
							{" "}
						</div>

						<p
							style={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "gray",
								margin: "10px 0px",
								fontSize: "12px",
							}}
						>
							<span>
								<CalendarOutlined /> {news?.release_date}
							</span>
							<span>
								<CommentOutlined /> {news?.comment_count} COMMENTS
							</span>
							<span>
								<ProfileOutlined /> {news?.category}
							</span>
						</p>

						<p style={{ fontSize: "20px" }}>{news?.description}</p>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default NewsDetailPage;

NewsDetailPage.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};

// For Client side rendering(CSR) in next js
// export const getStaticPaths = async () => {
// 	const res = await fetch("http://localhost:5000/news");
// 	const newses = await res.json();

// 	// build html data without showing loading state
// 	const paths = newses.map((news) => ({
// 		params: { newsId: news.id },
// 	}));

// 	return { paths, fallback: false };
// };

// for server side rendering (SSR) with json-server data
export const getServerSideProps = async (context) => {
	const { params } = context;

	const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
	const data = await res.json();

	return {
		props: {
			news: data,
		},
	};
};
