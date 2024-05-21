import { apiSlice } from "../app/api/apiSlice";
import config from "../config/config";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllEvent: build.query({
      query: (payload) => ({
        url: config.apiName.getAllEvent,
        method: "GET",
        params: {
          pageNo: payload.pageNo,
          pageSize: payload.pageSize,
          eventType: payload.eventType,
          vehicleNo: payload.vehicleNo,
          searchKey: payload.searchKey,
        },
      }),
      providesTags: ["getAllEvent"],
    }),

    getAllEventCount: build.query({
      query: (payload) => ({
        url: config.apiName.getAllEventCount,
        method: "GET",
        params: {
          value: payload,
        },
      }),
      providesTags: ["getAllEventCount"],
    }),

    getEventType: build.query({
      query: () => ({
        url: config.apiName.getEventType,
        method: "GET",
      }),
      providesTags: ["getEventType"],
    }),
    getAllVehicle: build.query({
      query: () => ({
        url: config.apiName.getAllVehicle,
        method: "GET",
      }),
      providesTags: ["getAllVehicle"],
    }),
  }),
});

export const {
  useGetAllEventQuery,
  useGetAllEventCountQuery,
  useGetEventTypeQuery,
  useGetAllVehicleQuery,
} = dashboardApi;
