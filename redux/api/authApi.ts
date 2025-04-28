import AsyncStorage from "@react-native-async-storage/async-storage";
import baseApi from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          if (data.token) {
            await AsyncStorage.setItem("authToken", data.token);
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
