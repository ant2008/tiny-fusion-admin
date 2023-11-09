//定义表格展现
import { reactive, unref } from 'vue'
import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/components/Table'

const { t } = useI18n()

export const glCustomerShowColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'customerId',
    label: t('wsModule.customerId'),
    minWidth: 130
  },
  {
    field: 'customerName',
    label: t('wsModule.customerName'),
    minWidth: 200
  },
  // {
  //     field: 'vendorType',
  //     label: t('wsModule.vendorType'),
  //     minWidth: 120,
  //     formatter: (cellValue) => {
  //         return renderSysCodeDict(unref(cellValue).itemUnit, '232')
  //     }
  // },
  {
    field: 'customerSubNo',
    label: t('wsModule.customerSubNo'),
    minWidth: 120
  },
  {
    field: 'customerMobile',
    label: t('wsModule.customerMobile'),
    minWidth: 120
  },
  {
    field: 'customerIdnum',
    label: t('wsModule.customerIdnum'),
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
