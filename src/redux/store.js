import { configureStore } from '@reduxjs/toolkit'
import pickplayerReducer from './PickplayerSlice'
export default configureStore({
  reducer: {
    pickplayer: pickplayerReducer,
  },
})