import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Avatar, Button, Image, Modal, Space } from 'antd';
import styles from './imageView.module.scss'

const ImageView = ({ image, open, setOpen }) => {

  const download = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/download?id=${image?.id}`,
      { headers: { Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}` } })

    if (response.data) {
      saveAs(response.data, `image_${image?.id}.jpg`)
    }
  }

  return (
    <div>
      <Modal
        title={<Space>
          <Avatar size={48} src={image?.user?.profile_image?.small} />
          <div className={styles.CC_userDetail}>
            <div className={styles.CC_name}>{image?.user?.name}</div>
            <div className={styles.CC_userName}>@{image?.user?.username}</div>
          </div>
        </Space>}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={null}
      >
        <div className='centered-item'>
          <Image src={image?.urls?.full} height={600} preview={false} />
        </div>
        <div style={{ marginTop: '30px' }} className='CC_Button centered-item'>
          <Button type="primary" shape="round" size="large" onClick={download}>Download</Button>
        </div>
      </Modal>
    </div>
  )
}

export default ImageView