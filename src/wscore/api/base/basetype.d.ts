export type PageRequest = {
  aPage: number
  aSize: number
  aConMapJson: string
}

export type CommPostRequest = {
  aJsonRequest: string
}

export type CommitPostRequest = {
  formData: Recordable
  aFuncNo: string
}

export type QuickQueryRequest = {
  aPage: number
  aSize: number
  aWhere: string
}

export type GridDetailRequest = {
  funcNo: string
  idx: string
}

export type GridDetailRequestParam = {
  aIdx: string
}

export type MdPostRequestParam = {
  aMasterJson: string
  aDetailJson: string
}

export type PageButtonRight = {
  idx: bigint
  userId: string
  userName: string
  userStatus: number
  funcState: number
  roleStatus: number
  funcNo: string
  parentNo: string
  descr: string
  funcActive: number
  addr: number
  modr: number
  delr: number
  prtr: number
  chkr: number
  othr: number
  quyr: number
  rfuncStatus: number
  tenantId: string
}
