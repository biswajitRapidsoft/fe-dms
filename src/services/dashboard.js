import { apiSlice } from "../app/api/apiSlice";
import config from "../config/config";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getfakejson: build.query({
      query: () => ({
        url: config.apiName.getfakejson,
        method: "GET",
      }),
      providesTags: ["getfakejson"],
    }),
  }),
});

export const { useGetfakejsonQuery } = dashboardApi;
