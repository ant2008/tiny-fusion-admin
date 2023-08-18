<template>
  <vxe-toolbar>
    <template #buttons>
      <vxe-button @click="addEvent" v-if="addHiddenFlag" status="primary">新增</vxe-button>
      <vxe-button @click="printEvent" v-if="addHiddenTest" status="primary">打印</vxe-button>
      <vxe-button @click="exportEvent" v-if="expHiddenFlag" status="primary">导出</vxe-button>
      <ElDivider direction="vertical" v-if="chkHiddenFlag" />
      <vxe-button @click="chkEvent" v-if="chkHiddenFlag" status="warning">审核</vxe-button>
      <vxe-button @click="unChkEvent" v-if="chkHiddenFlag" status="warning">否决</vxe-button>
      <ElDivider direction="vertical" v-if="ifExtButton" />
      <slot name="usExtButton"></slot>
    </template>
  </vxe-toolbar>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, ref, unref } from 'vue'
import { Toolbar as VxeToolbar, VxeButtonEvents, VxeTableInstance } from 'vxe-table'
import { propTypes } from '@/utils/propTypes'
// import { useRouter } from 'vue-router'
import { useWsPermission } from '@/wscore/hook/useWsPermission'
import { ElDivider } from 'element-plus'

export default defineComponent({
  name: 'WsToolBar',
  components: { VxeToolbar, ElDivider },
  props: {
    funcNo: propTypes.string.def(''),
    // 不采用router方式，故屏蔽之
    // addRouter: propTypes.string.def(''),
    addHidden: propTypes.bool.def(false),
    expHidden: propTypes.bool.def(false),
    prtHidden: propTypes.bool.def(false),
    chkHidden: propTypes.bool.def(false),
    modHidden: propTypes.bool.def(false),
    ifExtButton: propTypes.bool.def(false)
  },
  emits: ['ueAdd', 'ueExport', 'uePrint', 'register', 'ueChk', 'ueUnChk'],
  setup(props, { emit, expose }) {
    const xTable = ref({} as VxeTableInstance)

    const vxeToolBar = getCurrentInstance()

    const addPageVisible = ref(false)

    // const { push } = useRouter()

    const printEvent: VxeButtonEvents.Click = () => {
      const $table = xTable.value
      $table.print()
      emit('uePrint', $table)
    }

    const exportEvent: VxeButtonEvents.Click = () => {
      const $table = xTable.value
      $table.exportData({ type: 'csv' })
      emit('ueExport', $table)
    }

    const chkEvent: VxeButtonEvents.Click = () => {
      const $table = xTable.value
      emit('ueChk', $table)
    }

    const unChkEvent: VxeButtonEvents.Click = () => {
      const $table = xTable.value
      emit('ueUnChk', $table)
    }

    const getProps = computed(() => {
      const propsObj = { ...props }
      return propsObj
    })

    const { hasMethods, getPermission } = useWsPermission()

    const addHiddenFlag = unref(getProps).addHidden || hasMethods.hasAddR(unref(getProps).funcNo)
    const expHiddenFlag = unref(getProps).expHidden || hasMethods.hasExpR(unref(getProps).funcNo)
    const prtHiddenFlag = unref(getProps).prtHidden || hasMethods.hasPrtR(unref(getProps).funcNo)
    const chkHiddenFlag = unref(getProps).chkHidden || hasMethods.hasChkR(unref(getProps).funcNo)
    const modHiddenFlag = unref(getProps).modHidden || hasMethods.hasModR(unref(getProps).funcNo)

    const addEvent: VxeButtonEvents.Click = () => {
      // const $table = xTable.value
      addPageVisible.value = false
      emit('ueAdd', addPageVisible)
    }

    const addHiddenTest = computed(() => {
      return addHiddenFlag
    })

    const getAddVisible = computed(() => {
      return addPageVisible
    })

    const hasAddR = (): boolean => {
      return hasMethods.hasAddR(unref(getProps).funcNo)
    }

    const hasModR = (): boolean => {
      return hasMethods.hasModR(unref(getProps).funcNo)
    }

    const hasExpR = (): boolean => {
      return hasMethods.hasExpR(unref(getProps).funcNo)
    }

    const hasChkR = (): boolean => {
      return hasMethods.hasChkR(unref(getProps).funcNo)
    }

    const hasPrtR = (): boolean => {
      return hasMethods.hasPrtR(unref(getProps).funcNo)
    }

    const getPagePermission = (): any => {
      return getPermission(unref(getProps).funcNo)
    }

    onMounted(() => {
      emit('register', unref(vxeToolBar))
    })

    expose({
      hasAddR,
      hasModR,
      hasExpR,
      hasChkR,
      hasPrtR,
      getPagePermission
    })

    return {
      printEvent,
      exportEvent,
      addEvent,
      chkEvent,
      unChkEvent,
      getProps,
      addHiddenFlag,
      prtHiddenFlag,
      expHiddenFlag,
      chkHiddenFlag,
      getAddVisible,
      modHiddenFlag,
      addHiddenTest
    }
  }
})
</script>

<style scoped></style>
