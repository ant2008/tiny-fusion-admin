<script setup lang="ts">
import { reactive, ref, unref, watch } from 'vue'
import { Form } from '@/components/Form'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElCheckbox, ElLink } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { loginApi, getTestRoleApi, getAdminRoleApi } from '@/api/login'
import { useCache } from '@/hooks/web/useCache'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { UserType } from '@/api/login/types'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'
//引入wscore
import { userLogin } from '@/wscore/api/login/login'
import { UserLoginDto, WsUserLoginType } from '@/wscore/api/login/logintype'
import { routerMenus } from '@/wscore/menus'
import { useWsStore } from '@/wscore/store/wsStore'
import { GetRoleDictMap, GetSysCodeDictMap, GetUserDicts } from '@/wscore/api/sys/sysCode'
import { useWsPermissionStore } from '@/wscore/store/wsPermission'
import { getFuncRights } from '@/wscore/api/menu/menu'
import { pathResolve } from '@/utils/routerHelper'
import { wsRootRouterMap } from '@/wscore/router'

const { required } = useValidator()

const emit = defineEmits(['to-register'])

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const { currentRoute, addRoute, push } = useRouter()

const { wsCache } = useCache()

const { t } = useI18n()

const rules = {
  username: [required()],
  password: [required()]
}

const wsStore = useWsStore()

//引入wiser 权限处理
const wsPermissionStore = useWsPermissionStore()

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24
    }
  },
  {
    field: 'username',
    label: t('login.username'),
    value: 'admin',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('login.usernamePlaceholder')
    }
  },
  {
    field: 'password',
    label: t('login.password'),
    value: 'admin',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      placeholder: t('login.passwordPlaceholder')
    }
  },
  {
    field: 'tool',
    colProps: {
      span: 24
    }
  },
  {
    field: 'login',
    colProps: {
      span: 24
    }
  },
  {
    field: 'other',
    component: 'Divider',
    label: t('login.otherLogin'),
    componentProps: {
      contentPosition: 'center'
    }
  },
  {
    field: 'otherIcon',
    colProps: {
      span: 24
    }
  }
])

const iconSize = 30

const remember = ref(false)

const { register, elFormRef, methods } = useForm()

const loading = ref(false)

const iconColor = '#999'

const redirect = ref<string>('')

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true
  }
)

// 登录
//屏蔽原来的登录代码，切换为符合WS的登录模式。
// const signIn = async () => {
//   const formRef = unref(elFormRef)
//   await formRef?.validate(async (isValid) => {
//     if (isValid) {
//       loading.value = true
//       const { getFormData } = methods
//       const formData = await getFormData<UserType>()
//
//       try {
//         const res = await loginApi(formData)
//
//         if (res) {
//           wsCache.set(appStore.getUserInfo, res.data)
//           // 是否使用动态路由
//           if (appStore.getDynamicRouter) {
//             getRole()
//           } else {
//             await permissionStore.generateRoutes('none').catch(() => {})
//             permissionStore.getAddRouters.forEach((route) => {
//               addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
//             })
//             permissionStore.setIsAddRouters(true)
//             push({ path: redirect.value || permissionStore.addRouters[0].path })
//           }
//         }
//       } finally {
//         loading.value = false
//       }
//     }
//   })
// }

// 获取角色信息
// const getRole = async () => {
//   const { getFormData } = methods
//   const formData = await getFormData<UserType>()
//   const params = {
//     roleName: formData.username
//   }
//   // admin - 模拟后端过滤菜单
//   // test - 模拟前端过滤菜单
//   const res =
//     formData.username === 'admin' ? await getAdminRoleApi(params) : await getTestRoleApi(params)
//   if (res) {
//     const { wsCache } = useCache()
//     const routers = res.data || []
//     wsCache.set('roleRouters', routers)
//
//     formData.username === 'admin'
//       ? await permissionStore.generateRoutes('admin', routers).catch(() => {})
//       : await permissionStore.generateRoutes('test', routers).catch(() => {})
//
//     permissionStore.getAddRouters.forEach((route) => {
//       addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
//     })
//     permissionStore.setIsAddRouters(true)
//     push({ path: redirect.value || permissionStore.addRouters[0].path })
//   }
// }

// 去注册页面
const toRegister = () => {
  emit('to-register')
}
//=============ws code===========
const signIn = async () => {
  const formRef = unref(elFormRef)
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const { getFormData } = methods
      const formData = await getFormData<WsUserLoginType>()

      // 更换登录函数
      let loginType = {
        aUserId: formData.username,
        aPwd: formData.password
      }
      await userLogin(loginType).then((res) => {
        //debug
        console.log('login', loginType, res)
        if (res) {
          let userInfo = res.data as UserLoginDto
          const { wsCache } = useCache()
          wsCache.set(appStore.getUserInfo, userInfo)
          appStore.setToken(userInfo.token)
          //debug
          console.log('call login end')
          //替换为服务器的菜单
          // getRole()
          buildRouterMenus(userInfo.userId)
          //set user func rights
          getFuncRights(userInfo.userId).then((res2) => {
            const funcRightDtos = res2['dataList']
            wsPermissionStore.setFuncPermission(funcRightDtos)
          })
        }
        loading.value = false
      })

      //debug
      console.log('call login after')
      //获取所有数据字典
      const res2 = await GetSysCodeDictMap().catch((err) => {
        console.error('get server syscode dicts error:' + err.message)
      })
      if (res2) {
        let codeMap: Recordable<String, WsDictType[]> = res2.data
        wsStore.setSysCodeDicts(codeMap)
      }

      //获取用户和角色
      const res3 = await GetUserDicts()
      if (res3) {
        wsStore.setUserDicts(res3['dataList'])
      }

      const res4 = await GetRoleDictMap()
      if (res4) {
        wsStore.setRoleDicts(res4['dataList'])
      }
    }
  })
}
//此改造成为可以使用ws框架的从服务器获取菜单模式。
const buildRouterMenus = async (userId: string) => {
  const res = await routerMenus(userId)

  //debug
  console.log('buildRouterMenus', res)

  if (res) {
    const { wsCache } = useCache()
    const routers: AppCustomRouteRecordRaw[] = res.data || []

    //debug
    console.log('wsRootRouterMap', wsRootRouterMap)

    //加入首页和工作台(临时处理模式)
    // wsRootRouterMap.forEach((value, index, arr) =>{
    //   routers.unshift({
    //     name:
    //     meta: RouteMeta
    //     component: string
    //     path: string
    //     redirect: string
    //     children?: AppCustomRouteRecordRaw[]
    //   })
    // })
    routers.unshift(...wsRootRouterMap)

    //debug
    console.log('add wsrootroutermap', routers)

    wsCache.set('roleRouters', routers)

    await permissionStore.generateRoutes('admin', routers).catch(() => {})

    permissionStore.getAddRouters.forEach((route) => {
      addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
    })
    permissionStore.setIsAddRouters(true)
    //debug
    console.log('routers-server', permissionStore.getRouters)
    console.log('router-go', permissionStore.getRouters[0].path)
    console.log('router-redirect', redirect.value)
    console.log('router-currnode', currentRoute)
    let firstNode: AppRouteRecordRaw = permissionStore.getFirstChildRouters as AppRouteRecordRaw

    console.log('firstNode', firstNode?.children?.[0])

    let tmpPath = ''
    if (firstNode !== null && firstNode.children !== undefined) {
      tmpPath = pathResolve(pathResolve('/', firstNode.path), firstNode.children[0].path)
      // tmpPath = firstNode.children[0].path as string
    }

    // if (permissionStore.getRouters[0] !== undefined) {
    //   tmpPath =
    //     (permissionStore.getRouters[0].redirect as string) || permissionStore.getRouters[0].path
    // } else if (firstNode.children != undefined) {
    //   tmpPath = firstNode.children[0].path
    // } else {
    //   tmpPath = '/'
    // }

    //debug
    console.log('tmp paht', tmpPath)
    push(tmpPath)
    //push(permissionStore.addRouters[0].path)
    // push({ path: redirect.value || permissionStore.getRouters[0].path })
    // push({ path: redirect.value || permissionStore.addRouters[0].path })
  }
}
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
    @register="register"
  >
    <template #title>
      <h2 class="text-2xl font-bold text-center w-[100%]">{{ t('login.login') }}</h2>
    </template>

    <template #tool>
      <div class="flex justify-between items-center w-[100%]">
        <ElCheckbox v-model="remember" :label="t('login.remember')" size="small" />
        <ElLink type="primary" :underline="false">{{ t('login.forgetPassword') }}</ElLink>
      </div>
    </template>

    <template #login>
      <div class="w-[100%]">
        <ElButton :loading="loading" type="primary" class="w-[100%]" @click="signIn">
          {{ t('login.login') }}
        </ElButton>
      </div>
      <div class="w-[100%] mt-15px">
        <ElButton class="w-[100%]" @click="toRegister">
          {{ t('login.register') }}
        </ElButton>
      </div>
    </template>

    <template #otherIcon>
      <div class="flex justify-between w-[100%]">
        <Icon
          icon="ant-design:github-filled"
          :size="iconSize"
          class="cursor-pointer anticon"
          :color="iconColor"
        />
        <Icon
          icon="ant-design:wechat-filled"
          :size="iconSize"
          class="cursor-pointer anticon"
          :color="iconColor"
        />
        <Icon
          icon="ant-design:alipay-circle-filled"
          :size="iconSize"
          :color="iconColor"
          class="cursor-pointer anticon"
        />
        <Icon
          icon="ant-design:weibo-circle-filled"
          :size="iconSize"
          :color="iconColor"
          class="cursor-pointer anticon"
        />
      </div>
    </template>
  </Form>
</template>

<style lang="less" scoped>
:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}
</style>
