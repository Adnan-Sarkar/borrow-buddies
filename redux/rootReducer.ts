import { baseApi } from "./api/baseApi";
import authReducer from "./feature/auth/authSlice";

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
};

export default rootReducer;
