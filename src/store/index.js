import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import userReducer from './user';
import userMlReducer from './userMl';
// import videosReducer from "./videos";

const reducer = combineReducers({
	user: userReducer,
	userMl: userMlReducer,
	//videos: videosReducer,
});

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['user', 'userMl'],
	blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);
