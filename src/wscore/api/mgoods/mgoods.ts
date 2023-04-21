import { useAxiosToken } from '@/wscore/hook/useAxios'
import { buildQueryJson } from '@/wscore/utils/PageQueryHelper'
import { PageRequest } from '@/wscore/api/base/basetype'

const { postUseToken } = useAxiosToken()

//{ params }: AxiosConfig
export const MGoodsPageQuery = (pageQueryParams: any): Promise<IResponse> => {
  const sUrl = '/MGoods/PageQuery'

  const paramJson = buildQueryJson(pageQueryParams?.params as Recordable)
  const paramRequest: PageRequest = {
    aPage: pageQueryParams?.params?.pageIndex,
    aSize: pageQueryParams?.params?.pageSize,
    aConMapJson: paramJson
  }
  //<{
  //     total: number
  //     list: TbProductDto[]
  //   }>
  //debug
  console.log('pageQuery', paramRequest)
  return postUseToken({
    url: sUrl,
    method: 'post',
    headersType: 'application/x-www-form-urlencoded',
    data: paramRequest
  })
}
