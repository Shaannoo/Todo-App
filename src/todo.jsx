import React from 'react';
import './todo.css';
import { useState , useRef ,useEffect} from 'react';
import { MdDelete } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
function Todo() {
    const[tudo,settudo]=useState("")
    const[tudos,settudos]=useState([]);
    const [editID,seteditId]=useState(0)

const handleSubmit=(e)=>{
e.preventDefault();
}

    const addtodo=()=>{
        if(tudo!==""){
         settudos([...tudos,{list: tudo,id:Date.now(),status:false}]);
         settudo("")
        }
          
  if(editID){
    const editTudo=tudos.find((tudo)=>tudo.id==editID)
    const updateTudo= tudos.map((to)=>to.id===editTudo.id
    ?(to ={id:to.id, list:tudo})
    :(to={id:to.id, list:to.list}))
    settudos(updateTudo)
    seteditId(0);
    settudo("")
  }
    };
   const inputRef=useRef('null')

useEffect(()=>{
inputRef.current.focus();

})
const onDelete=(id)=>{
settudos(tudos.filter((to)=>to.id !== id))
}
const onComplete=(id)=>{
    let complete=tudos.map((list)=>{
        if(list.id === id){
            return({...list,status:!list.status})
        }
        return list
    })
    settudos(complete)
};
const onEdit=(id)=>{
   const editTudo= tudos.find((to)=>to.id===id)
   settudo(editTudo.list)
   seteditId(editTudo.id)
}

  return (
    <div className='container'> 
     <h2 >TODO APP</h2>
     <form className='form-group' onSubmit={handleSubmit}>
     <input  type='text' placeholder='enter your tudo' value={tudo} ref={inputRef} className='form-control' onChange={(event)=>settudo(event.target.value)}/>
     <button onClick={addtodo} >{editID? 'EDIT':'ADD'}</button>
     </form>
    <div className='list'>
    <ul>
        {
         tudos.map((num)=>(
            <li className='list-items'>
                <div className='list-item-list' id={num.status? 'list-item':""}> {num.list}</div> 
            <span>
            <IoMdDoneAll  className='list-item-icons'
             id='complete' 
             title='Complete'
             onClick={()=>onComplete(num.id)}
             />
            <RiFileEditFill
             className='list-item-icons'
              id='edit'
                title='Edit'
                onClick={()=>onEdit(num.id)}
                 />
            <MdDelete  className='list-item-icons' 
            id='delete'
             title='Delete'
             onClick={()=>onDelete(num.id)}
             />
            </span>
            </li>
        ))}
    </ul>
     </div>
     </div>
  )
}
export default Todo;