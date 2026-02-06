import { baseApi } from "../../baseApi";

export const companyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addcompany: builder.mutation({
            query: (data) => ({
                url: "/company/add",
                method: "POST",
                body: data,
            }),
        }),
        getcompany: builder.query({
            query: () => ({
                url: "/company/",
                method: "GET",
            }),
        }),

    }),
});

export const {
    useAddcompanyMutation,
    useGetcompanyQuery,
} = companyApi;
