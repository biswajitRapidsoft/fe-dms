import { apiSlice } from "../app/api/apiSlice";
import config from "../config/config";

const commandConfigurationApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCommandDetails: build.query({
      query: (payload) => ({
        url: config.apiName.getCommandDetails,
        method: "GET",
        params: {
          pageNo: payload?.pageNo,
          pageSize: payload?.pageSize,
          vechileId: payload?.vechileId,
          imeiNumber: payload?.imeiNumber,
        },
      }),
      providesTags: ["getCommandDetails"],
    }),
    sendCommandDetails: build.mutation({
      query: (payload) => ({
        url: config.apiName.sendCommandDetails,
        method: "POST",
        data: payload,
      }),
    }),
    getAllVehicle: build.query({
      query: () => ({
        url: config.apiName.getAllVehicle,
        method: "GET",
      }),
      providesTags: ["getAllVehicle"],
    }),
    getCommandHistoryTrail: build.query({
      query: (payload) => ({
        url: config.apiName.getCommandHistoryTrail,
        method: "GET",
        params: {
          vechileId: payload.vechileId,
        },
      }),
      providesTags: ["getCommandHistoryTrail"],
    }),
    createCommand: build.mutation({
      query: (payload) => ({
        url: config.apiName.createCommand,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["getCommandDetails"],
    }),
  }),
});

export const {
  useGetCommandDetailsQuery,
  useLazyGetCommandDetailsQuery,
  useSendCommandDetailsMutation,
  useGetAllVehicleQuery,
  useLazyGetCommandHistoryTrailQuery,
  useCreateCommandMutation,
} = commandConfigurationApi;
