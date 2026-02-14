import { baseApi } from "../../baseApi";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addorder: builder.mutation({
            query: (data) => ({
                url: "/order/add",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Order"],
        }),


    }),
});


export const {
    useAddorderMutation,

} = orderApi;
