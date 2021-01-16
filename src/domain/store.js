import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './actions'

export default configureStore({
  reducer: {
    order: orderReducer
  }
})
