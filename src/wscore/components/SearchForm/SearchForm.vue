<template>
  <WsForm
    :is-custom="false"
    :label-width="labelWidth"
    inline
    :is-col="isCol"
    :schema="newSchema"
    @register="register"
  >
    <template #action>
      <div v-if="layout === 'inline'">
        <ElButton v-if="showSearch" type="primary" @click="search">
          <Icon icon="ep:search" class="mr-5px" />
          {{ t('common.query') }}
        </ElButton>
        <ElButton v-if="showReset" @click="reset">
          <Icon icon="ep:refresh-right" class="mr-5px" />
          {{ t('common.reset') }}
        </ElButton>
        <ElButton v-if="expand" link @click="setVisible">
          {{ t(visible ? 'common.shrink' : 'common.expand') }}
          <Icon :icon="visible ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
        </ElButton>
      </div>
    </template>
  </WsForm>

  <template v-if="layout === 'bottom'">
    <div :style="bottonButtonStyle">
      <ElButton v-if="showSearch" type="primary" @click="search">
        <Icon icon="ep:search" class="mr-5px" />
        {{ t('common.query') }}
      </ElButton>
      <ElButton v-if="showReset" @click="reset">
        <Icon icon="ep:refresh-right" class="mr-5px" />
        {{ t('common.reset') }}
      </ElButton>
      <ElButton v-if="expand" type="text" @click="setVisible">
        {{ t(visible ? 'common.shrink' : 'common.expand') }}
        <Icon :icon="visible ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
      </ElButton>
    </div>
  </template>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, PropType, ref, unref } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { cloneDeep } from 'lodash-es'
import { findIndex } from '@/utils'
import { WsFormSearchSchema } from '@/wscore/types/wsform'
import { useWsForm } from '@/wscore/hook/useWsForm'
import WsForm from '@/wscore/components/WsForm/WsForm.vue'
import { FormSchema } from '@/components/Form'

export default defineComponent({
  name: 'SearchForm',
  components: { WsForm, ElButton },
  props: {
    // 生成Form的布局结构数组
    schema: {
      type: Array as PropType<WsFormSearchSchema[]>,
      default: () => []
    },
    // 是否需要栅格布局
    isCol: propTypes.bool.def(false),
    // 表单label宽度
    labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
    // 操作按钮风格位置
    layout: propTypes.string
      .validate((v: string) => ['inline', 'bottom'].includes(v))
      .def('inline'),
    // 底部按钮的对齐方式
    buttomPosition: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('center'),
    showSearch: propTypes.bool.def(true),
    showReset: propTypes.bool.def(true),
    // 是否显示伸缩
    expand: propTypes.bool.def(false),
    // 伸缩的界限字段
    expandField: propTypes.string.def('')
  },
  emits: ['search', 'reset'],
  //{ slots, expose, emit }
  setup(props, { emit }) {
    const { t } = useI18n()

    const visible = ref(true)

    //似乎将search-form中的props复制给form中。
    const newSchema = computed(() => {
      let schema: FormSchema[] = cloneDeep(props.schema)
      if (props.expand && props.expandField && !unref(visible)) {
        const index = findIndex(schema, (v: WsFormSearchSchema) => v.field === props.expandField)
        if (index > -1) {
          const length = schema.length
          schema.splice(index + 1, length)
        }
      }
      //这个代码利用form的插件模式，默认有个action的列，然后page中就可以进行处理。
      if (props.layout === 'inline') {
        schema = schema.concat([
          {
            field: 'action',
            formItemProps: {
              labelWidth: '0px'
            }
          }
        ])
      }
      //debug
      console.log('test schema', schema)
      return schema
    })

    const { register, elFormRef, methods } = useWsForm()

    //todo:需要重新考虑这个查询事件传入什么参数的问题，现在传入的是form的数值，并没有相应的操作符号等。
    const search = async () => {
      const res = await unref(elFormRef)
        ?.validate()
        ?.catch(() => {})
      if (res) {
        const { getFormSchemaDatas } = methods
        // const model = await getFormData()
        // emit('search', model)
        const formDatas = await getFormSchemaDatas()
        emit('search', formDatas)
      }
    }

    const reset = async () => {
      unref(elFormRef)?.resetFields()
      // const { getFormData } = methods
      const { getFormSchemaDatas } = methods
      // const model = await getFormData()
      const formDatas = await getFormSchemaDatas()
      emit('reset', formDatas)
    }

    //暂时不知道影响
    const bottonButtonStyle = computed(() => {
      return {
        textAlign: props.buttomPosition
      }
    }) as unknown as CSSProperties

    const setVisible = () => {
      unref(elFormRef)?.resetFields()
      visible.value = !unref(visible)
    }

    return {
      search,
      setVisible,
      bottonButtonStyle,
      reset,
      newSchema,
      register,
      t,
      visible
    }
  }
})
</script>

<style scoped></style>
