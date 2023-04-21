//定义表格展现
import { reactive, unref } from 'vue'
import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'

const { t } = useI18n()

export const tenantShowColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'tenantId',
    label: t('wsModule.tenantId'),
    minWidth: 130
  },
  {
    field: 'tenantName',
    label: t('wsModule.tenantName'),
    minWidth: 200
  },
  {
    field: 'vendorType',
    label: t('wsModule.tenantType'),
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).tenantType, 'S08')
    }
  },
  {
    field: 'tenantUserMobile',
    label: t('wsModule.tenantUserMobile'),
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
