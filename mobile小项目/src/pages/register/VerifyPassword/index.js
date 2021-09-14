import React, { Component } from 'react'
import {
  NavBar,
  Icon,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Toast
} from 'antd-mobile'
import './index.css'
import { registe } from '../../../api/registe'
import msg from './msg.png'
let password
export default class VerifyCode extends Component {
  state={
    isShow:false,
    isDisabled:true
  }
  changeHandle=(value)=>{
    if(/^\w{8,20}$/.test(value)){
      this.setState({
        isDisabled:false
      })
      password = value
    }else{
      this.setState({
        isDisabled:true
      })
    }

  }
  registeHandle= async()=>{
    const phone = this.props.phone
    const result = await registe(phone,password)
    console.log(result)
    if(result.data.success){
      this.props.history.push('/home',result.data.data.user)
    }else{
      Toast.fail('注册失败',result.data.message)
    }
  }
  render() {
    const {isShow ,isDisabled} = this.state
    return (
      <div className='wrap'>
        <NavBar
          mode='light'
          icon={<Icon type='left' color='#000' onClick={()=>this.props.history.goBack()}/>}
          onLeftClick={() => console.log(111)}
        >
          硅谷注册
        </NavBar>
        <WhiteSpace size='lg'></WhiteSpace>

        <WingBlank size='lg'>
          <div className='img'>
            <img src={msg} alt='' />
          </div>
          <WhiteSpace size='lg'></WhiteSpace>
          <WingBlank size='lg'>
            <div className='tip'>请设置登录密码</div>
          </WingBlank>
          <WhiteSpace size='lg'></WhiteSpace>

          <div className='code'>
            <InputItem
              className='psw'
              type={isShow?'text':'password'}
              clear
              placeholder='请设置8~20位登录密码'
              extra={<span className={isShow ?'iconfont icon-yanjing':'iconfont icon-close-eye'} onClick={()=>{
                 this.setState({isShow:!isShow})
                }}></span>}
            onChange={this.changeHandle}></InputItem>
          </div>
          <WingBlank size='lg'>
            <div>
              密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
            </div>
          </WingBlank>
          <WingBlank size='lg'>
            <Button className='code-next' type='warning' disabled={isDisabled} onClick={this.registeHandle}>
              完成
            </Button>
          </WingBlank>
          <WingBlank size='lg'>
            遇到问题了?
            <a href=''>请联系客服</a>
          </WingBlank>
        </WingBlank>
      </div>
    )
  }
}
