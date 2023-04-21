import { useAxiosToken } from '@/wscore/hook/useAxios'
import {
  CommitPostRequest,
  CommPostRequest,
  GridDetailRequest,
  GridDetailRequestParam,
  PageRequest,
  QuickQueryRequest
} from '@/wscore/api/base/basetype'
import { AxiosPromise } from 'axios'

const { getUseToken, postUseToken } = useAxiosToken()
export const pageQuery = (pageRequest: PageRequest, pageFunc: string) => {
  const sUrl = pageFunc + '/PageQuery'
  return getUseToken({
    url: sUrl,
    data: pageRequest
  })
}

export const quickQueryApi = <T>(pageRequest: QuickQueryRequest, pageFuncNo: string) => {
  const sUrl = pageFuncNo + '/QuickQuery'
  return postUseToken<T>({
    url: sUrl,
    method: 'get',
    headersType: 'application/x-www-form-urlencoded',
    params: pageRequest
  })
}

/**
 * 初始化创建函数，可以从服务器端返回初始数值。
 * @param funcNo
 */
export const initAdd = <T>(funcNo: string): AxiosPromise<T> => {
  const sUrl = funcNo + '/Create'
  return postUseToken({
    url: sUrl,
    method: 'post',
    headersType: 'application/x-www-form-urlencoded'
  })
}

/**
 * 添加提交数据接口
 * @param addPostRequest
 */
export const addPost = async (addPostRequest: CommitPostRequest) => {
  const sUrl = addPostRequest.aFuncNo + '/CreatePost'
  const formDataJson = JSON.stringify(addPostRequest.formData)
  const paramRequest: CommPostRequest = {
    aJsonRequest: formDataJson
  }
  return postUseToken({
    url: sUrl,
    method: 'post',
    headersType: 'application/x-www-form-urlencoded',
    data: paramRequest
  })
}
export const initMod = <T>(funcNo: string): AxiosPromise<T> => {
  const sUrl = funcNo + '/Edit'
  return postUseToken({
    url: sUrl,
    method: 'post',
    headersType: 'application/x-www-form-urlencoded'
  })
}
export const modPost = async (addPostRequest: CommitPostRequest) => {
  const sUrl = addPostRequest.aFuncNo + '/EditPost'
  const formDataJson = JSON.stringify(addPostRequest.formData)
  const paramRequest: CommPostRequest = {
    aJsonRequest: formDataJson
  }
  return postUseToken({
    url: sUrl,
    method: 'post',
    headersType: 'application/x-www-form-urlencoded',
    data: paramRequest
  })
}

//=====主从表相关
export const getGridDetailApi = (gridDetailRequest: GridDetailRequest) => {
  const sUrl = gridDetailRequest.funcNo + '/GetGridDetail'

  const paramRequest: GridDetailRequestParam = {
    aIdx: String(gridDetailRequest.idx)
  }
  return getUseToken({
    url: sUrl,
    params: paramRequest
  })
}

export enum FormOpera {
  INIT = 'INIT',
  ADD = 'ADD',
  VIEW = 'VIEW',
  MOD = 'MOD'
}
