import React, { Component } from 'react'
import './Header.css'
export default class Header extends Component {
  state={todoName:''}

  handle=(e)=>{
    this.setState({
      todoName:e.target.value.trim()
    })
  }
  enterHandle=(e)=>{
   if(e.keyCode === 13){
     if(!this.state.todoName)return
      this.props.addTodo(this.state.todoName)
    this.setState({
      todoName:''
    })
   }
  }
  render() {
    return (
      <div className="todo-header">
        <input type="text" value={this.state.todoName} onKeyUp={this.enterHandle} onChange={this.handle}/>
      </div>
    )
  }
}
