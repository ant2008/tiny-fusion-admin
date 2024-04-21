<template>
  <ElInput
    :readonly="readonly"
    v-model="inputValue"
    :input-style="style"
    @keydown.enter="doenter"
    @input="doInput"
    @change="doChange"
    ref="_thsInput"
    v-bind="bindProps"
  >
    <template #suffix>
      <ElButton link @click="doclick" :disabled="readonly" :icon="icon" />
      <!--        <template #icon>-->
      <!--          <el-icon><Search /></el-icon>-->
      <!--        </template>-->
      <!--      </ElButton>-->
    </template>
  </ElInput>
  <BatchnoQueryModal
    @modal-register="queryModalRegister"
    @ev-return="doReturn"
    :in-value="inputValue"
    :show-columns="inShowColumns"
    :func-no="funcNo"
    :depot-id="depotIdValue"
    :item-id="itemIdValue"
  />
</template>

<script lang="ts">
import { batchnoShowColumns } from '@/wscore/components/WsDepotBatchnoInput/WsDepotBatchnoInputData'
import { defineComponent, getCurrentInstance, onMounted, reactive } from 'vue'
import { ElButton, ElIcon, ElInput } from 'element-plus'

import { ref, unref, useAttrs, watch, ComponentInternalInstance } from 'vue'
import BatchnoQueryModal from '@/wscore/modal/BatchnoQueryModal/BatchnoQueryModal.vue'
import { propTypes } from '@/utils/propTypes'
import { useWsQueryModal } from '@/wscore/hook/useWsQueryModal'
import WsEditForm from '@/wscore/components/WsEditForm/WsEditForm.vue'
import { set } from 'lodash-es'
// import { Search } from '@element-plus/icons-vue'
import { TableColumn } from '@/components/Table'
import { useIcon } from '@/hooks/web/useIcon'

export default defineComponent({
  name: 'WsDepotBatchnoInput',
  components: { BatchnoQueryModal, ElInput, ElButton },
  inheritAttrs: false,
  props: {
    readonly: propTypes.bool.def(false),
    style: propTypes.style.def({}),
    modelValue: propTypes.string.def(''),
    // quickShowColumns: {
    //   type: Array as PropType<TableColumn[]>,
    //   default: () => []
    // },
    funcNo: propTypes.string.def(''),
    itemKey: propTypes.string.def(''),
    depotIdName: propTypes.string.def(''),
    itemIdName: propTypes.string.def(''),
    editFormName: propTypes.string.def('')
  },
  emits: ['ev-item-return', 'update:modelValue', 'ev-item-change'],
  setup(props, { emit }) {
    const selfCp = getCurrentInstance()

    const attrs = useAttrs()

    const depotIdValue = ref('')

    const itemIdValue = ref('')

    let inShowColumns: TableColumn[] = reactive([])

    const icon = useIcon({ icon: 'svg-icon:search' })

    //绑定属性
    const getBindValue = () => {
      const delKeys = ['modelValue', 'v-model']
      const tmpProps = { ...unref(props) }
      for (const key in tmpProps) {
        if (delKeys.indexOf(key) !== -1) {
          delete tmpProps[key]
        }
      }
      return Object.assign({}, unref(tmpProps), unref(attrs))
    }

    const editFormParent = () => {
      let lookupCp = {}
      let currCp: ComponentInternalInstance | null
      if (selfCp) {
        currCp = selfCp
        for (let i = 0; i < 20; i++) {
          if (currCp !== null && currCp.parent !== null && currCp.parent !== undefined) {
            if (currCp.parent.type.name === unref(props).editFormName) {
              lookupCp = currCp.parent
              break
            } else {
              currCp = currCp.parent
            }
          } else {
            break
          }
        }
      }
      return lookupCp
    }

    const bindProps = getBindValue()

    // const selfInput = ref<ComponentRef<typeof ElInput>>()

    const { queryModalRegister, methods } = useWsQueryModal()

    // const inputValue = ref('a')

    const getEditFormData = async () => {
      const editForm = editFormParent() as typeof WsEditForm
      return await editForm.exposed.getFormData()
    }

    const initShowColumns = () => {
      inShowColumns.slice(0, inShowColumns.length)
      for (let i = 0; i < batchnoShowColumns.length; i++) {
        set(inShowColumns, i, batchnoShowColumns[i])
      }
      // inShowColumns = inShowColumns.concat(batchnoShowColumns)
      console.log('ssss-2', inShowColumns)
    }

    const doenter = () => {
      //methods.openModal()
    }
    const doclick = async () => {
      getEditFormData().then((res) => {
        if (res) {
          //debug
          console.log('res', res, res[unref(props).depotIdName])

          const tmpItemId = res[unref(props).itemIdName]
          const tmpDepotId = res[unref(props).depotIdName]

          if (tmpItemId == null || tmpItemId == '') {
            alert('无法获取商品编码!')
            return
          }

          if (tmpDepotId == null || tmpDepotId == '') {
            alert('无法获取部门编码')
            return
          }
          // mask it ,use new method
          //打开查询框
          // emit('ev-item-change', unref(props).itemKey, inputValue)
          depotIdValue.value = tmpDepotId
          itemIdValue.value = tmpItemId
          //debug
          console.log('sss', depotIdValue, itemIdValue)
          methods.openModal()
        } else {
          console.error('无法获取editForm')
        }
      })
    }

    const doReturn = (retData) => {
      inputValue.value = retData[unref(props).itemKey]
      // const selfInput = selfCp?.refs['_thsInput'] as ComponentRef<typeof ElInput>
      // unref(selfInput)?.$forceUpdate()
      emit('ev-item-return', unref(props).itemKey, inputValue.value, retData)
      emit('update:modelValue', retData[unref(props).itemKey])
    }

    const doInput = (val) => {
      emit('update:modelValue', val)
    }

    const doChange = (val) => {
      emit('ev-item-change', unref(props).itemKey, val)
    }

    watch(
      () => props.modelValue,
      (value) => {
        if (value && value !== '') {
          inputValue.value = value
        }
      },
      { immediate: true, deep: true }
    )

    const inputValue = ref('')

    onMounted(() => {
      initShowColumns()
    })

    return {
      batchnoShowColumns,
      inShowColumns,
      inputValue,
      queryModalRegister,
      doenter,
      doclick,
      doReturn,
      doInput,
      bindProps,
      doChange,
      depotIdValue,
      itemIdValue,
      icon
    }
  }
})
</script>

<style scoped></style>
