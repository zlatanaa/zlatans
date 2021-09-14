import React from 'react'
import Item from '../Item/Item'
import './List.css'
export default function List(props) {
  const {list} = props
  return <ul className="todo-main">{list.map((item)=>{
    return <Item key={item.id} list={item}></Item>
  })}</ul>
}
