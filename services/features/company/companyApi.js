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
        Getcompanybyid: builder.query({
            query: (id) => ({
                url: `/company/${id}`,
                method: "GET",
            }),
        }),
        GetCompanyNameById: builder.query({
            query: () => ({
                url: `/company/getname`,
                method: "GET",
            }),
        }),
        GetCompanyProducts: builder.query({
            query: (id) => ({
                url: `/product/company/detail/${id}`,
                method: "GET",
            }),
        }),

    }),
});

export const {
    useAddcompanyMutation,
    useGetcompanyQuery,
    useGetcompanybyidQuery,
    useGetCompanyNameByIdQuery,
    useGetCompanyProductsQuery,
} = companyApi;
