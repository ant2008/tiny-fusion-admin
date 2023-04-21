import { reactive } from 'vue'
// import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'

const { t } = useI18n()

export const batchnoShowColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'shipNo',
    label: t('wsModule.shipNo'),
    minWidth: 130
  },
  {
    field: 'batchNo',
    label: t('wsModule.batchNo'),
    minWidth: 200
  },
  {
    field: 'purPrice',
    label: t('wsModule.purPrice'),
    minWidth: 120
  },
  {
    field: 'itemQty',
    label: t('wsModule.itemQty'),
    minWidth: 120
  },
  {
    field: 'overdueDate',
    label: t('wsModule.overdueDate'),
    minWidth: 120
  }
  // {
  //     field: 'state',
  //     label: t('wsModule.state'),
  //     minWidth: 120,
  //     formatter: (cellValue) => {
  //         return renderSysCodeDict(unref(cellValue).itemUnit, 'S03')
  //     }
  // }
])
