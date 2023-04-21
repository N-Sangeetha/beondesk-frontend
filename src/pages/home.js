import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, notification, Space, Empty, Spin } from "antd";
import ImageCard from "../components/imageCard/imageCard";
import SearchBar from "../components/searchBar/searchBar";

const Home = () => {
  const [notificationApi, contextHolder] = notification.useNotification();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const per_page = 9;

  useEffect(() => {
    //debounce
    let delay;
    if (!query) {
      getResults()
    } else {
      delay = setTimeout(() => {
        getResults();
      }, 1000)
    }

    return () => clearTimeout(delay)

    // eslint-disable-next-line
  }, [query]);

  const getResults = async (pg) => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/images?query=${query}&page=${pg || page}&per_page=${per_page}`,
        { headers: { Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}` } });

      if (response.data?.code === 200) {
        if (pg) {
          const res = { ...results }
          res.results = res.results.concat(response.data?.images?.results)

          setResults(res)
        } else {
          setResults(response.data?.images);
        }
      } else {
        notificationApi.error({
          message: "Error",
          description: response.data?.message,
        });
      }

      setLoading(false)
    } catch (e) {
      notificationApi.error({
        message: "Error",
        description: e.message,
      });

      setLoading(false)
    }
  };

  const onSearchChange = (e) => {
    setQuery(e.target.value)
    setPage(1)
  };

  const onPageChange = () => {
    setPage(page + 1)
    getResults(page + 1)
  }

  return (
    <div>
      {contextHolder}
      <SearchBar value={query} onChange={onSearchChange} onPressEnter={() => { getResults() }} />
      <div className="centered-item" style={{ marginTop: "80px" }}>
        {loading ? <Spin /> :
          <Space size={30} wrap>
            {results?.results?.length > 0 ? results?.results?.map((item) => {
              return <ImageCard data={item} key={item.id} />;
            }) :
              <Empty />}
          </Space>}
      </div>
      {page < results?.total_pages && !loading ? <div className="CC_Button centered-item" style={{ marginTop: "30px", marginBottom: '30px' }}>
        <Button type="primary" shape="round" size="large" onClick={onPageChange}>Load More</Button>
      </div> : null}
    </div>
  );
};

export default Home;
