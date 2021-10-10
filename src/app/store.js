import { configureStore } from '@reduxjs/toolkit'
import { cryptoApi } from '../services/cryptoApi'
import { cryptoNewsApi } from '../services/cryptoNewsApi'

export default configureStore({
    // Connect to the api endpoints
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer, 
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,   
    },

})