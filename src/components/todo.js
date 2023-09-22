import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, clearAll, updateTodo, setData, setUser } from "../store/slice.js"
import './todo.css'
import {db,auth} from '../firebaseConfig.js'
import {signOut} from 'firebase/auth'
import { onValue, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";


const Todo = () => {
  const [val, setVal] = useState("");
  const [btn, setBtn] = useState("Add");
  const[indexNumber, setIndexNumber] = useState();
  const dispatch = useDispatch();
  const showData = useSelector((state) => state.todo.data);
  const uid = useSelector((state) => state.todo.user);

  
  const navigate = useNavigate();
  
  useEffect(() => {
      onValue(ref(db, uid + '/todo' ),async(data) => {
        console.log(data.val())
       dispatch(setData(await data.val()? data.val() : []))
      })
  },[])

  const formSubmit = (event) => {
    event.preventDefault();
   val.trim() !== "" ? (btn === "Add") ? dispatch(addTodo(val)) :  (dispatch(updateTodo({ind:indexNumber,val:val})) && setBtn("Add"))    : alert("Please Enter Text");
    // set(ref(db, '/'), {todo: val});
    setVal("");
  }
  const logOut = () =>{
    signOut(auth);
    dispatch(setUser(""));
    navigate('/');
  }

  return (
    <div className="container">
      <button className="logout-btn" onClick={logOut}>Logout</button>
      <h1>Todo List</h1>
      <form onSubmit={formSubmit} className='center-div'>
        <input className="todo-inp" type="text" value={val} onChange={(e) => setVal(e.target.value)} />
        <button className="todo-btn" type="submit">{btn}</button>
        <button className="todo-btn" type="button" onClick={() => { dispatch(clearAll()); setVal(""); setBtn("Add") }}>Clear All</button>
      </form>
      <div>
        <ul>
          {showData.map((element, index) => (
            <div className='ul-div'>
              <li>{element}</li>
              <span className="li-btn" onClick={() => { setVal(showData[index]); setBtn("Update");setIndexNumber(index)}}>Edit</span>
            <span className="li-btn" onClick={() => {dispatch(deleteTodo(index));setVal("");setBtn("Add")}}>Del</span>
            </div>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default Todo;