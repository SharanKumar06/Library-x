import { Modal } from 'antd'
import React from 'react'

function Issues(
   { open ,
    setOpen ,
    selectedBook }
) {
  return (
    <Modal title= 'Issues' open= {open} onCancel= {()=> setOpen(false)}
    footer={null}
    width={1000}
    >
        <div>Issues List</div>

    </Modal>
  )
}

export default Issues