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
import {sendCode} from '../../../api/login'
import {verifyCode} from '../../../api/registe'
import './index.css'
import msg from './msg.png'
const num = 5
let code
export default class VerifyCode extends Component {
  
  state={
    downCount:num,
    isClick:false,
    isDisabled:true
  }
  componentDidMount(){
    this.sendCodeHandle()
  }
  sendCodeHandle = async()=>{
    this.setState({
      isClick:false
    })
    await sendCode(this.props.phone)
    let timer = setInterval(() => {
      const {downCount} = this.state
      if(downCount === 1){
        clearInterval(timer)
        this.setState({
          isClick:true,
          downCount:num
        })
      }else{
        this.setState({
          downCount:downCount - 1
        })
      }
    }, 1000);
  }
  // 点击按钮重新发送请求
  reSendCodeHandle =()=>{
    if(!this.state.isClick) return

    this.sendCodeHandle()
  }
// 用户输入验证码的事件处理函数
  textHandle = (value) =>{
    if(/^\d{6}$/.test(value)){
      // 让按钮高亮
      this.setState({
        isDisabled:false
      })
    }else{
      this.setState({
        isDisabled:true
      })
    }
  }
  verifyCodeHandle = async ()=>{
    const phone = this.props.phone
    const result = await verifyCode(phone,code)
    if(result.data.success){
      this.props.history.push('/verifyPassword')
    }else{
      Toast.fail(result.data.message)
    }
  }
  render() {
    return (
      <div className='wrap'>
        <NavBar
          mode='light'
          icon={<Icon type='left' color='#000' onClick={()=>this.props.history.goBack()} />}
          onLeftClick={console.log(111)}
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
            <div>
              我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
            </div>
          </WingBlank>
          <WhiteSpace size='lg'></WhiteSpace>

          <div className='code'>
            <InputItem clear placeholder='请输入手机验证码' onChange={this.textHandle}></InputItem>
            <button className={this.state.isClick?'code-btn active':'code-btn'} onClick={this.reSendCodeHandle}>{this.state.isClick ? '获取验证码' : `重新发送(${this.state.downCount}s)`}</button>
          </div>
          <WingBlank size='lg'>
            <Button className='code-next' type='warning' disabled={this.state.isDisabled} onClick={this.verifyCodeHandle}>
              下一步
            </Button>
          </WingBlank>
          <WingBlank size='lg'>
            遇到问题了?
            <a href='#'>请联系客服</a>
          </WingBlank>
        </WingBlank>
      </div>
    )
  }
}
