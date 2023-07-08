import { getSyscodeSelect } from '@/wscore/utils/WsDictHelper'
import { WsFormSearchSchema } from '@/wscore/types/wsform'
import { reactive, unref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'
import { useEmitt } from '@/hooks/web/useEmitt'

const { t } = useI18n()

const { emitter } = useEmitt()

// const tmpItemName = ref('sssss')

const stateOpts = getSyscodeSelect('S03')
const autoCodeType = getSyscodeSelect('S56')

//定义查询条件
export const searchSchema: WsFormSearchSchema[] = [
  {
    label: t('wsModule.autocodeId'),
    field: 'autocodeId',
    // colProps: {
    //   span: 5
    // },
    component: 'Input',
    fieldOp: '=',
    fieldDbType: 'String'
  },
  {
    label: t('wsModule.autocodeName'),
    field: 'autocodeName',
    // colProps: {
    //   span: 5
    // },
    fieldOp: 'like',
    fieldDbType: 'String',
    component: 'Input'
  },
  {
    label: t('wsModule.autocodeTableName'),
    field: 'autocodeTableName',
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
    field: 'autocodeId',
    label: t('wsModule.autocodeId'),
    minWidth: 180
  },
  {
    field: 'autocodeName',
    label: t('wsModule.autocodeName'),
    minWidth: 180
  },
  {
    field: 'autocodeType',
    label: t('wsModule.autocodeType'),
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).vendorType, 'S56')
    }
  },
  {
    field: 'autocodeTableName',
    label: t('wsModule.autocodeTableName'),
    minWidth: 200
  },
  {
    field: 'autocodeEntityName',
    label: t('wsModule.autocodeEntityName'),
    minWidth: 180
  },
  {
    field: 'autocodeRelatype',
    label: t('wsModule.autocodeRelatype'),
    minWidth: 120
  },
  {
    field: 'autocodeDtlTableName',
    label: t('wsModule.autocodeDtlTableName'),
    minWidth: 180
  },
  {
    field: 'autocodeDtlEntityName',
    label: t('wsModule.autocodeDtlEntityName'),
    minWidth: 180
  },
  {
    field: 'autocodeAuthor',
    label: t('wsModule.autocodeAuthor'),
    minWidth: 180
  },
  {
    field: 'autocodeModule',
    label: t('wsModule.autocodeModule'),
    minWidth: 160
  },
  {
    field: 'autocodePackage',
    label: t('wsModule.autocodePackage'),
    minWidth: 160
  },
  {
    field: 'autocodeOutpath',
    label: t('wsModule.autocodeOutpath'),
    minWidth: 160
  },
  {
    field: 'autocodeFrontPage',
    label: t('wsModule.autocodeFrontPage'),
    minWidth: 160
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

export const editSchema_Basic: FormSchema[] = [
  {
    field: 'autocodeId',
    label: t('wsModule.autocodeId'),
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
    field: 'autocodeName',
    label: t('wsModule.autocodeName'),
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
    field: 'autocodeType',
    label: t('wsModule.autocodeType'),
    component: 'Select',
    componentProps: {
      options: autoCodeType,
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'autocodeTableName',
    label: t('wsModule.autocodeTableName'),
    component: 'Input',
    colProps: {
      span: 12
    },
    componentProps: {
      readonly: true,
      rules: [{ required: true, message: '表名称不能为空!', trigger: 'blur' }]
    }
  },
  {
    field: 'autocodeEntityName',
    label: t('wsModule.autocodeEntityName'),
    component: 'Input',
    colProps: {
      span: 12
    },
    componentProps: {
      readonly: true,
      rules: [{ required: true, message: '实体类名称不能为空!', trigger: 'blur' }]
    }
  },
  {
    field: 'autocodeRelatype',
    label: t('wsModule.autocodeRelatype'),
    component: 'Select',
    componentProps: {
      options: autoCodeType,
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'autocodeDtlTableName',
    label: t('wsModule.autocodeDtlTableName'),
    component: 'Input',
    colProps: {
      span: 12
    },
    componentProps: {
      readonly: true,
      rules: [{ required: true, message: '明细表名称不能为空!', trigger: 'blur' }]
    }
  },
  {
    field: 'autocodeDtlEntityName',
    label: t('wsModule.autocodeDtlEntityName'),
    component: 'Input',
    colProps: {
      span: 12
    },
    componentProps: {
      readonly: true,
      rules: [{ required: true, message: '明细实体类名称不能为空!', trigger: 'blur' }]
    }
  },
  //   {
  //   field: 'state',
  //   label: t('wsModule.state'),
  //   component: 'Select',
  //   componentProps: {
  //     options: stateOpts,
  //     style: {
  //       width: '100%'
  //     }
  //   }
  // },
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

export const editSchema_Colset = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'autocodeColName',
    label: t('wsModule.autocodeColName'),
    minWidth: 120
  },
  {
    field: 'autocodeColChname',
    label: t('wsModule.autocodeColChname'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeKeyName',
    label: t('wsModule.autocodeKeyName'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeGridShow',
    label: t('wsModule.autocodeGridShow'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeFormShow',
    label: t('wsModule.autocodeFormShow'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeQueryShow',
    label: t('wsModule.autocodeQueryShow'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeIl8Key',
    label: t('wsModule.autocodeIl8Key'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeReadonly',
    label: t('wsModule.autocodeReadonly'),
    minWidth: 120,
    editRender: { name: '' }
  },
  // {
  //   field: 'itemUnit',
  //   label: t('wsModule.itemUnit'),
  //   minWidth: 100,
  //   formatter: (cellValue) => {
  //     return renderSysCodeDict(unref(cellValue).itemUnit, '232')
  //   }
  // },
  {
    field: 'autocodeFormType',
    label: t('wsModule.autocodeFormType'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeFormSpan',
    label: t('wsModule.autocodeFormSpan'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeFormRules',
    label: t('wsModule.autocodeFormRules'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeFormOplist',
    label: t('wsModule.autocodeFormOplist'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeQueryType',
    label: t('wsModule.autocodeQueryType'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeQueryOpera',
    label: t('wsModule.autocodeQueryOpera'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeQueryStyle',
    label: t('wsModule.autocodeQueryStyle'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeGridType',
    label: t('wsModule.autocodeGridType'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeGridSortable',
    label: t('wsModule.autocodeGridSortable'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeGridWidth',
    label: t('wsModule.autocodeGridWidth'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeGridSlotscope',
    label: t('wsModule.autocodeGridSlotscope'),
    minWidth: 120,
    editRender: { name: '' }
  },
  {
    field: 'autocodeGridSlotscopeKey',
    label: t('wsModule.autocodeGridSlotscopeKey'),
    minWidth: 120,
    editRender: { name: '' }
  }
  // {
  //   field: 'action',
  //   minWidth: 160,
  //   fixed: 'right',
  //   label: t('tableDemo.action')
  // }
])

export const editSchema_Gen: FormSchema[] = [
  {
    field: 'autocodeAuthor',
    label: t('wsModule.autocodeAuthor'),
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
    field: 'autocodeModule',
    label: t('wsModule.autocodeModule'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      readonly: true,
      rules: [{ required: true, message: '模块名称不能为空!', trigger: 'blur' }]
      // modelValue: unref(tmpItemName)
      //'onUpdate:modelValue': (value) => $emit('update:modelValue', value)
    }
  },
  {
    field: 'autocodePackage',
    label: t('wsModule.autocodePackage'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      readonly: true,
      rules: [{ required: true, message: '包名称不能为空!', trigger: 'blur' }]
      // modelValue: unref(tmpItemName)
      //'onUpdate:modelValue': (value) => $emit('update:modelValue', value)
    }
  },
  {
    field: 'autocodeOutpath',
    label: t('wsModule.autocodeOutpath'),
    component: 'Input',
    colProps: {
      span: 12
    },
    componentProps: {
      readonly: true,
      rules: [{ required: true, message: '输出路径不能为空!', trigger: 'blur' }]
    }
  },
  {
    field: 'autocodeFrontPage',
    label: t('wsModule.autocodeFrontPage'),
    component: 'Input',
    colProps: {
      span: 12
    },
    componentProps: {
      readonly: true,
      rules: [{ required: true, message: '前端输出路径不能为空!', trigger: 'blur' }]
    }
  }
]
