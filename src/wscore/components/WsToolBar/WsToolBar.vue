<template>
  <vxe-toolbar>
    <template #buttons>
      <vxe-button @click="addEvent" v-if="addHiddenFlag">新增</vxe-button>
      <vxe-button @click="printEvent" v-if="addHiddenTest">打印</vxe-button>
      <vxe-button @click="exportEvent" v-if="expHiddenFlag">导出</vxe-button>
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

export default defineComponent({
  name: 'WsToolBar',
  components: { VxeToolbar },
  props: {
    funcNo: propTypes.string.def(''),
    // 不采用router方式，故屏蔽之
    // addRouter: propTypes.string.def(''),
    addHidden: propTypes.bool.def(false),
    expHidden: propTypes.bool.def(false),
    prtHidden: propTypes.bool.def(false)
  },
  emits: ['ueAdd', 'ueExport', 'uePrint', 'register'],
  setup(props, { emit }) {
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

    const getProps = computed(() => {
      const propsObj = { ...props }
      return propsObj
    })

    const { hasMethods } = useWsPermission()

    const addHiddenFlag = unref(getProps).addHidden || hasMethods.hasAddR(unref(getProps).funcNo)
    const expHiddenFlag = unref(getProps).expHidden || hasMethods.hasExpR(unref(getProps).funcNo)
    const prtHiddenFlag = unref(getProps).prtHidden || hasMethods.hasPrtR(unref(getProps).funcNo)

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

    onMounted(() => {
      emit('register', unref(vxeToolBar), unref(vxeToolBar))
    })

    return {
      printEvent,
      exportEvent,
      addEvent,
      getProps,
      addHiddenFlag,
      prtHiddenFlag,
      expHiddenFlag,
      getAddVisible,
      addHiddenTest
    }
  }
})
</script>

<style scoped></style>
