import React from 'react'
import './Header.css'
import PubSub from 'pubsub-js'
import { useState } from 'react'
export default function Header() {
  const [todoName,setTodoName] = useState('')
  function addTodoHandle(e){
    if(!todoName) return
    if(e.keyCode !== 13)return
    PubSub.publish('addTodo',todoName)
    setTodoName('')
  }
  function handle(e){
    setTodoName(e.target.value.trim())
  }
  return (
    <div className="todo-header">
      <input type="text" value={todoName} onKeyUp={addTodoHandle} onChange={handle}/>
    </div>
  )
}
