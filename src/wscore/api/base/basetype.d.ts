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
