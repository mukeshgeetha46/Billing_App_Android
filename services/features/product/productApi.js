import { baseApi } from "../../baseApi";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addproduct: builder.mutation({
            query: (data) => ({
                url: "/product/add",
                method: "POST",
                body: data,
            }),
        }),
        GetProduct: builder.query({
            query: () => ({
                url: "/product/",
                method: "GET",
            }),
        }),
        GetProductById: builder.query({
            query: (id) => ({
                url: `/product/${id}`,
                method: "GET",
            }),
        }),


    }),
});

export const {
    useAddproductMutation,
    useGetProductQuery,
    useGetProductByIdQuery,
} = productApi;
