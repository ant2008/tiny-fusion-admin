//定义表格展现
import { reactive } from 'vue'
// import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'

const { t } = useI18n()

export const autoCodeChildTableShowColumns = reactive<TableColumn[]>([
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
    field: 'autocodeTableName',
    label: t('wsModule.autocodeTableName'),
    minWidth: 180
  },
  {
    field: 'autocodeEntityName',
    label: t('wsModule.autocodeEntityName'),
    minWidth: 180
  }
])
