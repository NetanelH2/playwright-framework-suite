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

export interface RoleLocator {
  parent?: string
  role: AriaRole
  name: string
}

export type StringOrRoleLocatorType = string | RoleLocator
