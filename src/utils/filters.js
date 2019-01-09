import * as options from '@/constants/options'

export function optionLabel (value, optionKey) {
  if (!value && value !== false) return ''
  for (const item of options[optionKey]) {
    if (item.value === value) {
      return item.label
    }
  }
  return ''
}

export function optionLabels (values, optionKey) {
  if (!values) return ''
  let str = ''
  for (const value of values) {
    let label = optionLabel(value, optionKey)
    if (str) {
      str += `, ${label}`
    } else {
      str += label
    }
  }
  return str
}

export function addressFormat (value) {
  if (value) {
    return value.replace('[$]', '')
  }
}
