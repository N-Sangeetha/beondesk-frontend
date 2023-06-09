import React, { useEffect, useState } from "react";
import axios from "axios";
import { notification, Space, Empty, Spin } from "antd";

import ImageCard from "../components/imageCard/imageCard";
import SearchBar from "../components/searchBar/searchBar";
import Button from '../components/button/button';

const Home = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const per_page = 9;

  useEffect(() => {
    //debounce
    let delay;
    if (!query) getResults()
    else {
      delay = setTimeout(() => getResults(), 1000)
    }

    return () => clearTimeout(delay)
    // eslint-disable-next-line
  }, [query]);

  const getResults = async (pg) => {
    try {
      if (!pg) setLoading(true)

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/images?query=${query}&page=${pg || page}&per_page=${per_page}`, { headers: { Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}` } });

      if (response.data?.code === 200) {
        if (pg) {
          const res = { ...results }
          res.results = res.results.concat(response.data?.images?.results)

          setResults(res)
        } else {
          setResults(response.data?.images);
        }
      }

      setLoading(false)
    } catch (e) {
      notification.error({ message: "Error", description: e.response?.data?.message || e.message });
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
    <div style={{ marginBottom: '30px' }}>

      <SearchBar width={400} onChange={onSearchChange} onPressEnter={() => { getResults() }} />

      <div style={{ marginTop: "80px", marginBottom: '30px' }}>
        <Spin spinning={loading}>
          <Space size={30} wrap>
            {
              results?.results?.length > 0 ? results?.results?.map(item => 
                <ImageCard data={item} key={item.id} hasView={true} />)
                : <Empty />
            }
          </Space>
        </Spin>
      </div>

      {page < results?.total_pages && !loading &&
        <Button label="Load More" cssClass="centered-item" onClick={onPageChange} />}

    </div>
  );
};

export default Home;
