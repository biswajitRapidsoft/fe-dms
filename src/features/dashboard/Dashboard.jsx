import React from "react";
import { useGetfakejsonQuery } from "../../services/dashboard";

const Dashboard = () => {
  const {
    data: fakeDataList = {
      data: null,
    },
  } = useGetfakejsonQuery();
  console.log("fakeDataList", fakeDataList);
  return <div>Dashboard</div>;
};

export default Dashboard;
