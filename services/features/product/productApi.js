import { baseApi } from "../../baseApi";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addproduct: builder.mutation({
            query: (data) => ({
                url: "/product/add",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),

        GetProduct: builder.query({
            query: () => ({
                url: "/product/",
                method: "GET",
            }),
            providesTags: ["Product"],
        }),

        GetProductById: builder.query({
            query: (data) => ({
                url: `/product/id`,
                method: "POST",
                body: data
            }),
            keepUnusedDataFor: 0,
            providesTags: ["Product"],
        }),

        addVariant: builder.mutation({
            query: (data) => ({
                url: "/product/add-variant",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),

        addVariantImage: builder.mutation({
            query: (data) => ({
                url: "/product/add-variant-image",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
        GetProductVariants: builder.query({
            query: (id) => ({
                url: `/product/productvariant/check-variants/${id}`,
                method: "GET",
            }),
            keepUnusedDataFor: 0,
            providesTags: ["Product"],
        }),
        GetProductVariantsSize: builder.query({
            query: (id) => ({
                url: `/product/productvariant/get-variants-size/${id}`,
                method: "GET",
            }),
            providesTags: ["Product"],
        }),
    }),
});


export const {
    useAddproductMutation,
    useGetProductQuery,
    useGetProductByIdQuery,
    useAddVariantMutation,
    useAddVariantImageMutation,
    useGetProductVariantsQuery,
    useGetProductVariantsSizeQuery,
} = productApi;
