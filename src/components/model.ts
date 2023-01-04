import { stat } from "fs";
import { Key, useReducer } from "react";

export interface Todo{
    id: number | string;
    todo: string;
    isDone: Boolean;
}

type Actions = 
| {type:"add", payload: string}
| {type:"remove", payload: number}
| {type:"done", payload: number}




// const TodoReducer = (state:Todo[],action:Actions) =>{
//     switch(action.type){
//         case "add":
//             return[
//                 ...state,
//                 {id: Date.now(), todo: action.payload,isDone:false}
//             ];
//         case "remove":
//             return state.filter((todo)=>todo.id !== action.payload)    
//         case "done":
//             return state.map((todo)=>
//             todo.id !== action.payload ? {...todo,isDone: !todo.isDone}
//             )    

//         default:
//             return state;    

//     }
// }

// export const RefucerExample = () => {

//     const [state,dispatch] = useReducer(TodoReducer,[])
//   return (
//     <div>RefucerExample</div>
//   )
// }
