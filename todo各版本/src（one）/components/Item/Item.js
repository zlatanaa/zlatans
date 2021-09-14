import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './Item.css'
export default class Item extends Component {
    delHandle=()=>{
      const {item} = this.props
      PubSub.publish('delete',item.id)
    }
  render() {
    const {item} = this.props 
    return (
      <li>
        <label>
          <input type="checkbox" checked={item.isDone ||''} onChange={()=>{PubSub.publish('update',item.id)}}/>
          <span className={item.isDone?'done':''} >{item.todoName}</span>
        </label>
        <button className="btn btn-danger" onClick={this.delHandle}>删除</button>
      </li>
    )
  }
}
