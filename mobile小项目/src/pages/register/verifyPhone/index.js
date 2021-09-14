import React,{useState,useEffect} from "react";
import { NavBar, Icon ,InputItem ,WingBlank,Button,Modal, Toast} from 'antd-mobile'  
import { verifyPhone } from "../../../api/registe";
import './index.css'
let phone
export default function VerifyPhone(props){
    const [isDisabled,setIsDisabled] = useState(true)
    const [area,setArea] = useState(86)
    useEffect(()=>{
        // 组件挂载，展示模态框
        const area = localStorage.getItem('area') || 86
        setArea(area)
        Modal.alert('注册协议及隐私政策','在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，,请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）' ,
         [
            { text: '不同意', onPress: () =>props.history.goBack()},
            {
              text: '同意',
              style: { backgroundColor: 'red', color: 'white' },
            },
          ])
    },[])
    function phoneHandle(value){
        if(/^1[3-9]\d{9}$/.test(value)){
            setIsDisabled(false)
            phone = value
        }else{
            setIsDisabled(true)
        }
    }
    // 下一步按钮的事件处理函数，用于验证手机号是否已经注册过
    async function nextHandle(){
        console.log(phone)
        // 发送请求
        const result = await verifyPhone(phone)
        // 如果可以注册，跳转到下一个界面
        if(result.data.success){
            Modal.alert(undefined,'我们将发送短信/语音验证码至:'+phone,[{
                text:'不同意',
                style:'default'
            },
            {
                text:'同意',
                onPress:()=>{
                    // 往redux中存储手机号
                    props.savePhone(phone)
                    // 跳转到验证码界面
                    props.history.push('/verifyCode')

                },
                style: { backgroundColor: 'red', color: 'white' },
            }])
        }else{
            // 手机号已经注册过了，并提示用户，返回到login界面
            Toast.info(result.data.message)
            setTimeout(() => {
                props.history.goBack()
            }, 2000);
        }
    }
    return(
        <div className="wrap">

            <WingBlank>
                <NavBar mode="light" icon={<Icon type="left" style={{color:'black'}}/>}
                    onLeftClick={() =>props.history.goBack()}>硅谷注册登录
                </NavBar>

                <InputItem clear placeholder="请输入手机号" onChange={phoneHandle}>
                    <div className='selectPhone' onClick={()=>props.history.push('/country')}>
                        <span>+</span>
                        <span>{area}</span>
                        <span><Icon type='down'></Icon></span>
                    </div>
                </InputItem>
                <WingBlank>
                <Button type="warning" disabled={isDisabled} className="btn-login" onClick={nextHandle}>下一步</Button>
                </WingBlank>
            </WingBlank>
        </div>
    )

}