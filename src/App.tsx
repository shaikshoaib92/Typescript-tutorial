import React, { useState } from 'react';
import './App.css';
import { InputFeild } from './components/InputFeild';
import { Todo } from './components/model';
import { TodoList } from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])




  const modify = (id: number | string) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    let active = JSON.parse(JSON.stringify(todos));
    let completed = JSON.parse(JSON.stringify(completedTodos));
    let index = -1;
    for (let i = 0; i < todos.length; ++i) {
      if (todos[i].id === id) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      todos[index].isDone = true;
      active.splice(index, 1);
      completed.push(todos[index])
      setTodos(active)
      setCompletedTodos(completed)
    }
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("")
    }

  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }


    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }



    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, { ...add, isDone: false });
    } else {
      complete.splice(destination.index, 0, { ...add, isDone: true });
    }


    setCompletedTodos(complete)
    setTodos(active)



  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>

     

      <div className="App">
      <nav className='nav'>
        <span className="heading">T  a  s  k  i  f  y</span>

      </nav>
        {/* <div className="heading_background">
        </div> */}
        
        <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          modify={modify}
        />
        {/* <span className="note">You can also drag the item from Active task to completed Task</span> */}
      </div>
    </DragDropContext>
  )

}

export default App;
