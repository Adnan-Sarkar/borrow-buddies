import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./feature/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistedAuthReducer,
});

export default rootReducer;
