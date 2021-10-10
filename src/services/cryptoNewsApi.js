import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsApiHeaders = {
    'x-rapidapi-host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
}

const baseUrl = process.env.REACT_APP_NEWS_API_URL

// Helper function to create request path for api
const createRequest = (url) => ({url, headers: cryptoNewsApiHeaders})

// Create APIs
export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        // With this method we can simply keep adding endpoints to request data from
        getCryptosNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
        
    })

})

export const {
    useGetCryptosNewsQuery, // Redux toolkit creates a hook that can be called to get all data for query
} = cryptoNewsApi