import React, { useState } from 'react';
import { Avatar, Image, Space } from 'antd';
import styles from './imageCard.module.scss'
import ImageView from '../imageView/imageView';

const ImageCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div onClick={() => setOpen(data)} className={styles.CC_imageCard}>
        <Image width={300} height={200} src={data?.urls?.small} preview={false} />
        <div className={styles.CC_imageCardDetails}>
          <Space align='center'>
            <Avatar src={data?.user?.profile_image?.small} />
            <div>Image by <span>{data?.user?.name}</span></div>
          </Space>
        </div>
      </div>
      {open ? <ImageView image={open} open={open ? true : false} setOpen={setOpen} /> : null}
    </>
  )
}

export default ImageCard