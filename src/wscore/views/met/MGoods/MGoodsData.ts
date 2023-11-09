import { getSyscodeSelect } from '@/wscore/utils/WsDictHelper'
import { WsFormSearchSchema } from '@/wscore/types/wsform'
import { reactive, unref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useEmitt } from '@/hooks/event/useEmitt'
import { TableColumn } from '@/components/Table'
import { FormSchema } from '@/components/Form'

const { t } = useI18n()

const { emitter } = useEmitt()

// const tmpItemName = ref('sssss')

const unitOptions = getSyscodeSelect('232')
const saleStausOpts = getSyscodeSelect('S02')
const stateOpts = getSyscodeSelect('S03')
const mangerOpts = getSyscodeSelect('215')
const prdAttrOpts = getSyscodeSelect('231')

//定义查询条件
export const searchSchema: WsFormSearchSchema[] = [
  {
    label: t('wsModule.itemId'),
    field: 'itemId',
    // colProps: {
    //   span: 5
    // },
    component: 'Select',
    fieldOp: '=',
    fieldDbType: 'String'
  },
  {
    label: t('wsModule.itemSubno'),
    field: 'itemSubno',
    // colProps: {
    //   span: 5
    // },
    fieldOp: 'like',
    fieldDbType: 'String',
    component: 'Input'
  },
  {
    label: t('wsModule.itemName'),
    field: 'itemName',
    // colProps: {
    //   span: 5
    // },
    fieldOp: 'like',
    fieldDbType: 'String',
    component: 'Input'
  },
  {
    label: t('wsModule.vendorId'),
    field: 'vendorId',
    // style:'width:150px',
    // type:'vendorInput',
    fieldOp: '=',
    fieldDbType: 'String',
    component: 'Input'
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
    field: 'itemId',
    label: t('wsModule.itemId'),
    minWidth: 130
  },
  {
    field: 'ecCode',
    label: t('wsModule.ecCode'),
    minWidth: 120
  },
  {
    field: 'barCode',
    label: t('wsModule.barCode'),
    minWidth: 120
  },
  {
    field: 'itemSubno',
    label: t('wsModule.itemSubno'),
    minWidth: 120
  },
  {
    field: 'salePrice',
    label: t('wsModule.salePrice'),
    minWidth: 120
  },
  {
    field: 'itemName',
    label: t('wsModule.itemName'),
    minWidth: 200
  },
  {
    field: 'itemSpec',
    label: t('wsModule.itemSpec'),
    minWidth: 150
  },
  {
    field: 'itemUnit',
    label: t('wsModule.itemUnit'),
    minWidth: 80,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).itemUnit, '232')
    }
  },

  {
    field: 'prdFactory',
    label: t('wsModule.prdFactory'),
    minWidth: 120
  },
  {
    field: 'classCode',
    label: t('wsModule.classCode'),
    minWidth: 100
  },
  {
    field: 'vendorId',
    label: t('wsModule.vendorId'),
    minWidth: 120
  },
  {
    field: 'fileNo',
    label: t('wsModule.fileNo'),
    minWidth: 120
  },
  {
    field: 'warningDay',
    label: t('wsModule.warningDay'),
    minWidth: 120
  },
  {
    field: 'tradeMark',
    label: t('wsModule.tradeMark'),
    minWidth: 120
  },
  {
    field: 'itempackNum',
    label: t('wsModule.itempackNum'),
    minWidth: 120
  },
  {
    field: 'wholePrice',
    label: t('wsModule.wholePrice'),
    minWidth: 120
  },
  {
    field: 'purPrice',
    label: t('wsModule.purPrice'),
    minWidth: 120
  },
  {
    field: 'saleTax',
    label: t('wsModule.saleTax'),
    minWidth: 80
  },
  {
    field: 'realPrice',
    label: t('wsModule.realPrice'),
    minWidth: 120
  },
  {
    field: 'prdAttrib',
    label: t('wsModule.prdAttrib'),
    minWidth: 120
  },
  {
    field: 'state',
    label: t('wsModule.state'),
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).itemUnit, 'S03')
    }
  },
  {
    field: 'purState',
    label: t('wsModule.purState'),
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).itemUnit, 'S02')
    }
  },
  {
    field: 'saleStatus',
    label: t('wsModule.saleState'),
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).itemUnit, 'S02')
    }
  },

  // {
  //   field: 'importance',
  //   label: t('tableDemo.importance'),
  //   formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
  //     return h(
  //         ElTag,
  //         {
  //           type: cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'
  //         },
  //         () =>
  //             cellValue === 1
  //                 ? t('tableDemo.important')
  //                 : cellValue === 2
  //                     ? t('tableDemo.good')
  //                     : t('tableDemo.commonly')
  //     )
  //   }
  // },

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
    field: 'itemId',
    label: t('wsModule.itemId'),
    component: 'WsProductInput',
    componentProps: {
      placeholder: '请输入商品编码',
      onEvItemReturn: (itemName, itemValue, retData) => {
        //这个机制是这个地方抛出事件，主页面中再捕获。
        emitter.emit('ev-item-return', { itemName, itemValue, retData })
      }
    },
    formItemProps: {
      //required: true,
      rules: [{ type: 'string', required: true, message: '商品编码不能为空!' }]
    }
  },
  {
    field: 'barCode',
    label: t('wsModule.barCode'),
    component: 'WsDepotBatchnoInput',
    componentProps: {
      itemKey: 'depotId',
      editFormName: 'WsEditForm',
      itemIdName: 'itemId',
      depotIdName: 'ecCode',
      onEvItemChange: (itemName, itemValue) => {
        emitter.emit('ev-item-change', { itemName, itemValue })
      }
    }
  },
  {
    field: 'itemName',
    label: t('wsModule.itemName'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      readonly: true,
      rules: [{ required: true, message: '商品名称不能为空!', trigger: 'blur' }]
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
    field: 'ecCode',
    label: t('wsModule.ecCode'),
    component: 'Input',
    componentProps: {
      placeholder: '请输入工资'
    }
  },
  {
    field: 'vendorId',
    label: t('wsModule.vendorId'),
    component: 'WsVendorInput',
    componentProps: {
      onEvItemReturn: (itemName, itemValue, retData) => {
        //这个机制是这个地方抛出事件，主页面中再捕获。
        emitter.emit('ev-item-return', { itemName, itemValue, retData })
      }
    }
  },
  {
    field: 'classCode',
    label: t('wsModule.classCode'),
    component: 'Input'
    // defaultValue: '1',
    // componentProps: {
    //   type: 'radio',
    //   dictCode:'sex',
    //   placeholder:'请选择性别'
    // },
  },
  {
    field: 'bandCode',
    label: t('wsModule.bandCode'),
    component: 'Input'
  },
  {
    field: 'prdFactory',
    label: t('wsModule.prdFactory'),
    component: 'Input'
  },
  {
    field: 'prdOrigin',
    label: t('wsModule.prdOrigin'),
    component: 'Input'
  },
  {
    field: 'fileNo',
    label: t('wsModule.fileNo'),
    component: 'Input'
  },
  {
    field: 'warningDay',
    label: t('wsModule.warningDay'),
    component: 'Input'
  },
  {
    field: '',
    component: 'Divider'
  },
  {
    field: 'salePrice',
    label: t('wsModule.salePrice'),
    component: 'Input',
    componentProps: {
      rules: { required: true, message: '不能为空!', trigger: 'blur' }
    }
  },
  {
    field: 'purPrice',
    label: t('wsModule.purPrice'),
    component: 'Input',
    componentProps: {
      rules: { required: true, message: '不能为空!', trigger: 'blur' }
    }
  },
  {
    field: 'memPrice',
    label: t('wsModule.memPrice'),
    component: 'Input',
    componentProps: {
      readonly: true
    }
  },
  {
    field: 'wholePrice',
    label: t('wsModule.wholePrice'),
    component: 'Input',
    componentProps: {
      readonly: true
    }
  },
  {
    field: 'saleTax',
    label: t('wsModule.saleTax'),
    component: 'Input'
  },
  {
    field: '',
    component: 'Divider'
  },
  {
    field: 'purState',
    label: t('wsModule.purState'),
    component: 'Select',
    componentProps: {
      options: saleStausOpts,
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'saleState',
    label: t('wsModule.saleState'),
    component: 'Select',
    componentProps: {
      options: saleStausOpts,
      style: {
        width: '100%'
      }
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
    }
  },
  {
    field: 'prdAttrib',
    label: t('wsModule.prdAttrib'),
    component: 'Select',
    componentProps: {
      options: prdAttrOpts,
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'manageType',
    label: t('wsModule.manageType'),
    component: 'Select',
    componentProps: {
      options: mangerOpts,
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
    field: 'itemUnit',
    label: t('wsModule.itemUnit'),
    component: 'Select',
    componentProps: {
      options: unitOptions,
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'itemPack',
    label: t('wsModule.itemPack'),
    component: 'Input'
  },
  {
    field: 'minUnit',
    label: t('wsModule.minUnit'),
    component: 'Select',
    componentProps: {
      options: unitOptions,
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'saleTomin',
    label: t('wsModule.saleTomin'),
    component: 'Input'
  },
  {
    field: 'minPrice',
    label: t('wsModule.minPrice'),
    component: 'Input'
  },
  {
    field: 'chkUnit',
    label: t('wsModule.chkUnit'),
    component: 'Select',
    componentProps: {
      options: unitOptions,
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'saleTomin',
    label: t('wsModule.saleTomin'),
    component: 'Input'
  },
  {
    field: 'chkPrice',
    label: t('wsModule.chkPrice'),
    component: 'Input'
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
