import React, { useEffect } from 'react'
import { Todo } from './model'
import { AiFillEdit,AiFillDelete } from "react-icons/ai"
import {MdOutlineDone} from "react-icons/md"
import {useState, useRef} from 'react'
import "./styles.css"
import { TodoList } from './TodoList'
import { Draggable } from 'react-beautiful-dnd'
type props ={
    index: number,
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    modify: any


}

export const SingleTodo = ({index,todo,todos,setTodos, modify}:props) => {
    const [edit,setEdit] = useState<boolean>(false)
    const [editTodo,setEditTodo] = useState<string>(todo.todo);


    const handleDone=(id:Number | string) =>{
        setTodos(todos.map((todo)=>todo.id===id?{...todo,isDone:!todo.isDone}:todo))
        modify(id)
  
    }
    const handleDelete=(id:Number | string)=>{
        setTodos(todos.filter((todo)=>todo.id!==id))

    }

    const handleEdit=(e:React.FormEvent,id:string | number)=>{
        e.preventDefault();
        setTodos(todos.map((todo)=>(
            todo.id===id?{...todo,todo:editTodo}:todo
        )
        ))

        setEdit(false);
        
    }

    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(()=>{ inputRef.current?.focus()}
    ,[edit])
    

    const handleChange =(e:React.FormEvent)=>{


  



    }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>

{
    (provided,snapshot)=>(
        <form className={`todos_single ${snapshot.isDragging?"drag":""}`}
         onSubmit={(e)=>handleEdit(e,todo.id) }
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
        >
        

        {
            edit?(
                <input ref={inputRef} value={editTodo} onChange={(e)=>setEditTodo(e.target.value)} className="todos_single_text"/>
                ):(
                todo.isDone?(
                    <s className="todos_single_text" onClick={handleChange}>{todo.todo}</s>
                    ):(
                    
                    <span className="todos_single_text">{todo.todo}</span>
                )

            )
        }
        {
        }

        <div>
        </div>
            <span className="icon" onClick={()=>{
                if(!edit && !todo.isDone){
                    setEdit(!edit)
                }
            }
            }><AiFillEdit /></span>
            <span className="icon" onClick={()=>handleDelete(todo.id)}><AiFillDelete /></span>

            <span className="icon" onClick={()=>handleDone(todo.id)}>
                
                <MdOutlineDone />
                </span>


    </form>
    )
}
    

    </Draggable>
  )
}
