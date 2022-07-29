import React, {useState} from 'react'

export default function Notes({notes}) {
  return (

    <div className="notes">

        { notes && notes.map(note=>{
            return (
            <div className='note' key={note.title}>
                {note}
            </div>
            )
        })}  


    </div>
  )
}
