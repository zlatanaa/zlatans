import React from 'react'
import './Item.css'
import PubSub from 'pubsub-js'
export default function Item(props) {
  const {list} = props
  return (
    <li>
      <label>
        <input type="checkbox" checked={list.isDone} onChange={()=>{
          PubSub.publish('update',list.id)
        }}/>
        <span className={list.isDone?'done':''}>{list.todoName}</span>
      </label>
      <button className="btn btn-danger" onClick={
        ()=>{PubSub.publish('delete',list.id)} 
      }>删除</button>
    </li>
  )
}
