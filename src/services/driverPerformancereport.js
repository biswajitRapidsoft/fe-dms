import { apiSlice } from "../app/api/apiSlice";
import config from "../config/config";

const driverPerformanceReportApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllDriverPerformanceDetails: build.query({
      query: (payload) => ({
        url: config.apiName.getAllDriverPerformanceDetails,
        method: "GET",
        params: {
          pageNo: payload?.pageNo,
          pageSize: payload?.pageSize,
          //   driverName: payload?.driverName,
          dlNumber: payload?.dlNumber,
          eventType: payload?.eventType,
          fromDate: payload?.fromDate,
          toDate: payload?.toDate,
        },
      }),
      providesTags: ["getAllDriverPerformanceDetails"],
    }),
    getAllCategory: build.query({
      query: () => ({
        url: config.apiName.getAllCategory,
        method: "GET",
      }),
      providesTags: ["getAllCategory"],
    }),

    getAllDriver: build.query({
      query: () => ({
        url: config.apiName.getAllDriver,
        method: "GET",
      }),
      providesTags: ["getAllDriver"],
    }),
  }),
});

export const {
  useGetAllDriverPerformanceDetailsQuery,
  useGetAllCategoryQuery,
  useGetAllDriverQuery,
} = driverPerformanceReportApi;
