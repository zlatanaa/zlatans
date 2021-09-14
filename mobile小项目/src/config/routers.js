import React from 'react'

    const Home = React.lazy(()=>import('../pages/home'))
    const Login = React.lazy(()=>import('../pages/login'))
    const VerifyPhone = React.lazy(()=>import('../container/withVP'))
    const VerifyCode = React.lazy(()=>import('../container/withVC'))
    const VerifyPassword = React.lazy(()=>import('../container/withPassword'))
    const Country = React.lazy(()=>import('../pages/country'))
const items =  [
    {path:'/',
    component:Login,
    exact:true    
    },
    {path:'/home',
    component:Home
    },
    {path:'/login',
    component:Login,    
    },
    {
    path:'/verifyPhone',
    component:VerifyPhone
    },
    {
    path:'/verifyCode',
    component:VerifyCode
    },
    {
    path:'/verifyPassword',
    component:VerifyPassword
    },
    {
    path:'/country',
    component:Country
    },

]
export default items