import { useAxiosToken } from '@/wscore/hook/useAxios'
import { StockBatchnoRequestConfig } from '@/wscore/api/stock/stockType'
const { getUseToken } = useAxiosToken()

export const ListStockBatchnoApi = (
  paramRequest: StockBatchnoRequestConfig
): Promise<IResponse> => {
  const sUrl = 'MStockd' + '/ListStockBatchno'
  const formDatas = paramRequest
    ? paramRequest.params
      ? paramRequest.params['formDatas']
      : undefined
    : undefined
  const paramObj = {
    depotId: formDatas['depotId'],
    itemId: formDatas['itemId'],
    searchKey: formDatas['searchKey']
  }
  return getUseToken({
    url: sUrl,
    method: 'get',
    headersType: 'application/x-www-form-urlencoded',
    params: paramObj
  })
}
