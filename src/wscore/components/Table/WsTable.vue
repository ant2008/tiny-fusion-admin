<script lang="tsx">
import { computed, defineComponent, onMounted, PropType, ref, unref, watch } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { TableProps } from '@/components/Table/src/types'
import { set } from 'lodash-es'
import { VXETable } from 'vxe-table'
import { getSlot } from '@/utils/tsxHelper'
import { Pagination, TableColumn, TableSetProps, TableSlotDefault } from '@/components/Table'

export default defineComponent({
  name: 'WsTable',
  props: {
    pageSize: propTypes.number.def(10),
    currentPage: propTypes.number.def(1),
    // 是否多选
    selection: propTypes.bool.def(true),
    // 是否所有的超出隐藏，优先级低于schema中的showOverflowTooltip,
    showOverflowTooltip: propTypes.bool.def(true),
    // 表头
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    // 展开行
    expand: propTypes.bool.def(false),
    // 是否展示分页
    pagination: {
      type: Object as PropType<Pagination>,
      default: (): Pagination | undefined => undefined
    },
    // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: propTypes.bool.def(false),
    // 加载状态
    loading: propTypes.bool.def(false),
    // 是否叠加索引
    reserveIndex: propTypes.bool.def(false),
    // 对齐方式
    align: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('left'),
    // 表头对齐方式
    headerAlign: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('left'),
    data: {
      type: Array as PropType<Recordable[]>,
      default: () => []
    },
    tableType: propTypes.string.def('table'),

    radioSelection: propTypes.bool.def(false)
  },
  emits: ['update:pageSize', 'update:currentPage', 'register', 'current-change'],
  setup(props, { attrs, slots, emit, expose }) {
    const elTableRef = ref<ComponentRef<typeof VXETable>>()

    // 注册
    onMounted(() => {
      emit('register', unref(elTableRef)?.$parent, unref(elTableRef))
    })

    const pageSizeRef = ref(props.pageSize)

    const currentPageRef = ref(props.currentPage)

    // useTable传入的props
    const outsideProps = ref<TableProps>({})

    const mergeProps = ref<TableProps>({})

    const getProps = computed(() => {
      const propsObj = { ...props }
      Object.assign(propsObj, unref(mergeProps))
      return propsObj
    })

    const setProps = (props: TableProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props)
      outsideProps.value = props
    }

    const setColumn = (columnProps: TableSetProps[], columnsChildren?: TableColumn[]) => {
      const { columns } = unref(getProps)
      for (const v of columnsChildren || columns) {
        for (const item of columnProps) {
          if (v.field === item.field) {
            set(v, item.path, item.value)
          } else if (v.children?.length) {
            setColumn(columnProps, v.children)
          }
        }
      }
    }

    const selections = ref<Recordable[]>([])

    const setRowEdit = (row: any) => {
      //debug
      console.log('wstable editrow', row, unref(elTableRef))
      unref(elTableRef).setEditRow(row)
    }

    const cancelRowEdit = (row: any) => {
      unref(elTableRef)
        .clearEdit()
        .then(() => {
          // 还原行数据
          unref(elTableRef).revertData(row)
        })
    }

    const insertRow = (newRecord: any, rowNumber: any) => {
      unref(elTableRef)
        .insertAt(newRecord, rowNumber)
        .then((res) => {
          unref(elTableRef).setEditRow(res.row)
        })
    }

    const delSelectRow = () => {
      unref(elTableRef).removeCheckboxRow()
    }

    const selectionChange = (selection: Recordable[]) => {
      selections.value = selection
    }

    const getModRecords = (): WsTableRecordSet => {
      //debug
      console.log('tableDatas', unref(elTableRef).getTableData())
      return unref(elTableRef).getRecordset()
    }

    const getTableDatas = (): WsTableDatas => {
      return unref(elTableRef).getTableData()
    }

    //设置vxeTable中每个列数据
    const setEditRowData = (name: string, value: any): any => {
      const rowObj = unref(elTableRef)?.getEditRecord()
      rowObj.row[name] = value
      return rowObj
    }

    //获取正在编辑的行数据。
    const getEditRowData = (): any => {
      return unref(elTableRef)?.getEditRecord().row
    }
    //刷新vxetable的行(暂时不使用)
    const reloadRowData = (row: any | any[]): any => {
      return unref(elTableRef)?.reloadRow(row)
    }

    const currentChange = (
      newValue,
      oldValue,
      row,
      rowIndex,
      $rowIndex,
      column,
      columnIndex,
      $columnIndex,
      $event
    ) => {
      emit(
        'current-change',
        newValue,
        oldValue,
        row,
        rowIndex,
        $rowIndex,
        column,
        columnIndex,
        $columnIndex,
        $event
      )
    }

    expose({
      setProps,
      setColumn,
      selections,
      setRowEdit,
      cancelRowEdit,
      insertRow,
      delSelectRow,
      getModRecords,
      getTableDatas,
      setEditRowData,
      getEditRowData,
      reloadRowData
    })

    const pagination = computed(() => {
      return Object.assign(
        {
          small: false,
          background: false,
          pagerCount: 7,
          layouts: [
            'PrevJump',
            'PrevPage',
            'JumpNumber',
            'NextPage',
            'NextJump',
            'Sizes',
            'FullJump',
            'Total'
          ],
          // layout: 'sizes, prev, pager, next, jumper, ->, total',
          pageSizes: [10, 20, 30, 40, 50, 100],
          disabled: false,
          hideOnSinglePage: false,
          total: 10
        },
        unref(getProps).pagination
      )
    })

    watch(
      () => unref(getProps).pageSize,
      (val: number) => {
        pageSizeRef.value = val
      }
    )

    watch(
      () => unref(getProps).currentPage,
      (val: number) => {
        //debug
        console.log('watch currentpage', currentPageRef, val)
        currentPageRef.value = val
      }
    )

    watch(
      () => pageSizeRef.value,
      (val: number) => {
        emit('update:pageSize', val)
      }
    )

    watch(
      () => currentPageRef.value,
      (val: number) => {
        emit('update:currentPage', val)
      }
    )

    const getBindValue = computed(() => {
      const bindValue: Recordable = { ...attrs, ...props }
      delete bindValue.columns
      delete bindValue.data
      return bindValue
    })

    const renderTableSelection = () => {
      const {
        selection,
        // reserveSelection,
        // align,
        radioSelection,
        headerAlign
      } = unref(getProps)

      // 渲染多选
      return selection && !radioSelection ? (
        <vxe-column
          type="checkbox"
          // reserveSelection={reserveSelection}
          //align={align}
          header-align={headerAlign}
          sortable={true}
          width="50"
        />
      ) : radioSelection ? (
        <vxe-column
          type="radio"
          // reserveSelection={reserveSelection}
          //align={align}
          header-align={headerAlign}
          sortable={true}
          width="50"
        />
      ) : undefined
    }

    const renderTableExpand = () => {
      const { align, headerAlign } = unref(getProps)
      // 渲染展开行
      return unref(getProps).expand ? (
        <vxeColumn type="expand" align={align} headerAlign={headerAlign}>
          {{ default: (data: TableSlotDefault) => getSlot(slots, 'expand', data) }}
        </vxeColumn>
      ) : undefined
    }

    const rnderTreeTableColumn = (columnsChildren: TableColumn[]) => {
      const { align, headerAlign, showOverflowTooltip } = unref(getProps)
      return columnsChildren.map((v) => {
        const props = { ...v }
        if (props.children) delete props.children
        return (
          <vxeColumn
            showOverflowTooltip={showOverflowTooltip}
            align={align}
            headerAlign={headerAlign}
            {...props}
            prop={v.field}
          >
            {{
              default: (data: TableSlotDefault) =>
                v.children && v.children.length
                  ? rnderTableColumn(v.children)
                  : // @ts-ignore
                    getSlot(slots, v.field, data) ||
                    v?.formatter?.(data.row, data.column, data.row[v.field], data.$index) ||
                    data.row[v.field],
              // @ts-ignore
              header: getSlot(slots, `${v.field}-header`)
            }}
          </vxeColumn>
        )
      })
    }

    const rnderTableColumn = (columnsChildren?: TableColumn[]) => {
      const {
        columns,
        // reserveIndex,
        // pageSize,
        // currentPage,
        align,
        headerAlign,
        showOverflowTooltip
      } = unref(getProps)
      return [...[renderTableExpand()], ...[renderTableSelection()]].concat(
        (columnsChildren || columns).map((v) => {
          if (v.type === 'index') {
            return (
              <vxe-column
                type="seq"
                // index={
                //   v.index
                //     ? v.index
                //     : (index) => setIndex(reserveIndex, index, pageSize, currentPage)
                // }
                align={v.align || align}
                headerAlign={v.headerAlign || headerAlign}
                title={v.label}
                width="65px"
              />
            )
          } else {
            const props = { ...v }
            if (props.children) delete props.children
            return (
              <vxe-column
                showOverflowTooltip={showOverflowTooltip}
                align={align}
                headerAlign={headerAlign}
                {...props}
                field={v.field}
                title={v.label}
              >
                {{
                  default: (data: TableSlotDefault) =>
                    v.children && v.children.length
                      ? rnderTreeTableColumn(v.children)
                      : // @ts-ignore
                        getSlot(slots, v.field, data) ||
                        v?.formatter?.(data.row, data.column, data.row[v.field], data.$index) ||
                        data.row[v.field],
                  // @ts-ignore
                  header: () => getSlot(slots, `${v.field}-header`) || v.label,
                  //增加对edit的支持
                  edit: (data: TableSlotDefault) =>
                    getSlot(slots, v.field + '-edit', data) || data.row[v.field]
                }}
              </vxe-column>
            )
          }
        })
      )
    }

    return () => (
      <div v-loading={unref(getProps).loading}>
        <vxe-table
          show-overflow
          ref={elTableRef}
          data={unref(getProps).data}
          onSelection-change={selectionChange}
          {...unref(getBindValue)}
          stripe
          onCurrent-select={currentChange}
        >
          {{
            default: () => rnderTableColumn(),
            append: () => getSlot(slots, 'append')
          }}
        </vxe-table>
        {unref(getProps).pagination ? (
          <vxe-pager
            perfect
            align={'left'}
            v-model:pageSize={pageSizeRef.value}
            v-model:currentPage={currentPageRef.value}
            // className={'mt-10px'}
            {...unref(pagination)}
          />
        ) : undefined}
      </div>
    )
  }
})
</script>

<!--<style scoped>-->

<!--</style>-->
