import type { Component } from 'vue'
import {
  ElCascader,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSelectV2,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElAutocomplete,
  ElDivider
} from 'element-plus'
import { InputPassword } from '@/components/InputPassword'
import { Editor } from '@/components/Editor'
import { ComponentName } from '@/types/components'
import WsProductInput from '@/wscore/components/WsProductInput/WsProductInput.vue'
import WsDepotBatchnoInput from '@/wscore/components/WsDepotBatchnoInput/WsDepotBatchnoInput.vue'
import WsVendorInput from '@/wscore/components/WsVendorInput/WsVendorInput.vue'

const componentMap: Recordable<Component, ComponentName> = {
  Radio: ElRadioGroup,
  Checkbox: ElCheckboxGroup,
  CheckboxButton: ElCheckboxGroup,
  Input: ElInput,
  Autocomplete: ElAutocomplete,
  InputNumber: ElInputNumber,
  Select: ElSelect,
  Cascader: ElCascader,
  Switch: ElSwitch,
  Slider: ElSlider,
  TimePicker: ElTimePicker,
  DatePicker: ElDatePicker,
  Rate: ElRate,
  ColorPicker: ElColorPicker,
  Transfer: ElTransfer,
  Divider: ElDivider,
  TimeSelect: ElTimeSelect,
  SelectV2: ElSelectV2,
  RadioButton: ElRadioGroup,
  InputPassword: InputPassword,
  Editor: Editor,
  WsProductInput: WsProductInput,
  WsDepotBatchnoInput: WsDepotBatchnoInput,
  WsVendorInput: WsVendorInput
}

export { componentMap }
