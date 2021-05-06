import React from "react";
import ReactDOM from "react-dom";
import "index.css";
// 引入antd.less,需要修改less变量可以修改主题颜色。
import "antd/dist/antd.less";
import App from "App";
import reportWebVitals from "reportWebVitals";
import { loadDevTools } from "jira-dev-tool";
import { AppProviders } from "context";
// StrictMode 在开发模式下会多更新一遍
loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
