import React from 'react'
import PubSub from 'pubsub-js'
import './Footer.css'
export default function Footer(props) {
  const {list} = props
  const allTotal = list.length
  const doneTotal = list.filter(item=>item.isDone).length
  return (
    <div className="todo-footer">
      <label>
        <input type="checkbox" checked={allTotal === doneTotal} onChange={(e)=>{PubSub.publish('allChecked',e.target.checked)}}/>
      </label>
      <span>
        <span>已完成 {doneTotal}</span> / 全部 {allTotal}
      </span>
      <button className="btn btn-danger" onClick={()=>{
        PubSub.publish('deleteAll')
      }}>清除已完成任务</button>
    </div>
  )
}
