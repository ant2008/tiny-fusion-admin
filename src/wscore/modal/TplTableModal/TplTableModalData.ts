//定义表格展现
import { reactive } from 'vue'
// import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/components/Table'

const { t } = useI18n()

export const tplTableShowColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'gplTableName',
    label: t('wsModule.gplTableName'),
    minWidth: 180
  },
  {
    field: 'gplTableChname',
    label: t('wsModule.gplTableChname'),
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
