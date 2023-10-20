import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getNewses: builder.query({
      query: () => "/news",
    }),
	getSingleNews: builder.query({
		query: (id) => `/news/${id}`,
	})
	
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNewsesQuery , useGetSingleNewsQuery} = api;
