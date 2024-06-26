import axios from "axios";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, responseType }) => {
    try {
      const result = await axios({
        url: responseType ? url : baseUrl + url,
        // url: fullUrl,
        method,
        data,
        params,
        headers: getOptions(),
        responseType,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      // if (err.response?.status === 401) {
      //   sessionStorage.clear();
      //   window.location.href = "/";
      // }
      console.log(err);
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

function getOptions() {
  try {
    return {
      Authorization: sessionStorage.getItem("data")
        ? `Bearer ${JSON.parse(sessionStorage.getItem("data")).token}`
        : null,
      userId: Boolean(sessionStorage.getItem("data"))
        ? JSON.parse(sessionStorage.getItem("data")).userId
        : null,
    };
  } catch (err) {
    console.log(err);
    return {
      Authorization: null,
    };
  }
}
