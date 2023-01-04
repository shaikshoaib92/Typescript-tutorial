import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from './model'
import { SingleTodo } from './SingleTodo';
import './styles.css'

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

    completedTodos: Todo[]
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    modify:any

}
export const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos, modify }: Props) => {

    return (
        <div className='container'>
            <Droppable droppableId='TodosList'>
                {
                    (provided, snapshot) => (

                        <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : " "}`} ref={provided.innerRef}
                            {...provided.droppableProps} >
                                <div className='todos_headig_1'><span className="todos_heading">Active Task's</span></div>
                            
                            {todos.map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    todo={todo}
                                    todos={todos}
                                    key={todo.id}
                                    setTodos={setTodos}
                                    modify={modify}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}

            </Droppable>





            <Droppable droppableId='TodosRemove'>

                {
                    (provided, snapshot) => (
                        <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : " "} `}
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                                <div className="remove_div">

                            <span className="todos_heading">Completed Task's</span>
                                </div>
                            {completedTodos.map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    todo={todo}
                                    todos={completedTodos}
                                    key={todo.id}
                                    modify={modify}
                                    setTodos={setCompletedTodos}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>



        </div>

    )
}
{/* <div className='todos'>
{todos.map((todo)=>(
    <SingleTodo todo={todo} 
    key={todo.id}
    todos={todos}
    setTodos={setTodos}
    />
))}
</div> */}

