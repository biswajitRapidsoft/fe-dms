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
          remark: payload?.remark,
          searchKey: payload?.searchKey,
          fromDate: payload?.fromDate,
          toDate: payload?.toDate,
          // driverName: payload?.driverName,
          dlNumber: payload?.dlNumber,
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
    getDriverPerformance: build.query({
      query: (payload) => ({
        url: config.apiName.getDriverPerformance,
        method: "GET",
        params: {
          value: payload?.value,
          dlNumber: payload?.dlNumber,
        },
      }),
      providesTags: ["getDriverPerformance"],
    }),

    getEventType: build.query({
      query: () => ({
        url: config.apiName.getEventType,
        method: "GET",
      }),
      providesTags: ["getEventType"],
    }),
    getStatusType: build.query({
      query: () => ({
        url: config.apiName.getStatusType,
        method: "GET",
      }),
      providesTags: ["getStatusType"],
    }),
    getAllVehicle: build.query({
      query: () => ({
        url: config.apiName.getAllVehicle,
        method: "GET",
      }),
      providesTags: ["getAllVehicle"],
    }),

    getVideo: build.query({
      query: (payload) => ({
        url: payload.videoUrl,
        method: "GET",
        responseType: "blob",
      }),
      providesTags: ["getVideo"],
    }),

    updateEvent: build.mutation({
      query: (payload) => ({
        url: config?.apiName?.updateEvent,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["getAllEvent"],
    }),
  }),
});

export const {
  useGetAllEventQuery,
  useGetAllEventCountQuery,
  useGetEventTypeQuery,
  useGetAllVehicleQuery,
  useGetVideoQuery,
  useGetStatusTypeQuery,
  useGetDriverPerformanceQuery,
  useUpdateEventMutation,
} = dashboardApi;
