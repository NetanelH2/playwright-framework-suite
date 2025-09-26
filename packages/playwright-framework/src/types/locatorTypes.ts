export type AriaRole =
  | 'button'
  | 'textbox'
  | 'link'
  | 'checkbox'
  | 'radio'
  | 'combobox'
  | 'listbox'
  | 'option'
  | 'heading'
  | 'img'
  | 'alert'

export interface RoleLocator {
  parent?: string
  role: AriaRole
  name: string
}

export type StringOrRoleLocatorType = string | RoleLocator
