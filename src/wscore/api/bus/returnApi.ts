import { useAxiosToken } from '@/wscore/hook/useAxios'
import { StockBatchnoRequestConfig, TbStockD } from '@/wscore/api/stock/stockType'
const { getUseToken } = useAxiosToken()

export const ListStockBatchnoReturnApi = (
  paramRequest: StockBatchnoRequestConfig
): Promise<IResponse<TbStockD[]>> => {
  const sUrl = 'MReturn' + '/ListStockBatchno'
  //debug
  console.log('liststockbatchnoapi', paramRequest)
  const formDatas = paramRequest
    ? paramRequest.params
      ? paramRequest.params['formDatas']
      : undefined
    : undefined
  //debug
  console.log('lis fuck', formDatas, formDatas['depotId'])
  const paramObj = {
    depotId: formDatas['depotId'],
    itemId: formDatas['itemId'],
    searchKey: formDatas['searchKey']
  }
  return getUseToken({
    url: sUrl,
    params: paramObj
  })
}
