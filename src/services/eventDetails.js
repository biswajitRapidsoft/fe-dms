import { apiSlice } from "../app/api/apiSlice";
import config from "../config/config";

const eventDetailsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getGeoPositions: build.query({
      query: (payload) => ({
        url: config.apiName.getGeoPositions,
        method: "GET",
        params: {
          deviceId: payload?.deviceId,
          from: payload?.from,
          to: payload?.to,
        },
      }),
      providesTags: ["getGeoPositions"],
    }),
    getAllEventForEventDetails: build.query({
      query: (payload) => {
        // console.log("payload: ", payload);
        return {
          url: config.apiName.getAllEvent,
          method: "GET",
          params: {
            eventType: payload.eventType,
            vehicleNo: payload.vehicleNo,
            fromDate: payload.fromDate,
            toDate: payload.toDate,
          },
        };
      },
      providesTags: ["getAllEventForEventDetails"],
    }),

    getDriverById: build.query({
      query: (payload) => ({
        url: config.apiName.getDriverById,
        method: "GET",
        params: {
          driverId: payload?.driverId,
        },
      }),
      providesTags: ["getDriverById"],
    }),
  }),
});

export const {
  useGetGeoPositionsQuery,
  useGetAllEventForEventDetailsQuery,
  useGetDriverByIdQuery,
} = eventDetailsApi;
