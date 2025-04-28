import baseApi from "./api/baseApi";
import { authSlice } from "./feature/auth/authSlice";

const rootReducer = {
  [baseApi?.reducerPath]: baseApi?.reducer,
  auth: authSlice,
};

export default rootReducer;
