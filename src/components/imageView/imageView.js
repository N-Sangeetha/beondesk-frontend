import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Avatar, Image, Modal, Space } from 'antd';
import Button from '../button/button'

import styles from './imageView.module.scss'

const ImageView = ({ image, open, setOpen }) => {

  const download = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/download?id=${image?.id}`,
      { headers: { Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}` } })

    if (response.data) {
      saveAs(response.data, `image_${image?.id}.jpg`)
    }
  }

  const Title = () => {
    return (<Space>
      <Avatar size={48} src={image?.user?.profile_image?.medium} />
      <div className={styles.CC_userDetail}>
        <div className={styles.CC_name}>{image?.user?.name}</div>
        <div className={styles.CC_userName}>@{image?.user?.username}</div>
      </div>
    </Space>)
  }

  return (
    <div>
      <Modal
        title={<Title />}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={null}
      >
        <div className='centered-item' style={{ marginBottom: '30px' }}>
          <Image src={image?.urls?.full} height={600} preview={false} />
        </div>

        <Button label="Download" cssClass="centered-item" onClick={download} />

      </Modal>
    </div>
  )
}

export default ImageView