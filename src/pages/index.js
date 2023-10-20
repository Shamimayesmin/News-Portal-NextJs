import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import Banner from "@/components/UI/Banner";
import AllNews from "@/components/UI/AllNews";
import { useGetNewsesQuery, useGetSingleNewsQuery } from "@/redux/api/apiSlice";



const HomePage = ({allNews}) => {
  // console.log(allNews);

  const {data, isLoading, isError} = useGetNewsesQuery();

  console.log(data);

  
  return (
    <>
      <Head>
        <title>PH-News Portal</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <AllNews allNews={allNews}/>
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// For Client side rendering(CSR)
// export const getStaticProps = async () => {
//   // const res = await fetch("http://localhost:3000/api/news"); // internal API connected with mongoDB
//   const res = await fetch("http://localhost:5000/news"); // --> json server
//   const data = await res.json();
//   // console.log(data);
//   return {
//     props: {
//       allNews: data,
//       // allNews: data.data, // when using internal API connected with mongoDB
//     },
//     revalidate: 10,
//   };
// };


// for server side rendering (SSR) with json-server data
export const getServerSideProps = async()=>{
  const res = await fetch("http://localhost:5000/news");
  const data = await res.json();
  // console.log(data);
  return{
    props : {
      allNews : data,
    },
    
  }
}
