import axios from "axios";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: getOptions(),
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      if (err.response?.status === 401) {
        sessionStorage.clear();
        window.location.href = "/";
      }
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
      userId: JSON.parse(sessionStorage.getItem("data")).userId,
    };
  } catch (err) {
    console.log(err);
    return {
      Authorization: null,
    };
  }
}
