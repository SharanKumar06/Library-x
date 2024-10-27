import React from 'react'
import Button1 from '../../../components/Button1'
import BookForm from './BookForm';

function Books() {
  const [openBookForm , setOpenBookForm]= React.useState(false);
  return (
    <div>
        <div class="flex justify-end">
            <Button1 title='Add Book' onClick={()=>setOpenBookForm(true)} />
        </div>

      {openBookForm && <BookForm open={openBookForm} setOpen={setOpenBookForm} />}

    </div>
  )
}

export default Books