import { useAxiosToken } from '@/wscore/hook/useAxios'
import { buildQueryJson } from '@/wscore/utils/PageQueryHelper'
import { PageRequest } from '@/wscore/api/base/basetype'

const { postUseToken } = useAxiosToken()

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
