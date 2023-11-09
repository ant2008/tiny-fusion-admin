import { getSyscodeSelect } from '@/wscore/utils/WsDictHelper'
import { WsFormSearchSchema } from '@/wscore/types/wsform'
import { reactive, unref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { TableColumn } from '@/components/Table'
import { FormSchema } from '@/components/Form'
import { useEmitt } from '@/hooks/event/useEmitt'

const { t } = useI18n()

const { emitter } = useEmitt()

// const tmpItemName = ref('sssss')

const stateOpts = getSyscodeSelect('S03')
const vendorType = getSyscodeSelect('223')

//定义查询条件
export const searchSchema: WsFormSearchSchema[] = [
  {
    label: t('wsModule.vendorId'),
    field: 'vendorId',
    // colProps: {
    //   span: 5
    // },
    component: 'Input',
    fieldOp: '=',
    fieldDbType: 'String'
  },
  {
    label: t('wsModule.vendorSubno'),
    field: 'vendorSubno',
    // colProps: {
    //   span: 5
    // },
    fieldOp: 'like',
    fieldDbType: 'String',
    component: 'Input'
  },
  {
    label: t('wsModule.vendorName'),
    field: 'vendorName',
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
    field: 'vendorId',
    label: t('wsModule.vendorId'),
    minWidth: 180
  },
  {
    field: 'vendorType',
    label: t('wsModule.vendorType'),
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).vendorType, '223')
    }
  },
  {
    field: 'vendorName',
    label: t('wsModule.vendorName'),
    minWidth: 200
  },
  {
    field: 'vendorSubno',
    label: t('wsModule.vendorSubno'),
    minWidth: 120
  },
  {
    field: 'orderName',
    label: t('wsModule.orderName'),
    minWidth: 120
  },
  {
    field: 'orderTelno',
    label: t('wsModule.orderTelno'),
    minWidth: 120
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
  {
    field: 'vendorId',
    label: t('wsModule.vendorId'),
    component: 'Input',
    // componentProps: {
    //     placeholder: '请输入商品编码',
    //     onEvItemReturn: (itemName, itemValue, retData) => {
    //         //这个机制是这个地方抛出事件，主页面中再捕获。
    //         emitter.emit('ev-item-return', { itemName, itemValue, retData })
    //     }
    // },
    componentProps: {
      // itemKey: 'depotId',
      // editFormName: 'WsEditForm',
      // itemIdName: 'itemId',
      // depotIdName: 'ecCode',
      onChange: (itemName, itemValue) => {
        emitter.emit('modal-form-item-change', { itemName, itemValue })
      }
    },
    formItemProps: {
      //required: true,
      rules: [{ type: 'string', required: true, message: '编码不能为空!' }]
    }
  },
  {
    field: 'vendorType',
    label: t('wsModule.vendorType'),
    component: 'Select',
    componentProps: {
      options: vendorType,
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'vendorName',
    label: t('wsModule.vendorName'),
    component: 'Input',
    colProps: {
      span: 24
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
    field: 'vendorSubno',
    label: t('wsModule.vendorSubno'),
    component: 'Input',
    componentProps: {
      placeholder: '请输入助记符'
    }
  },
  {
    field: 'orderName',
    label: t('wsModule.orderName'),
    component: 'Input',
    componentProps: {
      // onEvItemReturn: (itemName, itemValue, retData) => {
      //   //这个机制是这个地方抛出事件，主页面中再捕获。
      //   emitter.emit('ev-item-return', { itemName, itemValue, retData })
      // }
    }
  },
  {
    field: 'orderTelno',
    label: t('wsModule.orderTelno'),
    component: 'Input'
    // defaultValue: '1',
    // componentProps: {
    //   type: 'radio',
    //   dictCode:'sex',
    //   placeholder:'请选择性别'
    // },
  },
  {
    field: 'address',
    label: t('wsModule.address'),
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
