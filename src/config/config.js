const config = Object.freeze({
  // baseUrl: "http://192.168.12.58:9091/",
  baseUrl: "http://localhost:9091/",

  apiName: {
    login: "api/user/login",
    getAllEvent: "api/event/getall",
    getAllEventCount: "api/event/getcounts",
    getEventType: "api/event/get/type",
    getAllVehicle: "api/vehicle/getall",
  },
});

export default config;
