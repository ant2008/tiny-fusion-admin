import { useAxiosToken } from '@/wscore/hook/useAxios'
import {
  CommitPostRequest,
  CommPostRequest,
  GridDetailRequest,
  GridDetailRequestParam,
  MdPostRequestParam,
  PageRequest,
  QuickQueryRequest
} from '@/wscore/api/base/basetype'
import { AxiosPromise } from 'axios'

const { getUseToken, postUseToken, getToken } = useAxiosToken()

export const getPageButtonPermission = (pageFunc: string) => {
  const sUrl = 'Main/GetFuncDetailRight'
  return getUseToken({
    url: sUrl,
    data: {
      aToken: getToken(),
      aFuncNo: pageFunc
    }
  })
}

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

//提交新增保存
export const MdAddPost = async (funcNo: string, mdPostRequest: MdPostRequestParam) => {
  const sUrl = funcNo + '/CreatePost'
  return postUseToken({
    url: sUrl,
    method: 'post',
    headersType: 'application/x-www-form-urlencoded',
    data: mdPostRequest
  })
}

//提交修改保存
export const MdModPost = async (funcNo: string, mdPostRequest: MdPostRequestParam) => {
  const sUrl = funcNo + '/EditPost'
  return postUseToken({
    url: sUrl,
    method: 'post',
    headersType: 'application/x-www-form-urlencoded',
    data: mdPostRequest
  })
}

export enum FormOpera {
  INIT = 'INIT',
  ADD = 'ADD',
  VIEW = 'VIEW',
  MOD = 'MOD'
}
