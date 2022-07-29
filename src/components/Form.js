import React, {useState} from 'react'

export default function Form(props) {

    const [text, setText] = useState({
        fname: '',
        lname: '',
        isTrue: ''
    })
    function handleChange(e){
        const {name, value, type, checked} = e.target;
        setText(prev=>{
            return{
                ...prev,
                [name]: type === checkbox ? checked : value
            }
        })
    }
    

  return (
    <div className="container">
    <input type="text" onChange={handleChange} value={text.fname} name='fname'/>
    <input type="text" onChange={handleChange} value={text.lname} name='lname'/>
    </div>
  )
}
