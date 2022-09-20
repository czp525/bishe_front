import React, { useState, useEffect } from "react";
import { Input, Button, Divider, Space, Table, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./index.module.css";
import { SearchvideoApi } from "../../request/api";
import { GetvideoApi } from "../../request/api";
// const manager = JSON.parse(managerstr);
// const managertokenstr = localStorage.getItem("managertoken");
// console.log(manager);
// console.log(managertokenstr);

const { Column } = Table;

export default function Articlemanage() {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const { Search } = Input;
  const onSearch = (value) => {
    SearchvideoApi({ value: value })
      // axios({
      //   method: "post",
      //   url: "http://10.2.13.116:8088/my/search1",
      //   headers: {
      //     authorization: managertokenstr,
      //   },
      //   data: {
      //     value: value,
      //   },
      // })
      .then((res) => {
        setTotal(res.data.total);
        setdata(res.data.data);
      })
      .catch((err) => {});
  }; //搜索框内容
  const newVideo = () => {
    navigate("/newvideo");
  };
  const managertokenstr = localStorage.getItem("managertoken");
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const getData = (c) => {
    // console.log(c);
    GetvideoApi({ current: c })
      // axios({
      //   method: "get",
      //   url: "http://10.2.13.116:8088/my/getpage1",
      //   params: { current: c },
      //   headers: {
      //     authorization: managertokenstr,
      //   },
      // })
      .then((res) => {
        setdata(res.data.data);
        setTotal(res.data.total);
        // console.log(total);
      });
    // .catch((err) => {});
  };
  useEffect(() => {
    getData(1);
  }, []);
  const deletevideo = (d) => {
    const d_id = d.video_id;
    if (window.confirm("确定要删除吗")) {
      axios({
        method: "get",
        url: `http://10.2.13.132:8088/my/video/delete/${d_id}`,
        headers: {
          authorization: managertokenstr,
        },
      })
        .then((res) => {
          setdata(data.filter((item) => item.video_id !== d_id));
          console.log(data);
        })
        .catch((err) => {
          console.log(err, 222222);
        });
    }
  };
  const editvideo = (e) => {
    const e_id = e.video_id;
    axios({
      method: "get",
      url: `http://10.2.13.132:8088/my/video/changevideo1/${e_id}`,
      data: {
        video_id: e_id,
      },
      headers: {
        authorization: managertokenstr,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        navigate("/editvideo", { state: res.data.data });
        // localStorage.setItem("videodata", res.data.data);
        // navigate("/editvideo");
      })
      .catch((err) => {});
  };
  useEffect(() => {
    const token = localStorage.getItem("managertoken");
    if (!token) {
      navigate("/managerlogin");
    }
  }, []);

  const pageChange = (c) => {
    setCurrent(c);
    getData(c);
  };
  return (
    <div>
      <div className={styles.msearchbox}>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          className={styles.msearch}
        />
      </div>
      <div className={styles.mcontent}>
        <Button
          onClick={newVideo}
          type="primary"
          style={{ borderRadius: "12px" }}
          className={styles.newvideobutton}
        >
          新建视频课程
        </Button>
        <Divider />
        <Table dataSource={data} pagination={false} rowKey={"video_id"}>
          <Column title="ID" dataIndex="video_id" key="ID" />
          <Column title="标题" dataIndex="title" key="title" />

          <Column title="作者" dataIndex="author" key="author" />
          <Column title="修改时间" dataIndex="video_date" key="time" />
          <Column
            title="简介"
            dataIndex="video_introduce"
            key="Introduction"
            ellipsis="true"
          />

          <Column
            title="操作"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  onClick={() => editvideo(record)}
                  type="primary"
                  style={{ borderRadius: "10px" }}
                >
                  编辑
                </Button>
                <Button
                  onClick={() => deletevideo(record)}
                  type="primary"
                  danger
                  style={{ borderRadius: "10px" }}
                >
                  删除
                </Button>
              </Space>
            )}
          />
        </Table>
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
    </div>
  );
}
