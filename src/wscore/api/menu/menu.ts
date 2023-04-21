import { useAxiosToken } from '@/wscore/hook/useAxios'
import { AxiosPromise } from 'axios'
import { MenuParam } from '@/wscore/api/menu/menuType'

const { postUseToken, getUseToken } = useAxiosToken()

export const getRouterMenus = (userId: string): AxiosPromise<AppCustomRouteRecordRaw[]> => {
  const menuParam: MenuParam = {
    userId: userId
  }
  const sUrl = 'Main/buildRouterMenus'
  return postUseToken({
    url: sUrl,
    data: menuParam
  } as AxiosConfig)
}
/**
 * 获取用户的权限明细
 * @param userId
 */
export const getFuncRights = (userId: string): AxiosPromise<FuncRightType[]> => {
  const sUrl = 'Main/UserFunc'
  return getUseToken({
    url: sUrl,
    params: {
      aUserId: userId
    },
    headersType: 'application/x-www-form-urlencoded'
  } as AxiosConfig)
}
