import { useAxiosToken } from '@/wscore/hook/useAxios'
import { buildQueryJson } from '@/wscore/utils/PageQueryHelper'
import { PageRequest } from '@/wscore/api/base/basetype'

const { postUseToken, getUseToken } = useAxiosToken()

export const MTplColumnsPageQuery = (params: any): Promise<IResponse> => {
  const sUrl = '/GlTplColumns/PageQuery'
  const paramJson = buildQueryJson(params?.params as Recordable)
  const paramRequest: PageRequest = {
    aPage: params?.params?.pageIndex,
    aSize: params?.params?.pageSize,
    aConMapJson: paramJson
  }

  return postUseToken({
    url: sUrl,
    method: 'post',
    headersType: 'application/x-www-form-urlencoded',
    data: paramRequest
  })
}

export const TplTableListQuery = (paramsValue: any): Promise<IResponse> => {
  const sUrl = '/GlTplColumns/listTplTables'
  // const paramJson = buildQueryJson(params?.params as Recordable)
  const formDatas = paramsValue
    ? paramsValue.params
      ? paramsValue.params['formDatas']
      : undefined
    : undefined
  const paramObj = {
    tableStr: formDatas['tableStr']
  }

  return getUseToken({
    url: sUrl,
    method: 'get',
    headersType: 'application/x-www-form-urlencoded',
    params: paramObj
  })
}
