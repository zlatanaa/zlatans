import React from 'react'
import { useState,useEffect } from 'react'
import PubSub from 'pubsub-js'
import Header from './components/Header/Header'
import List from './components/List/List'
import Footer from './components/Footer/Footer'
import './App.css'
export default function App() {
//  const[list,setlist] = useState([
//     {id:1,todoName:'睡觉',isDone:false},
//     {id:2,todoName:'玩游戏',isDone:true}
// ])

const todos = JSON.parse(localStorage.getItem('todos')) || []
const [list, setlist] = useState(todos)
localStorage.setItem('todos', JSON.stringify(list))
  useEffect(()=>{
   const addToken = PubSub.subscribe('addTodo',(msg,todoName)=>{
      const todo={
        todoName,
        id:Date.now(),
        isDone:false
      }
      const newList = [...list]
      newList.push(todo)
      setlist(newList)
    })
    const updateToken = PubSub.subscribe('update',(msg,id)=>{
        list.forEach((item)=>{
          if(item.id === id){
            item.isDone = !item.isDone
          }
        })
        const newList = [...list]
        setlist(newList)
    })
    const deleteToken = PubSub.subscribe('delete',(msg,id)=>{
     const newList = list.filter(item=>item.id !== id)
     setlist(newList)
    })
    const allCheckedToken = PubSub.subscribe('allChecked',(msg,checked)=>{
      const newList = list.map((item)=>{
        item.isDone = checked
        return item
      })
      setlist(newList)
    })
    const deleteAllToken = PubSub.subscribe('deleteAll',()=>{
     const newList = list.filter((item)=>{return !item.isDone})
     setlist(newList)
    })
    
    return ()=>{
      PubSub.unsubscribe(addToken)
      PubSub.unsubscribe(updateToken)
      PubSub.unsubscribe(deleteToken)
      PubSub.unsubscribe(allCheckedToken)
      PubSub.unsubscribe(deleteAllToken)
    }
  })
  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <Header></Header>
        {list.length?<div>
          <List list={list} ></List>
          <Footer list={list}></Footer>
        </div>:<h1>暂无要完成的任务！！！</h1>}
      </div>
    </div>
  )
}
