import { saveAs } from 'file-saver'

// 验证是否为blob格式
export function blobValidate(data) {
  return data.type !== 'application/json'
}

export function fileSaveAs(text, name, opts) {
  saveAs(text, name, opts)
}
