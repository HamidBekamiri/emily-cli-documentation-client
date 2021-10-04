import baseStyled, { ThemedStyledInterface } from 'styled-components'
import { DefaultVariables, ThemeVariables } from './vars'
import { transparentize } from 'polished'

export type AppTheme = {
  // General settings (heights, paddings, etc)
  vars: ThemeVariables

  // General colors
  primary: string
  primaryInverse: string
  primaryVariant: string
  onPrimary: string

  secondary: string
  secondaryVariant: string
  onSecondary: string

  accent: string
  onAccent: string

  code: string
  codeBg: string

  // Colors for buttons, alerts, etc.
  success: string
  onSuccess: string

  info: string
  onInfo: string

  warning: string
  onWarning: string

  error: string
  onError: string

  default: string
  onDefault: string

  // Text
  mute: (val: string) => string
}

export const LightTheme: AppTheme = {
  vars: DefaultVariables,

  primary: 'white',
  primaryInverse: '#262322',
  primaryVariant: '#F4F4F4',
  onPrimary: 'black',

  secondary: '#CC2E70',
  secondaryVariant: '#9C528B',
  onSecondary: 'white',

  accent: '#4ECDC4',
  onAccent: 'white',

  codeBg: '#F4F4F4',
  code: 'black',

  // Colors for buttons, alerts, etc.
  success: '#29C940',
  onSuccess: 'white',

  info: '#11CDEF',
  onInfo: 'white',

  warning: '#FFBD2E',
  onWarning: 'white',

  error: '#FF5F57', // or #942911
  onError: 'white',

  default: 'black',
  onDefault: 'white',

  mute: (val: string) => transparentize(0.5, val),
}

export const DarkTheme: AppTheme = {
  vars: DefaultVariables,

  primary: '#262322',
  primaryInverse: 'white',
  primaryVariant: '#1e1d1c',
  onPrimary: 'white',

  secondary: '#A40E4C',
  secondaryVariant: '#461220',
  onSecondary: 'white',

  accent: '#4ECDC4',
  onAccent: 'white',

  codeBg: '#332f2e',
  code: 'white',

  // Colors for buttons, alerts, etc.
  success: '#2DCE89',
  onSuccess: 'white',

  info: '#11CDEF',
  onInfo: 'white',

  warning: '#FB6340',
  onWarning: 'white',

  error: '#F5365C', // or #942911
  onError: 'white',

  default: 'black',
  onDefault: 'white',

  mute: (val: string) => transparentize(0.5, val),
}

export const styled = baseStyled as ThemedStyledInterface<AppTheme>

export enum AppThemes {
  Light,
  Dark,
}
