import React from "react";
import "./assets/base.css";
import Myheader from "./components/Myheader";
import Mysider from "./components/Mysider";
import Main from "./components/Main";
import Myfooter from "./components/Myfooter";
import { Layout } from "antd";
import Mycarousel from "./components/Mycarousel/index";

function App() {
  return (
    <Layout id="app">
      <Myheader></Myheader>
      <div className="container">
        <Mysider></Mysider>
        <Mycarousel></Mycarousel>
      </div>
      <Main></Main>
      <Myfooter></Myfooter>
    </Layout>
  );
}

export default App;
