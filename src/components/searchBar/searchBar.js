import React from 'react'
import { Input } from 'antd';

import styles from './searchBar.module.scss'

const { Search } = Input;

const SearchBar = (props) => {
  const placeholder = props.placeholder || "input search text";
  const onChange = props.onChange ? props.onChange : () => {};
  const onPressEnter = props.onPressEnter ? props.onPressEnter : () => {};
  const width = props.width || '100%';
  const cssClass = props.cssClass || '';

  return (
    <div className={`${styles.CC_Search} ${cssClass}`}>
      <Search
        placeholder={placeholder}
        onChange={onChange}
        onPressEnter={onPressEnter}
        style={{ width: width }}
        enterButton
      />
    </div>
  )
}

export default SearchBar