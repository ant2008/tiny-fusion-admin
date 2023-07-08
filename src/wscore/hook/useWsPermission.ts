import { useWsPermissionStore } from '@/wscore/store/wsPermission'

export const useWsPermission = () => {
  const permissionStore = useWsPermissionStore()

  const hasPermission = (funcNo: string): boolean => {
    const funcList: FuncRightType[] = permissionStore.getPermissionList
    if (funcList === undefined || funcList.length < 0) {
      return false
    }
    const findIdx = funcList.findIndex((value) => {
      return value.funcNo === funcNo
    })

    return findIdx >= 0
  }

  const getPermission = (funcNo: string): FuncRightType | undefined => {
    return permissionStore.getPermissionList.find((value) => {
      return value.funcNo == funcNo
    })
  }

  const hasMethods: {
    hasAddR: (funcNo: string) => boolean
    hasModR: (funcNo: string) => boolean
    hasPrtR: (funcNo: string) => boolean
    hasExpR: (funcNo: string) => boolean
    hasChkR: (funcNo: string) => boolean
  } = {
    hasAddR: (funcNo: String): boolean => {
      const funcList: FuncRightType[] = permissionStore.getPermissionList
      if (funcList === undefined || funcList === null || funcList.length < 0) {
        return false
      }
      const findIdx = funcList.findIndex((value) => {
        return value.funcNo === funcNo && value.addr == 1
      })
      return findIdx >= 0
    },
    hasModR: (funcNo: String): boolean => {
      const funcList: FuncRightType[] = permissionStore.getPermissionList
      if (funcList === undefined || funcList === null || funcList.length < 0) {
        return false
      }
      const findIdx = funcList.findIndex((value) => {
        return value.funcNo === funcNo && value.modr == 1
      })

      return findIdx >= 0
    },
    hasPrtR: (funcNo: String): boolean => {
      const funcList: FuncRightType[] = permissionStore.getPermissionList
      if (funcList === undefined || funcList === null || funcList.length < 0) {
        return false
      }
      const findIdx = funcList.findIndex((value) => {
        return value.funcNo === funcNo && value.prtr == 1
      })

      return findIdx >= 0
    },
    hasExpR: (funcNo: String): boolean => {
      const funcList: FuncRightType[] = permissionStore.getPermissionList
      if (funcList === undefined || funcList === null || funcList.length < 0) {
        return false
      }
      const findIdx = funcList.findIndex((value) => {
        return value.funcNo === funcNo && value.prtr == 1
      })

      return findIdx >= 0
    },
    hasChkR: (funcNo: String): boolean => {
      const funcList: FuncRightType[] = permissionStore.getPermissionList
      if (funcList === undefined || funcList === null || funcList.length < 0) {
        return false
      }
      const findIdx = funcList.findIndex((value) => {
        return value.funcNo === funcNo && value.chkr == 1
      })

      return findIdx >= 0
    }
  }

  return {
    hasPermission,
    hasMethods,
    getPermission
  }
}
