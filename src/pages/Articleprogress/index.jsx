import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Divider, Table, Pagination } from "antd";
import { GetvideodurationApi } from "../../request/api";

const { Column } = Table;
export default function Articleprogress() {
  const [data, setdata] = useState([]);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const getData = (c) => {
    GetvideodurationApi({ current: c })
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
  const pageChange = (c) => {
    setCurrent(c);
    getData(c);
  };
  return (
    <div>
      <div className={styles.mcontent}>
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
