import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'
// import userReducer from './user/userSlice';
// import themeReducer from './theme/themeSlice';
// // import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const rootReducer = combineReducers({
//   user: userReducer,
//   theme: themeReducer,
// });

 export const store = configureStore({
  reducer:{
    user: userReducer
  },
 });
 //persistor = persistStore(store);