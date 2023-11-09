//定义表格展现
import { reactive, unref } from 'vue'
import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/components/Table'

const { t } = useI18n()

export const glVendorShowColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'vendorId',
    label: t('wsModule.vendorId'),
    minWidth: 130
  },
  {
    field: 'vendorName',
    label: t('wsModule.vendorName'),
    minWidth: 200
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
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).itemUnit, 'S03')
    }
  }
])
