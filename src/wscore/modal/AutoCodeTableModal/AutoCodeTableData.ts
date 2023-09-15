//定义表格展现
import { reactive } from 'vue'
// import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'

const { t } = useI18n()

export const autoCodeTableShowColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'tableName',
    label: t('wsModule.tableName'),
    minWidth: 180
  },
  {
    field: 'tableComment',
    label: t('wsModule.tableComment'),
    minWidth: 200
  },
  {
    field: 'tableRows',
    label: t('wsModule.tableRows'),
    minWidth: 200
  }
  // {
  //   field: 'state',
  //   label: t('wsModule.state'),
  //   minWidth: 120,
  //   formatter: (cellValue) => {
  //     return renderSysCodeDict(unref(cellValue).itemUnit, 'S03')
  //   }
  // }
])
