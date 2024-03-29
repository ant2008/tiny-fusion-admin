import service from '@/config/axios/service'
import {} from '@/config/axios/index'
import { useAppStore } from '@/store/modules/app'
import config from '@/config/axios/config'

// const request = (option: any) => {
//   const { url, method, params, data, headersType, responseType } = option
//   return service({
//     url: url,
//     method,
//     params,
//     data,
//     responseType: responseType,
//     headers: {
//       'Content-Type': headersType || default_headers
//     }
//   })
// }
//重新改造 axios request.
export const useAxios = () => {
  const request = (option: any) => {
    const { url, method, params, data, headersType, responseType } = option
    return service.request({
      url: url,
      method,
      params,
      data,
      responseType: responseType,
      headers: {
        'Content-Type': headersType || config.defaultHeaders
      }
    })
  }

  // const rquestPost = <T>(option: any) => {
  //   return request({ method: 'post', ...option }) as unknown as T
  // }

  return {
    get: <T = any>(option: any) => {
      return request({
        method: 'get',
        headersType: 'application/x-www-form-urlencoded',
        ...option
      }) as unknown as T
    },
    post: <T = any>(option: any) => {
      const res = request({
        method: 'post',
        headersType: 'application/x-www-form-urlencoded',
        ...option
      })
      return res as unknown as T
    },
    delete: <T = any>(option: any) => {
      return request({
        method: 'delete',
        headersType: 'application/x-www-form-urlencoded',
        ...option
      }) as unknown as T
    },
    put: <T = any>(option: any) => {
      return request({
        method: 'put',
        headersType: 'application/x-www-form-urlencoded',
        ...option
      }) as unknown as T
    }
  }
}
export const useAxiosToken = () => {
  const request = (option: any) => {
    const { url, method, params, data, headersType, responseType } = option
    const appStore = useAppStore()

    return service.request({
      url: url,
      method,
      params,
      data,
      responseType: responseType,
      headers: {
        'Content-Type': headersType || config.defaultHeaders,
        Authorization: appStore.getToken //待处理token
      }
    })
  }

  return {
    getToken: (): string => {
      const appStore = useAppStore()
      return appStore.getToken
    },
    getUseToken: <T = any>(option: any) => {
      return request({
        method: 'get',
        headersType: 'application/x-www-form-urlencoded',
        ...option
      }) as unknown as T
    },
    postUseToken: <T = any>(option: any) => {
      const res = request({
        method: 'post',
        headersType: 'application/x-www-form-urlencoded',
        ...option
      })
      return res as unknown as T
    },
    deleteUseToken: <T = any>(option: any) => {
      return request({
        method: 'delete',
        headersType: 'application/x-www-form-urlencoded',
        ...option
      }) as unknown as T
    },
    putUseToken: <T = any>(option: any) => {
      return request({
        method: 'put',
        headersType: 'application/x-www-form-urlencoded',
        ...option
      }) as unknown as T
    },
    requestUseToken: <T = any>(option: any) => {
      return request({
        headersType: 'application/x-www-form-urlencoded',
        ...option
      }) as unknown as T
    }
  }
}
