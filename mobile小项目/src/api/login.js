import axios from 'axios'
export function sendCode(phone) {
  return axios({
    method: 'post',
    url: '/login/digits',
    data: {
      phone,
    },
  })
}
export function loginPhone(phone,code) {
  return axios({
    method: 'post',
    url: '/login/phone',
    data: {
      phone,
      code
    },
  })
}