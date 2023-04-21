export type StockBatchnoRequest = {
  depotId: string
  itemId: string
  searchKey: string
}
export type TbStockD = {
  idx: number
  tenantId: string
  depotId: string
  itemId: string
  barCode: string
  shipNo: string
  billCode: string
  itemQty: number
  residueQty: number
  curitemQty: number
  shelf: string
  salePrice: number
  minPrice: number
  allocPrice: number
  purPrice: number
  discount: number
  purTax: number
  pursumAmt: number
  salesumAmt: number
  buyerId: string
  vendorId: string
  payeeType: string
  receiveDate: number
  overdueDate: number
  flag: number
  createUser: string
  createTime: number
  batchNo: string
}

export type StockBatchnoRequestConfig = AxiosConfig<StockBatchnoRequest, TbStockD[]>
