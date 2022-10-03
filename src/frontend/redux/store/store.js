import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../action/themeSlice';
import authenticationReducer from '../action/authSlice';
import MenuReducer from '../action/MenuSlice'
import userReducer  from '../action/userSlice';
import PostReducer from '../action/postSlice';
import bookmarkReducer from '../action/bookmarkSlice';
import notificationReducer from '../action/notificationSlice';
import ChatReducer from '../action/chatSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    authentication: authenticationReducer,
    Menu:MenuReducer,
    Users:userReducer,
    Post:PostReducer,
    Bookmark:bookmarkReducer,
    notification:notificationReducer,
    chat:ChatReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
})