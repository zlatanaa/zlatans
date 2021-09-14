import React, { useState ,useEffect} from "react";
import { NavBar, Icon ,InputItem ,WingBlank,Button, Toast} from 'antd-mobile'
import './index.css'
import { Link } from "react-router-dom";
import { loginPhone } from "../../api/login";
import { sendCode } from "../../api/login";
// import {registe} from '../../api/registe'
let code
let phone
let num = 5
export default function Login (props){
   const [isDisabled,setisDisabled] = useState(true)
   const [isClick,setisClick] = useState(true)
   const [downCount,setDownCount] = useState(num)
    const [area,setArea] = useState(86)
    useEffect(()=>{
        const area = localStorage.getItem('area') || 86
        setArea(area)
    },[])
    async function sendCodeHandle(){
        setisClick(false)
        await sendCode(props.phone)
        let timer = setInterval(()=>{
            console.log(downCount)
            if(downCount === 1){
                clearInterval(timer)
                setisClick(true)
                setDownCount(num)
            }else{
                setDownCount(downCount  -1)
            }
        },1000)
    }
    function phoneHandle(value){
        if(/^1[3-9]\d{9}$/.test(value)){
            setisDisabled(true)
            phone = value
            console.log(value)
        }else{
            setisDisabled(true)
        }
    }
    function textHandle(value){
        if(/^\d{6}$/.test(value)){
            setisDisabled(false)
        }else{
            setisDisabled(true)
        }
    }
    async function verifyCodeHandle(){
        // console.log(props)
        const {phone,code} = props
        const result = await loginPhone(phone,code)
        console.log(result)
        // if(result.data.success){
            
        //     props.history.push('/home')
        // }else{
        //     Toast('登录失败',result.data.message)
        // }
    }
    // function loginHandel(){
    //     if()
    // }
    return(
        <div className='wrap'>
            <NavBar mode="light" icon={<Icon type="left" style={{color:'black'}}/>}
                onLeftClick={() => console.log('onLeftClick')}>硅谷注册登录
            </NavBar>
            <WingBlank>
                <InputItem clear placeholder="请输入手机号" onChange={phoneHandle}>
                <div className='selectPhone' onClick={()=>props.history.push('/country')}>
                    <span>+</span>
                    <span>{area}</span>
                    <span><Icon type='down' ></Icon></span>
                </div>
                </InputItem>
                <div className="getToken">
                <InputItem clear placeholder="请输入手机验证码" onChange={textHandle}>
                </InputItem>
                <WingBlank>
                <button className={isClick?'code-btn active':'code-btn'} onClick={sendCodeHandle} >{ isClick?'获取验证码':`重新发送(${downCount}s)` }</button>
                </WingBlank>
                </div>
                <WingBlank>
                <Button type="warning" disabled={isDisabled} className="btn-login" onClick={verifyCodeHandle}>登录</Button>
                </WingBlank>
                <WingBlank>
                <div className='underLogin'>
                    <a href='#'>账号密码登录</a>
                    <Link to='/verifyPhone'>手机快速注册</Link>
                </div>
                </WingBlank>
                <WingBlank>
                <div className='otherLogin'>
                    <div className='line'></div>
                    <div>其他登录方式</div>
                    <div className='line'></div>
                </div>
                <div className="icons ">
                    <i  className="iconfont icon-github" onClick={()=>{
                        // 向GitHub发送授权请求
                        window.location.href='https://github.com/login/oauth/authorize?client_id=370189e0af40c1f47a8c'
                    }}></i>
                    <i  className="iconfont icon-wechat"></i>
                    <i  className="iconfont icon-qq"></i>
                </div>
                <div className="footer">
                未注册的手机号验证后将自动创建硅谷账号, 登录即代表您已同意
                    <a href="#">硅谷隐私政策</a>
                </div>
                </WingBlank>
            </WingBlank>
        </div>
    )
}
