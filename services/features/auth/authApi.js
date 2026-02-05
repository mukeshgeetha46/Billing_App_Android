import { baseApi } from "../../baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (data) => ({
                url: "/auth/signup",
                method: "POST",
                body: data,
            }),
        }),

        signin: builder.mutation({
            query: (data) => ({
                url: "/auth/signin",
                method: "POST",
                body: data,
            }),
        }),

        profile: builder.query({
            query: () => "/auth/profile",
            refetchOnMountOrArgChange: true,
        }),
    }),
});

export const {
    useSignupMutation,
    useSigninMutation,
    useProfileQuery,
} = authApi;
