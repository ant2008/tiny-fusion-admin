import { useI18n } from '@/hooks/web/useI18n'
import { useEmitt } from '@/hooks/web/useEmitt'
import { WsFormSearchSchema } from '@/wscore/types/wsform'
import { reactive, unref } from 'vue'
import { TableColumn } from '@/types/table'
import {
  renderDate,
  renderDateTime,
  renderDeptDict,
  renderSysCodeDict,
  renderUserDict
} from '@/wscore/utils/RenderHelper'
import { FormSchema } from '@/types/form'
import {
  getDeptDictsSelect,
  getSyscodeSelect,
  getUserDictsSelect
} from '@/wscore/utils/WsDictHelper'

const { t } = useI18n()

const { emitter } = useEmitt()

const orderType = getSyscodeSelect('P01')
const stateOpts = getSyscodeSelect('S04')
const userOpts = getUserDictsSelect()
const depotOpts = getDeptDictsSelect()
const payTypeOpts = getSyscodeSelect('221')

//定义查询条件
export const searchSchema: WsFormSearchSchema[] = [
  {
    label: t('wsModule.orderType'),
    field: 'orderType',
    // colProps: {
    //   span: 5
    // },
    component: 'Select',
    fieldOp: '=',
    fieldDbType: 'String',
    componentProps: {
      options: orderType
    }
  },
  {
    label: t('wsModule.orderNo'),
    field: 'orderNo',
    // colProps: {
    //   span: 5
    // },
    fieldOp: 'like',
    fieldDbType: 'String',
    component: 'Input'
  }
  // {
  //     label: t('wsModule.vendorName'),
  //     field: 'vendorName',
  //     // colProps: {
  //     //   span: 5
  //     // },
  //     fieldOp: 'like',
  //     fieldDbType: 'String',
  //     component: 'Input'
  // },
  // {
  //     label: t('wsModule.state'),
  //     field: 'state',
  //     // style:'width:150px',
  //     // type:'vendorInput',
  //     fieldOp: '=',
  //     fieldDbType: 'String',
  //     component: 'Select',
  //     componentProps: {
  //         options: stateOpts
  //     }
  // }
]

//定义表格展现
export const showColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
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
    field: 'orderNo',
    label: t('wsModule.orderNo'),
    minWidth: 180
  },
  {
    field: 'contNo',
    label: t('wsModule.contNo'),
    minWidth: 180
  },
  {
    field: 'payeeType',
    label: t('wsModule.payeeType'),
    minWidth: 100,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).payeeType, '221')
    }
  },
  {
    field: 'depotId',
    label: t('wsModule.depotId'),
    minWidth: 100,
    formatter: (cellValue) => {
      return renderDeptDict(unref(cellValue).depotId)
    }
  },
  {
    field: 'vendorNo',
    label: t('wsModule.vendorNo'),
    minWidth: 180
  },
  {
    field: 'vendorName',
    label: t('wsModule.vendorName'),
    minWidth: 180
  },
  {
    field: 'orderName',
    label: t('wsModule.orderName'),
    minWidth: 180
  },
  {
    field: 'orderTel',
    label: t('wsModule.orderTel'),
    minWidth: 180
  },
  {
    field: 'consTime',
    label: t('wsModule.consTime'),
    minWidth: 150,
    formatter: (cellValue) => {
      return renderDate(unref(cellValue).consTime)
    }
  },
  {
    field: 'arrDate',
    label: t('wsModule.arrDate'),
    minWidth: 150,
    formatter: (cellValue) => {
      return renderDate(unref(cellValue).arrDate)
    }
  },
  {
    field: 'buyer',
    label: t('wsModule.buyer'),
    minWidth: 100,
    formatter: (cellValue) => {
      return renderUserDict(unref(cellValue).buyer)
    }
  },
  {
    field: 'vouchNo',
    label: t('wsModule.vouchNo'),
    minWidth: 180
  },
  {
    field: 'createUser',
    label: t('wsModule.createUser'),
    minWidth: 150,
    formatter: (cellValue) => {
      return renderUserDict(unref(cellValue).createUser)
    }
  },
  {
    field: 'createTime',
    label: t('wsModule.createTime'),
    minWidth: 180,
    formatter: (cellValue) => {
      return renderDateTime(unref(cellValue).createTime)
    }
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
    field: 'orderType',
    label: t('wsModule.orderType'),
    component: 'Select',
    componentProps: {
      options: orderType,
      style: {
        width: '100%'
      }
    },
    // componentProps: {
    //   // itemKey: 'depotId',
    //   // editFormName: 'WsEditForm',
    //   // itemIdName: 'itemId',
    //   // depotIdName: 'ecCode',
    //   onChange: (itemName, itemValue) => {
    //     emitter.emit('modal-form-item-change', { itemName, itemValue })
    //   }
    // },
    formItemProps: {
      //required: true,
      rules: [{ type: 'string', required: true, message: '编码不能为空!' }]
    }
  },
  {
    field: 'orderNo',
    label: t('wsModule.orderNo'),
    component: 'Input',
    componentProps: {
      readonly: true
    }
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
    },
    formItemProps: {
      //required: true,
      rules: [{ type: 'string', required: true, message: '编码不能为空!' }]
    }
  },
  {
    field: 'vendorNo',
    label: t('wsModule.vendorNo'),
    component: 'WsVendorInput',
    // colProps: {
    //   span: 24
    // },
    componentProps: {
      readonly: false,
      rules: [{ required: true, message: '编码不能为空!', trigger: 'blur' }],
      onEvItemReturn: (itemName, itemValue, retData) => {
        //这个机制是这个地方抛出事件，主页面中再捕获。
        emitter.emit('ev-item-return', { itemName, itemValue, retData })
      }
      // modelValue: unref(tmpItemName)
      //'onUpdate:modelValue': (value) => $emit('update:modelValue', value)
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
  {
    field: 'buyer',
    label: t('wsModule.buyer'),
    component: 'Select',
    componentProps: {
      options: userOpts,
      style: {
        width: '100%'
      }
    },
    formItemProps: {
      //required: true,
      rules: [{ type: 'string', required: true, message: '编码不能为空!' }]
    }
  },
  {
    field: 'depotId',
    label: t('wsModule.depotId'),
    component: 'Select',
    componentProps: {
      options: depotOpts,
      style: {
        width: '100%'
      }
    },
    formItemProps: {
      //required: true,
      rules: [{ type: 'string', required: true, message: '编码不能为空!' }]
    }
  },
  {
    field: 'contNo',
    label: t('wsModule.contNo'),
    component: 'Input',
    componentProps: {
      placeholder: ''
    }
  },
  {
    field: 'payeeType',
    label: t('wsModule.payeeType'),
    component: 'Select',
    componentProps: {
      options: payTypeOpts,
      style: {
        width: '100%'
      }
    },
    formItemProps: {
      //required: true,
      rules: [{ type: 'string', required: true, message: '编码不能为空!' }]
    }
  },
  {
    field: 'consTime',
    label: t('wsModule.consTime'),
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD',
      placeholder: '请选择日期'
    }
  },
  {
    field: 'arrDate',
    label: t('wsModule.arrDate'),
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD',
      placeholder: '请选择日期'
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
    field: 'orderTel',
    label: t('wsModule.orderTel'),
    component: 'Input'
    // defaultValue: '1',
    // componentProps: {
    //   type: 'radio',
    //   dictCode:'sex',
    //   placeholder:'请选择性别'
    // },
  },
  {
    field: '',
    component: 'Divider'
  },
  {
    field: 'execDate',
    label: t('wsModule.execDate'),
    component: 'DatePicker',
    componentProps: {
      readonly: true,
      disabled: true,
      style: {
        width: '600px'
      }
    }
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

//定义明细表格字段
export const detailColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'itemId',
    label: t('wsModule.itemId'),
    type: 'WsProductInput',
    minWidth: 120
    // formatter: (cellValue) => {
    //   return renderSysCodeDict(unref(cellValue).state, 'S04')
    // }
  },
  {
    field: 'barCode',
    label: t('wsModule.barCode'),
    minWidth: 120
  },
  {
    field: 'itemName',
    label: t('wsModule.itemName'),
    minWidth: 250
  },
  {
    field: 'itemSubno',
    label: t('wsModule.itemSubno'),
    minWidth: 120
  },
  {
    field: 'itemSpec',
    label: t('wsModule.itemSpec'),
    minWidth: 200
  },
  {
    field: 'orderQty',
    label: t('wsModule.orderQty'),
    minWidth: 120
  },
  {
    field: 'itemUnit',
    label: t('wsModule.itemUnit'),
    minWidth: 100,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).itemUnit, '232')
    }
  },
  {
    field: 'salePrice',
    label: t('wsModule.salePrice'),
    minWidth: 120
  },
  {
    field: 'purPrice',
    label: t('wsModule.purPrice'),
    minWidth: 120
  },
  {
    field: 'saleAmt',
    label: t('wsModule.saleAmt'),
    minWidth: 120
  },
  {
    field: 'purAmt',
    label: t('wsModule.purAmt'),
    minWidth: 120
  }
])
