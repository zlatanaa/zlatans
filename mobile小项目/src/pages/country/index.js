import React,{useState,useEffect} from 'react'
import { NavBar, Icon ,List} from 'antd-mobile'
import {getCountryData} from '../../api/common'
import './index.css'
export default function Country (props){
    const Item = List.Item;
    const [list,setList] = useState({})
    useEffect(async()=>{
        const result = await getCountryData()
        setList(result.data.data)
        // console.log(result)
    },[])
    const keysArr = Object.keys(list)
    function clickHandle(e){
        e.preventDefault()

        // 跳转到哪个位置上
        const id = e.target.dataset.id

        // 真实的dom对象.scrollIntoView()
        document.querySelector(`#${id}`).scrollIntoView()
    }
    // 点击国家的选项，存储区号到本地缓存，返回到上一个路径
    function itemClickHandle(area){
        return(e)=>{
            localStorage.setItem('area',area)
            props.history.goBack()
        }
    }
    return(
        <div>
            <NavBar mode="light" icon={<Icon type="left" style={{color:'black'}}/>}
                onLeftClick={() =>props.history.goBack()}>硅谷注册登录
            </NavBar>
            <div className="country-nav">
                {keysArr.map(item=><a key={item} href="#" onClick={clickHandle} data-id={item}>{item}</a>)}
            </div>
            <div>
                {keysArr.map(key=>{
                    const itemArr = list[key]
                    return<List key={key} renderHeader={() => key} className="my-list" id={key}>
                        {
                            itemArr.map((item,index)=>{
                                const key = Object.keys(item)[0]
                                return<Item key={index} extra={item[key]} onClick={itemClickHandle(item[key])}>{key}</Item>
                            })
                        }
                
            </List>
                })}
            </div>
            
        </div>
        
    )
}