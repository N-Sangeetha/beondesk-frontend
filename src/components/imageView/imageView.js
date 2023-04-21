import React from 'react';
import { Avatar, Button, Image, Modal, Space } from 'antd';
import styles from './imageView.module.scss'

const ImageView = ({image, open, setOpen}) => {

  const download = () => {
    window.open(image?.urls?.full, '_blank')
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
        <Image src={image?.urls?.full} width={'100%'} height={600} preview={false} />

        <div style={{ marginTop: '30px' }} className='CC_Button centered-item'>
          <Button type="primary" shape="round" size="large" onClick={download}>Download</Button>
        </div>
      </Modal>
    </div>
  )
}

export default ImageView