import { getRouterMenus } from '@/wscore/api/menu/menu'
import { AxiosPromise } from 'axios'

export const routerMenus = (userId: string): AxiosPromise<AppCustomRouteRecordRaw[]> => {
  return getRouterMenus(userId)
}
