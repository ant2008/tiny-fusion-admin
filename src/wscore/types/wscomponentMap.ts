import { Component } from 'vue'
import WsProductInput from '@/wscore/components/WsProductInput/WsProductInput.vue'
import WsDepotBatchnoInput from '@/wscore/components/WsDepotBatchnoInput/WsDepotBatchnoInput.vue'
import WsVendorInput from '@/wscore/components/WsVendorInput/WsVendorInput.vue'
import WsAutoCodeChildTableInput from '@/wscore/components/WsAutoCodeChildTableInput/WsAutoCodeChildTableInput.vue'
import { WsComponentName } from '@/wscore/types/wscomponentName'

const wscomponentMap: Recordable<Component, WsComponentName> = {
  WsProductInput: WsProductInput,
  WsDepotBatchnoInput: WsDepotBatchnoInput,
  WsVendorInput: WsVendorInput,
  WsAutoCodeChildTableInput: WsAutoCodeChildTableInput
}

export { wscomponentMap }
