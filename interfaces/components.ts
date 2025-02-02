import { ImageProps, TextInputProps } from 'react-native'

export interface CallToActionType {
  title: string
  buttonStyle?: string
  textStyle?: string
  onPress?: () => void
}

export interface CustomTextFieldType {
  label: string
  placeholder: string
  labelStyle?: string
  fieldStyle?: string
  containerStyle?: string
  keyboardType?: TextInputProps['keyboardType']
  defaultValue?: string
  onChangeText?: (value: string) => void
  readOnly?: boolean
}

export interface CustomPasswordFieldType {
  label: string
  placeholder: string
  labelStyle?: string
  fieldStyle?: string
  keyboardType?: TextInputProps['keyboardType']
  onChangeText?: (value: string) => void
}

export interface SocialLoginType {
  name: string
  icon?: {
    image: ImageProps
    width: number
    height: number
    style?: string
  }
}
