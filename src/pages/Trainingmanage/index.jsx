import React, { useState, useEffect } from "react";
import { Input, Button, Divider, Space, Table, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./index.module.css";
// import { SearcharticleApi } from "../../request/api";
import { GetexamApi, DeleteexamApi, TrainingserchApi } from "../../request/api";

const { Column } = Table;
export default function Articlemanage() {
  //列表数组
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const { Search } = Input;
  const onSearch = (value) => {
    TrainingserchApi({ value: value })
      .then((res) => {
        setTotal(res.data.total);
        setdata(res.data.data);
      })
      .catch((err) => {});
  }; //搜索
  const newexam = () => {
    navigate("/newexam");
  };
  const managertokenstr = localStorage.getItem("managertoken");
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const getData = (c) => {
    GetexamApi({ current: c })
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
    const d_id = d.exam_id;
    if (window.confirm("确定要删除吗")) {
      DeleteexamApi({ exam_id: d_id })
        .then((res) => {
          // console.log(res);
          setdata(data.filter((item) => item.exam_id !== d_id));
        })
        .catch((err) => {});
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
          onClick={newexam}
          type="primary"
          style={{ borderRadius: "12px" }}
          className={styles.newarticlebutton}
        >
          新建试题
        </Button>
        <Divider />
        <Table dataSource={data} pagination={false} rowKey={"exam_id"}>
          <Column title="ID" dataIndex="exam_id" key="exam_id" />
          <Column title="试题名" dataIndex="exam_name" key="exam_name" />
          <Column title="类型" dataIndex="exam_type" key="exam_type" />
          <Column
            title=""
            dataIndex="exam_type_classify"
            key="exam_type_classify"
          />
          {/* <Column title="修改时间" dataIndex="article_date" key="time" /> */}

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
