import { Modal } from 'antd'
import React from 'react'

function IssueForm({
    open,setOpen, selectedBook
}) {
  return (
    <Modal 
        title= "Issue Book"
        open= {open}
        onCancel={()=>setOpen(false)}
        footer={null}
        width={1000}
    >
        Issue Book
    </Modal>
  )
}

export default IssueForm