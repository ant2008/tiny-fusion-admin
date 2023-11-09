//定义表格展现
import { reactive, unref } from 'vue'
import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/components/Table'

const { t } = useI18n()

export const glCounsellorShowColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'counsellorId',
    label: t('wsModule.counsellorId'),
    minWidth: 130
  },
  {
    field: 'counsellorName',
    label: t('wsModule.counsellorName'),
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
    field: 'counsellorMobile',
    label: t('wsModule.counsellorMobile'),
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
