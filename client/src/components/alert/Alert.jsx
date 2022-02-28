import React from "react";
import Toast from "./Toast";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const Alert = () => {
  const { alert } = useSelector((state) => state);

  return (
    <>
      {alert.loading && <Loading />}

      {alert.error && <Toast message={alert.error} type="error" />}
      {alert.success && <Toast message={alert.success} type="success" />}
      {alert.warning && <Toast message={alert.warning} type="warning" />}
    </>
  );
};

export default Alert;
