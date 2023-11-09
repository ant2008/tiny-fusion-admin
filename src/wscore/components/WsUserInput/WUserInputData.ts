//定义表格展现
import { reactive, unref } from 'vue'
import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/components/Table'

const { t } = useI18n()

export const userShowColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'userId',
    label: t('wsModule.userId'),
    minWidth: 130
  },
  {
    field: 'userName',
    label: t('wsModule.userName'),
    minWidth: 200
  },
  {
    field: 'mobileno',
    label: t('wsModule.mobileno'),
    minWidth: 120
  },
  {
    field: 'tenantName',
    label: t('wsModule.tenantName'),
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
