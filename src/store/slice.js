import { createSlice } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";

const initialState = {
    data:[],
    user:'loading'
    
 
}

const todoSlice = createSlice({
    name : 'todolist',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            let temp = [...state.data,action.payload]
           set(ref(db,  state.user + '/'), {todo: temp})
            return{
                data:temp
            }
        },
        deleteTodo:(state,action)=>{
           
            let temp = state.data.filter((elem,ind)=> ind !== action.payload)
            set(ref(db,  state.user  + '/'), {todo: temp})
            return{
                data:temp
            }
            
        },
        updateTodo:(state,action)=>{
            state.data.splice(action.payload.ind,1,action.payload.val);    
            set(ref(db,  state.user  + '/'), {todo: state.data})
            
        },
        clearAll:(state)=>{
            state.data = [];
            set(ref(db, state.user  + '/'), {})
        },
        setData:(state,action)=>{
            state.data = action.payload
        },
        setUser:(state,action)=>{
            state.user = action.payload;
        }
    }
})

export const {addTodo,deleteTodo,clearAll,updateTodo,setData,setUser} = todoSlice.actions;
export default todoSlice.reducer;

