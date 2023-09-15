import { useAxiosToken } from '@/wscore/hook/useAxios'
import { buildQueryJson } from '@/wscore/utils/PageQueryHelper'
import { PageRequest } from '@/wscore/api/base/basetype'
import { AllAutoCommitRequest } from '@/wscore/api/sys/glAutocodetype'

const { postUseToken, getUseToken } = useAxiosToken()

export const MAutoCodePageQuery = (params: any): Promise<IResponse> => {
  const sUrl = '/GlAutoCode/PageQuery'

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

export const ListTables = (): Promise<IResponse> => {
  const sUrl = '/GlAutoCode/ListTables'
  return getUseToken({
    url: sUrl,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const ImplTplTable = (tableName: String, tableChName: String): Promise<IResponse> => {
  const sUrl = '/GlAutoCode/ImplTplTable'

  // const paramJson = buildQueryJson(params?.params as Recordable)
  const paramRequest: any = {
    tableName: tableName,
    tableChName: tableChName
  }

  return postUseToken({
    url: sUrl,
    method: 'post',
    headersType: 'application/x-www-form-urlencoded',
    data: paramRequest
  })
}

export const ListAutocodeColSet = (autocodeId: String): Promise<IResponse> => {
  const sUrl = '/GlAutoCode/ListAutocodeColSet'

  //debug
  console.log('receive autocodeid', autocodeId)

  // const paramJson = buildQueryJson(params?.params as Recordable)
  const paramRequest: any = {
    autocodeId: autocodeId
  }

  return getUseToken({
    url: sUrl,
    method: 'get',
    headersType: 'application/x-www-form-urlencoded',
    params: paramRequest
  })
}

export const SaveAutoCodeAll = (autoCodeAll: AllAutoCommitRequest): Promise<IResponse> => {
  const sUrl = '/GlAutoCode/SaveCodeAll'

  //debug
  console.log('request autocodeall', autoCodeAll)

  // const paramJson = buildQueryJson(params?.params as Recordable)
  return postUseToken({
    url: sUrl,
    method: 'post',
    headersType: 'application/json',
    data: JSON.stringify(autoCodeAll)
  })
}

export const SynImplTable = (tableName: String, tableChName: String): Promise<IResponse> => {
  const sUrl = '/GlAutoCode/SynImpTables'

  // const paramJson = buildQueryJson(params?.params as Recordable)
  const paramRequest: any = {
    tableName: tableName,
    tableChName: tableChName
  }

  return postUseToken({
    url: sUrl,
    method: 'post',
    headersType: 'application/x-www-form-urlencoded',
    data: paramRequest
  })
}

export const GenCode = (idx: number): Promise<IResponse> => {
  const sUrl = '/GlAutoCode/GenAutoCode'

  // const paramJson = buildQueryJson(params?.params as Recordable)
  const paramRequest: any = {
    idx: idx
  }

  return postUseToken({
    url: sUrl,
    method: 'post',
    headersType: 'application/x-www-form-urlencoded',
    data: paramRequest
  })
}
