import { useAxios } from '@/wscore/hook/useAxios'
import type { LoginType } from './logintype'
import { UserLoginDto } from './logintype'

const { post } = useAxios()

export const userLogin = (data: LoginType): Promise<IResponse<UserLoginDto>> => {
  const sUrl = '/Login/GetToken'
  return post({
    url: sUrl,
    data
  })
}

//todo: 待后续考虑是否需要服务器有登出模式。
export const userLoginOut = () => {
  const sUrl = '/Login/Logout'
  return post({
    url: sUrl,
    method: 'post',
    headersType: 'application/x-www-form-urlencoded'
  })
}
