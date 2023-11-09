//定义表格展现
import { reactive, unref } from 'vue'
import { renderSysCodeDict } from '@/wscore/utils/RenderHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/components/Table'

const { t } = useI18n()

export const productShowColumns = reactive<TableColumn[]>([
  // {
  //   field: 'radio',
  //   label: '#',
  //   type: 'radio'
  // },
  {
    field: 'index',
    label: t('wsModule.index'),
    type: 'index'
  },
  {
    field: 'itemId',
    label: t('wsModule.itemId'),
    minWidth: 130
  },
  {
    field: 'itemName',
    label: t('wsModule.itemName'),
    minWidth: 200
  },
  {
    field: 'itemSubno',
    label: t('wsModule.itemSubno'),
    minWidth: 120
  },
  {
    field: 'salePrice',
    label: t('wsModule.salePrice'),
    minWidth: 120
  },
  {
    field: 'itemSpec',
    label: t('wsModule.itemSpec'),
    minWidth: 150
  },
  {
    field: 'itemUnit',
    label: t('wsModule.itemUnit'),
    minWidth: 80,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).itemUnit, '232')
    }
  },

  {
    field: 'prdFactory',
    label: t('wsModule.prdFactory'),
    minWidth: 120
  },
  {
    field: 'vendorId',
    label: t('wsModule.vendorId'),
    minWidth: 120
  },
  {
    field: 'fileNo',
    label: t('wsModule.fileNo'),
    minWidth: 120
  },
  {
    field: 'warningDay',
    label: t('wsModule.warningDay'),
    minWidth: 120
  },
  {
    field: 'wholePrice',
    label: t('wsModule.wholePrice'),
    minWidth: 120
  },
  // {
  //   field: 'prdAttrib',
  //   label: t('wsModule.prdAttrib'),
  //   minWidth: 120
  // },
  {
    field: 'state',
    label: t('wsModule.state'),
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).itemUnit, 'S03')
    }
  },
  {
    field: 'purState',
    label: t('wsModule.purState'),
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).itemUnit, 'S02')
    }
  },
  {
    field: 'saleStatus',
    label: t('wsModule.saleState'),
    minWidth: 120,
    formatter: (cellValue) => {
      return renderSysCodeDict(unref(cellValue).itemUnit, 'S02')
    }
  }
])
