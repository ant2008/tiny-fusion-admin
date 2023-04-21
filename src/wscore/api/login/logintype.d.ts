export type LoginType = {
  aUserId: string
  aPwd: string
}

export type WsUserLoginType = {
  username: string
  password: string
}

export type UserLoginDto = {
  userName: string
  userId: string
  token: string
  telno: string
  state: number
  userPost: string
  userType: string
  endDate: string
  tenantId: string
}
