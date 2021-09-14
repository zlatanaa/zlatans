import React, { Component } from 'react'
import Header from './components/Header/Header'
import List from './components/List/List'
import Footer from './components/Footer/Footer'
import { setLocal } from './utils/localStore'
import './App.css'
import PubSub from 'pubsub-js'
export default class App extends Component {

  constructor(){
    super()
    this.state={
      list:JSON.parse(localStorage.getItem('itemlist')) || []
    }
  }
  // state={list:[{id:1,todoName:'钓鱼',isDone:false},
  //             {id:2,todoName:'喝酒',idDone:false}
  //        ]}
  addTodo = (todoName)=>{
    let todo = {
      idDone:false,
      todoName,
      id:Date.now()
    }
      this.state.list.push(todo)
      this.setState({
        list:this.state.list
      })
  }
  updateTodo=(id)=>{
    this.state.list.forEach((item)=>{
      if(item.id === id){
        item.isDone = !item.isDone
      }
    })
    this.setState({
      list:this.state.list
    })
  }
  deleteTodo=(id)=>{
      const {list} = this.state
      const newList = list.filter((item)=>item.id !== id)
      this.setState({
        list:newList
      })
  }
  allCheckedHandle=()=>{
      const {list} = this.state
      const result = list.every(item=>item.isDone)
      console.log(result)

      list.forEach(item=>item.isDone = !result)
      this.setState({
        list
      })
  }
  delDoneHandle=()=>{
    const {list} = this.state
    const newList = list.filter(item=>!item.isDone)
    this.setState({
      list:newList
    })
  }
  render(){
      const{list} = this.state
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo}></Header>
          {list.length?<div>
            <List list={list}></List>
            <Footer list={list} allCheckedHandle={this.allCheckedHandle} delDoneHandle={this.delDoneHandle}></Footer>
          </div> :<h2>暂无待办任务</h2>} 
        </div>
      </div>
    )
  }
  // 使用pubsub把更新和删除进行优化
  componentDidMount(){
    this.updateToken = PubSub.subscribe('update',(msg,id)=>{
        this.updateTodo(id)
    })
    this.deleteToken =  PubSub.subscribe('delete',(msg,id)=>{
      this.deleteTodo(id)
    })
  }
  componentWillUnmount(){
    PubSub.unsubscribe(this.updateToken)
    PubSub.unsubscribe(this.deleteToken)
  }
  componentDidUpdate(){
    setLocal('itemlist',this.state.list)
  }
}
