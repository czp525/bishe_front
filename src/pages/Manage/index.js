import React, { useEffect } from "react";
import { Layout } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import Mheader from "../../components/Mheader";
import Msider from "../../components/Msider";
import Mybreadcrumb from "../../components/Mybreadcrumb";
import styles from "./index.module.css";
const { Content } = Layout;
// const managerstr = localStorage.getItem("managerdata");
// const manager = JSON.parse(managerstr);

export default function Manage() {
  const navigate = useNavigate();
  // const handleClick = (e) => {
  //   navigate("/manage/" + e.key);
  // };
  const managertokenstr = localStorage.getItem("managertoken");
  useEffect(() => {
    if (!managertokenstr) {
      navigate("/managerlogin");
    }
  }, []);
  return (
    <Layout className={styles.manage}>
      {/* <Mheader></Mheader> */}
      <Layout className={styles.mcontainer}>
        <Msider></Msider>
        <Content>
          <Mybreadcrumb></Mybreadcrumb>
          <div className={styles.mcontainer_box}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
