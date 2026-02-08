import { baseApi } from "../../baseApi";

export const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getHomedata: builder.query({
            query: () => ({
                url: "/home/",
                method: "GET",
            }),
        }),


    }),
});

export const {
    useGetHomedataQuery,
} = homeApi;
