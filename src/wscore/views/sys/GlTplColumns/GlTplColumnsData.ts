import { getSyscodeSelect } from '@/wscore/utils/WsDictHelper'
import { WsFormSearchSchema } from '@/wscore/types/wsform'
import { reactive, unref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'
// import { useEmitt } from '@/hooks/web/useEmitt'

const { t } = useI18n()

// const { emitter } = useEmitt()

// const tmpItemName = ref('sssss')

const stateOpts = getSyscodeSelect('S03')
const gplTypeOpts = getSyscodeSelect('S60')

//定义查询条件
export const searchSchema: WsFormSearchSchema[] = [
  {
    label: t('wsModule.gplType'),
    field: 'gplType',
    // colProps: {
    //   span: 5
    // },
    fieldOp: '=',
    fieldDbType: 'String',
    component: 'Select',
    componentProps: {
      options: gplTypeOpts
    }
  },
  {
    label: t('wsModule.gplTableName'),
    field: 'gplTableName',
    // colProps: {
    //   span: 5
    // },
    fieldOp: 'like',
    fieldDbType: 'String',
    component: 'Input'
  },
  {
    label: t('wsModule.gplTableChname'),
    field: 'gplTableChname',
    // colProps: {
    //   span: 5
    // },
    fieldOp: 'like',
    fieldDbType: 'String',
    component: 'Input'
  },
  {
    label: t('wsModule.gplColumnName'),
    field: 'gplColumnName',
    // colProps: {
    //   span: 5
    // },
    fieldOp: 'like',
    fieldDbType: 'String',
    component: 'Input'
  },
  {
    label: t('wsModule.gplColumnChname'),
    field: 'gplColumnChname',
    // colProps: {
    //   span: 5
    // },
    fieldOp: 'like',
    fieldDbType: 'String',
    component: 'Input'
  },
  {
    label: t('wsModule.state'),
    field: 'state',
    // style:'width:150px',
    // type:'vendorInput',
    fieldOp: '=',
    fieldDbType: 'String',
    component: 'Select',
    componentProps: {
      options: stateOpts
    }
  }
]

//定义表格展现
export const showColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'gplType',
    label: t('wsModule.gplType'),
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).gplType, 'S60')
    }
  },
  {
    field: 'gplTableName',
    label: t('wsModule.gplTableName'),
    minWidth: 200
  },
  {
    field: 'gplTableChname',
    label: t('wsModule.gplTableChname'),
    minWidth: 120
  },
  {
    field: 'gplColumnName',
    label: t('wsModule.gplColumnName'),
    minWidth: 120
  },
  {
    field: 'gplColumnChname',
    label: t('wsModule.gplColumnChname'),
    minWidth: 120
  },
  {
    field: 'gplColumnDbtype',
    label: t('wsModule.gplColumnDbtype'),
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).gplType, 'S61')
    }
  },
  {
    field: 'state',
    label: t('wsModule.state'),
    minWidth: 80,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).state, 'S04')
    }
  },

  {
    field: 'createUser',
    label: t('wsModule.createUser'),
    minWidth: 150
  },
  {
    field: 'createTime',
    label: t('wsModule.createTime'),
    minWidth: 150
  },

  {
    field: 'action',
    minWidth: 160,
    fixed: 'right',
    label: t('tableDemo.action')
  }
])
//定义可编辑form
// const editSchema: FormSchema[] = editFormSchema

export const editSchema: FormSchema[] = [
  // {
  //   field: 'vendorId',
  //   label: t('wsModule.vendorId'),
  //   component: 'Input',
  //   componentProps: {
  //     onChange: (itemName, itemValue) => {
  //       emitter.emit('modal-form-item-change', { itemName, itemValue })
  //     }
  //   },
  //   formItemProps: {
  //     //required: true,
  //     rules: [{ type: 'string', required: true, message: '编码不能为空!' }]
  //   }
  // },
  {
    field: 'gplType',
    label: t('wsModule.gplType'),
    component: 'Select',
    componentProps: {
      options: gplTypeOpts,
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'gplTableName',
    label: t('wsModule.gplTableName'),
    component: 'Input',
    colProps: {
      span: 12
    },
    componentProps: {
      readonly: true,
      rules: [{ required: true, message: '名称不能为空!', trigger: 'blur' }]
      // modelValue: unref(tmpItemName)
      //'onUpdate:modelValue': (value) => $emit('update:modelValue', value)
    }
  },
  // {
  //   field: 'punchTime',
  //   label: '打卡时间',
  //   component: 'DatePicker',
  //   componentProps: {
  //     showTime:true,
  //     valueFormat:'YYYY-MM-DD HH:mm:ss',
  //     placeholder: '请选择打卡时间',
  //   }
  // },
  {
    field: 'gplTableChname',
    label: t('wsModule.gplTableChname'),
    component: 'Input',
    colProps: {
      span: 12
    },
    componentProps: {
      placeholder: '请输入中文名称'
    }
  },
  {
    field: 'gplColumnName',
    label: t('wsModule.gplColumnName'),
    component: 'Input',
    componentProps: {
      // onEvItemReturn: (itemName, itemValue, retData) => {
      //   //这个机制是这个地方抛出事件，主页面中再捕获。
      //   emitter.emit('ev-item-return', { itemName, itemValue, retData })
      // }
    }
  },
  {
    field: 'gplColumnChname',
    label: t('wsModule.gplColumnChname'),
    component: 'Input'
    // defaultValue: '1',
    // componentProps: {
    //   type: 'radio',
    //   dictCode:'sex',
    //   placeholder:'请选择性别'
    // },
  },
  {
    field: 'gplColumnDbtype',
    label: t('wsModule.gplColumnDbtype'),
    component: 'Input'
  },
  {
    field: 'state',
    label: t('wsModule.state'),
    component: 'Select',
    componentProps: {
      options: stateOpts,
      style: {
        width: '100%'
      }
    }
  },
  {
    field: '',
    component: 'Divider'
  },
  {
    field: 'createUser',
    label: t('wsModule.createUser'),
    component: 'Select',
    colProps: {
      span: 12
    },
    componentProps: {
      readonly: true,
      disabled: true,
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'createTime',
    label: t('wsModule.createTime'),
    component: 'DatePicker',
    componentProps: {
      readonly: true,
      disabled: true,
      style: {
        width: '600px'
      }
    }
  }
]
