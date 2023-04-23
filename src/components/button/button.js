import React from 'react'
import { Button } from "antd";

import styles from './button.module.scss'

const Index = (props) => {
  const type = props.type || 'primary';
  const shape = props.shape || 'round';
  const size = props.size || 'large';
  const label = props.label || '';
  const cssClass = props.cssClass || '';
  const onClick = props.onClick ? props.onClick : () => {}; 
  
  return (
    <div className={`${styles.CC_button} ${cssClass}`}>
        <Button type={type} shape={shape} size={size} onClick={onClick}>{label}</Button>
    </div>
  )
}

export default Index