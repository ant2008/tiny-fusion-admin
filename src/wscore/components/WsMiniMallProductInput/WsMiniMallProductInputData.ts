//定义表格展现
import { reactive, unref } from 'vue'
import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/components/Table'

const { t } = useI18n()

export const miniMallShowColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'productId',
    label: t('wsModule.productId'),
    minWidth: 130
  },
  {
    field: 'productName',
    label: t('wsModule.productName'),
    minWidth: 200
  },
  {
    field: 'productUnitId',
    label: t('wsModule.productUnitId'),
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).productUnitId, '232')
    }
  },
  {
    field: 'vendorSubno',
    label: t('wsModule.vendorSubno'),
    minWidth: 120
  },
  {
    field: 'itemSpec',
    label: t('wsModule.itemSpec'),
    minWidth: 120
  },
  {
    field: 'salePrice',
    label: t('wsModule.salePrice'),
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
