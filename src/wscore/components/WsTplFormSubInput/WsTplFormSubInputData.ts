//定义表格展现
import { reactive, unref } from 'vue'
import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'

const { t } = useI18n()

export const tplFormSubShowColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'gplTableName',
    label: t('wsModule.gplTableName'),
    minWidth: 130
  },
  {
    field: 'gplTableChname',
    label: t('wsModule.gplTableChname'),
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
    field: 'gplColumnName',
    label: t('wsModule.gplColumnName'),
    minWidth: 120
  },
  {
    field: 'gplColumnChname',
    label: t('wsModule.gplColumnChname'),
    minWidth: 120
  },
  {
    field: 'gplColumnDbtype',
    label: t('wsModule.gplColumnDbtype'),
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
