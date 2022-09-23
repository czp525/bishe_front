import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import "../../assets/base.css";
import Myheader from "../../components/Myheader/index";
import { Pagination, List ,Button} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchApi } from "../../request/api";
import axios from "axios";


export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [data, setdata] = useState([]);

  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const pageChange = (c) => {
    setCurrent(c);
    getData(c);
  };
  const getData = (c) => {
    SearchApi({ value: state, current: c })
      .then((res) => {
        let a = [...res.data.data, ...res.data.data1];
        console.log(a);
        setdata(a);
        console.log(data);
        setTotal(res.data.total);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getData(1);
  }, []);

    const handleclick = (e) => {
      const e_id = e.article_id;
      const d_id = e.video_id;
      if (e_id) {
        axios({
          method: "get",
          url: `http://10.2.13.136:8088/my/article/changearticle/${e_id}`,
          data: {
            article_id: e_id,
          },
          // headers: {
          //   authorization: managertokenstr,
          // },
        })
          .then((res) => {
            console.log(res.data.data);
            navigate("/lesson1", { state: res.data.data });
          })
          .catch((err) => {});
      }
      if (d_id) {
                    axios({
                      method: "get",
                      url: `http://10.2.13.136:8088/my/video/changevideo1/${d_id}`,
                      data: {
                        video_id: e_id,
                      },
                      // headers: {
                      //   authorization: managertokenstr,
                      // },
                    })
                      .then((res) => {
                        console.log(res.data.data);
                        navigate("/lesson2", { state: res.data.data });
                      })
                      .catch((err) => {});
      }
    };
  return (
    <div id="page">
      <Myheader></Myheader>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <img
                  src={item.video_pic || item.article_pic}
                  alt=""
                  style={{ width: "200px", height: "120px" }}
                />
              }
              title={
                <Button
                  type="link"
                  onClick={() => {
                    handleclick(item);
                  }}
                  style={{ fontSize: "20px", marginLeft: "100px" }}
                >
                  {item.title}
                </Button>
              }
              description={
                <div style={{ fontSize: "16px", marginLeft: "120px" }}>
                  {item.author}
                </div>
              }
            />
          </List.Item>
        )}
      />
      <Pagination
        current={current}
        style={{ marginTop: "20px" }}
        defaultCurrent={1}
        // pageSize={state.pageSize}
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 15]}
        total={total}
        // showSizeChanger
        showQuickJumper
        onChange={pageChange}
        showTotal={(total) => `共 ${total} 条数据`}
      />
    </div>
  );
}
