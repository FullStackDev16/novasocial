import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import DataProvider from "./redux/store";
import CustomThemeProvider from "./theme/index";

ReactDOM.render(
  <DataProvider>
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  </DataProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
