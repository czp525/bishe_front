import React, { useState, useEffect } from "react";
import { Input, Button, Divider, Space, Table, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./index.module.css";
import { SearcharticleApi } from "../../request/api";
import { GetarticleApi } from "../../request/api";

// const managerstr = localStorage.getItem("managerdata");
// const manager = JSON.parse(managerstr);
// const managertokenstr = localStorage.getItem("managertoken");
// console.log(manager);
// console.log(managertokenstr);

const { Column } = Table;
export default function Articlemanage() {
  //列表数组
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const { Search } = Input;
  const onSearch = (value) => {
    SearcharticleApi({ value: value })
      .then((res) => {
        setTotal(res.data.total);
        setdata(res.data.data);
      })
      .catch((err) => {});
  }; //搜索
  const newarticle = () => {
    navigate("/newarticle");
  };
  const managertokenstr = localStorage.getItem("managertoken");
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const getData = (c) => {
    // console.log(c);
    GetarticleApi({ current: c })
      // axios({
      //   method: "get",
      //   url: "http://10.2.13.132:8088/my/article/articles",
      //   params: { current: c },
      //   headers: {
      //     authorization: managertokenstr,
      //   },
      // })
      .then((res) => {
        console.log(res);
        setdata(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getData(1);
  }, []);
  const deletearticle = (d) => {
    const d_id = d.article_id;
    if (window.confirm("确定要删除吗")) {
      axios({
        method: "get",
        url: `http://10.2.13.132:8088/my/article/deletearticle/${d_id}`,
        headers: {
          authorization: managertokenstr,
        },
      })
        .then((res) => {
          setdata(data.filter((item) => item.article_id !== d_id));
          console.log(data);
        })
        .catch((err) => {
          console.log(err, 222222);
        });
    }
  };
  const editarticle = (e) => {
    // console.log(e);
    const e_id = e.article_id;
    axios({
      method: "get",
      url: `http://10.2.13.132:8088/my/article/changearticle/${e_id}`,
      data: {
        article_id: e_id,
      },
      headers: {
        authorization: managertokenstr,
      },
    })
      .then((res) => {
        // console.log(res);
        navigate("/editarticle", { state: res.data.data });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (!managertokenstr) {
      navigate("/managerlogin");
    }
  }, []);

  const pageChange = (c) => {
    setCurrent(c);
    getData(c);
  };

  return (
    <div className={styles.main}>
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
          onClick={newarticle}
          type="primary"
          style={{ borderRadius: "12px" }}
          className={styles.newarticlebutton}
        >
          新建文章课程
        </Button>
        <Divider />
        <Table dataSource={data} pagination={false} rowKey={"article_id"}>
          <Column title="ID" dataIndex="article_id" key="ID" />
          <Column title="标题" dataIndex="title" key="title" />

          <Column title="作者" dataIndex="author" key="author" />
          <Column title="修改时间" dataIndex="article_date" key="time" />
          <Column
            title="简介"
            dataIndex="article_introduce"
            key="Introduction"
            ellipsis="true"
          />

          <Column
            title="操作"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  onClick={() => editarticle(record)}
                  type="primary"
                  style={{ borderRadius: "10px" }}
                >
                  编辑
                </Button>
                <Button
                  onClick={() => deletearticle(record)}
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
