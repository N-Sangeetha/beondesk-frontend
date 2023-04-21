import React from 'react'
import { Input } from 'antd';

import styles from './searchBar.module.scss'

const { Search } = Input;

const SearchBar = ({ value, onChange, onPressEnter }) => {
  return (
    <div className={styles.CC_Search}>
      <Search
        placeholder="input search text"
        onChange={onChange}
        onPressEnter={onPressEnter}
        style={{ width: 400 }}
        enterButton
      />
    </div>
  )
}

export default SearchBar