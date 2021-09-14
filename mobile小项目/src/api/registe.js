import axios from 'axios'
export function verifyPhone(phone){
    return axios({
        method:'post',
        url:'/regist/verify_phone',
        data:{
            phone
        }
    })
}
export function verifyCode(phone,code){
    return axios({
        method:'post',
        url:'/regist/verify_code',
        data:{
            phone,
            code
        }
    })
}
export function registe(phone,password){
    return axios({
        method:'post',
        url:'/regist/user',
        data:{
            phone,
            password
        }
    })
}
