import { baseApi } from "../../baseApi";

export const storeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addstore: builder.mutation({
            query: (data) => ({
                url: "/store/add",
                method: "POST",
                body: data,
            }),
        }),
        getstore: builder.query({
            query: () => ({
                url: "/store/",
                method: "GET",
            }),
        }),
        getStoreById: builder.query({
            query: (id) => ({
                url: `/store/${id}`,
                method: "GET",
            }),
        }),

    }),
});

export const {
    useAddstoreMutation,
    useGetstoreQuery,
    useGetStoreByIdQuery,
} = storeApi;
