const config = Object.freeze({
  // baseUrl: "http://192.168.12.58:9091/", //Smruti
  // baseUrl: "http://192.168.12.58:8085/dms/", //Smruti
  // baseUrl: "http://192.168.12.49:9091/", //Biswaji Sir
  // baseUrl: "http://localhost:9091/",
  baseUrl: "http://192.168.30.33:8080/watsoo-dms/", // STAGING SERVER

  apiKey: "AIzaSyCqNFRArvRxryWzMYaTJK2CbwTjMoNHcpo",

  apiName: {
    login: "api/user/login",
    getAllEvent: "api/event/getall",
    getAllEventCount: "api/event/getcounts",
    getEventType: "api/event/get/type",
    getAllVehicle: "api/vehicle/getall",
    getStatusType: "api/remarks",
    getDriverPerformance: "api/event/v1/driver/performance",
    sendCommandDetails: "api/command/detalis/send",
    getCommandDetails: "api/commands",
    getCommandHistoryTrail: "api/command/trail",
    createCommand: "api/commands/create",
    getGeoPositions: "api/positions",
    getRemarkType: "api/remarks",
    updateEvent: "api/event/update",
    getAllDriverPerformanceDetails: "api/driver/getall/perfomance",
    getAllCategory: "api/category/getall",
    getAllDriver: "api/driver/getall",
    getDriverEventCount: "api/driver/event/count",
  },
});

export default config;
