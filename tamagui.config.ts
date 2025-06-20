import { createTamagui, createTokens } from '@tamagui/core'
import { createInterFont } from '@tamagui/font-inter'
import { createMedia } from '@tamagui/react-native-media-driver'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'

const interFont = createInterFont()

const customTokens = createTokens({
  ...tokens,
  color: {
    ...tokens.color,
    primary: '#22c55e',
    primaryDark: '#16a34a',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
  },
  space: {
    ...tokens.space,
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
  },
  size: {
    ...tokens.size,
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
  },
  radius: {
    ...tokens.radius,
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
  },
})

const customThemes = {
  ...themes,
  light: {
    ...themes.light,
    background: '#f8fafc',
    backgroundHover: '#f1f5f9',
    backgroundPress: '#e2e8f0',
    backgroundFocus: '#ffffff',
    borderColor: '#e2e8f0',
    color: '#1e293b',
    colorHover: '#475569',
    colorPress: '#64748b',
    colorFocus: '#22c55e',
    placeholderColor: '#94a3b8',
  },
}

const config = createTamagui({
  defaultFont: 'body',
  animations: {
    fast: {
      type: 'spring',
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      type: 'spring',
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      type: 'spring',
      damping: 20,
      stiffness: 60,
    },
    quick: {
      type: 'spring',
      damping: 25,
      mass: 1,
      stiffness: 300,
    },
  },
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: interFont,
    body: interFont,
  },
  themes: customThemes,
  tokens: customTokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
})

export type AppConfig = typeof config

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export { config }
