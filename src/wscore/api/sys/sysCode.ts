import { useAxiosToken } from '@/wscore/hook/useAxios'
import { AxiosPromise } from 'axios'

const { getUseToken } = useAxiosToken()

export const GetSysCodeDictMap = (): AxiosPromise<WsDictType[]> => {
  const sUrl = 'Sscode/GetSysCodeDictMap'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const GetRoleDictMap = (): AxiosPromise<WsDictType[]> => {
  const sUrl = 'Sscode/GetRoleDict'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const GetUserDicts = (): AxiosPromise<WsDictType[]> => {
  const sUrl = 'Sscode/GetUserDict'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const GetOrgDicts = (): AxiosPromise<WsDictType[]> => {
  const sUrl = 'Sscode/GetOrgDict'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const GetDeptDicts = (): AxiosPromise<WsDictType[]> => {
  const sUrl = 'Sscode/GetDepotDict'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const GetPriceGroupDicts = (): AxiosPromise<WsDictType[]> => {
  const sUrl = 'Sscode/GetPriceGroupDict'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const GetEsStoreDicts = (): AxiosPromise<WsDictType[]> => {
  const sUrl = 'Sscode/GetEstoreDict'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const GetExpressDicts = (): AxiosPromise<WsDictType[]> => {
  const sUrl = 'Sscode/GetExpressDict'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const GetAreaDicts = (): AxiosPromise<CommDictType[]> => {
  const sUrl = 'Sscode/GetAllAreaDict'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const GetGlClassDicts = (): AxiosPromise<WsOptsType[]> => {
  const sUrl = 'Sscode/GetAllGlClass'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const GetScheduleSiteDicts = (): AxiosPromise<WsDictType[]> => {
  const sUrl = 'Sscode/GetScheduleSiteDict'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const GetMedicalDeptSiteDicts = (): AxiosPromise<WsOptsType[]> => {
  const sUrl = 'Sscode/GetMedicalDepartDicts'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}

export const GetSysCodeTopListDicts = (): AxiosPromise<WsOptsType[]> => {
  const sUrl = 'Sscode/GetSysCodeTopList'
  return getUseToken({
    url: sUrl,
    // data: menuParam,
    headersType: 'application/x-www-form-urlencoded'
  })
}
