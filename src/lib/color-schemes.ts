// =====================================================
// Color Scheme Configuration
// =====================================================

export interface ColorSchemeConfig {
  light: {
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    muted: string
    mutedForeground: string
    border: string
    input: string
    ring: string
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
  }
  dark: {
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    muted: string
    mutedForeground: string
    border: string
    input: string
    ring: string
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
  }
}

export const colorSchemeConfigs: Record<string, ColorSchemeConfig> = {
  indigo: {
    light: {
      primary: "hsl(226 100% 66%)",
      primaryForeground: "hsl(210 40% 98%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(215 25% 27%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(215 25% 27%)",
      destructive: "hsl(0 84% 60%)",
      destructiveForeground: "hsl(210 40% 98%)",
      muted: "hsl(210 40% 96%)",
      mutedForeground: "hsl(215 16% 47%)",
      border: "hsl(214 32% 91%)",
      input: "hsl(214 32% 91%)",
      ring: "hsl(226 100% 66%)",
      background: "hsl(0 0% 100%)",
      foreground: "hsl(222 84% 5%)",
      card: "hsl(0 0% 100%)",
      cardForeground: "hsl(222 84% 5%)",
      popover: "hsl(0 0% 100%)",
      popoverForeground: "hsl(222 84% 5%)",
    },
    dark: {
      primary: "hsl(226 100% 66%)",
      primaryForeground: "hsl(210 40% 98%)",
      secondary: "hsl(215 25% 27%)",
      secondaryForeground: "hsl(210 40% 98%)",
      accent: "hsl(215 25% 27%)",
      accentForeground: "hsl(210 40% 98%)",
      destructive: "hsl(0 63% 31%)",
      destructiveForeground: "hsl(210 40% 98%)",
      muted: "hsl(215 25% 27%)",
      mutedForeground: "hsl(217 33% 17%)",
      border: "hsl(215 25% 27%)",
      input: "hsl(215 25% 27%)",
      ring: "hsl(226 100% 66%)",
      background: "hsl(222 84% 5%)",
      foreground: "hsl(210 40% 98%)",
      card: "hsl(222 84% 5%)",
      cardForeground: "hsl(210 40% 98%)",
      popover: "hsl(222 84% 5%)",
      popoverForeground: "hsl(210 40% 98%)",
    },
  },
  blue: {
    light: {
      primary: "hsl(221 83% 53%)",
      primaryForeground: "hsl(210 40% 98%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(215 25% 27%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(215 25% 27%)",
      destructive: "hsl(0 84% 60%)",
      destructiveForeground: "hsl(210 40% 98%)",
      muted: "hsl(210 40% 96%)",
      mutedForeground: "hsl(215 16% 47%)",
      border: "hsl(214 32% 91%)",
      input: "hsl(214 32% 91%)",
      ring: "hsl(221 83% 53%)",
      background: "hsl(0 0% 100%)",
      foreground: "hsl(222 84% 5%)",
      card: "hsl(0 0% 100%)",
      cardForeground: "hsl(222 84% 5%)",
      popover: "hsl(0 0% 100%)",
      popoverForeground: "hsl(222 84% 5%)",
    },
    dark: {
      primary: "hsl(221 83% 53%)",
      primaryForeground: "hsl(210 40% 98%)",
      secondary: "hsl(215 25% 27%)",
      secondaryForeground: "hsl(210 40% 98%)",
      accent: "hsl(215 25% 27%)",
      accentForeground: "hsl(210 40% 98%)",
      destructive: "hsl(0 63% 31%)",
      destructiveForeground: "hsl(210 40% 98%)",
      muted: "hsl(215 25% 27%)",
      mutedForeground: "hsl(217 33% 17%)",
      border: "hsl(215 25% 27%)",
      input: "hsl(215 25% 27%)",
      ring: "hsl(221 83% 53%)",
      background: "hsl(222 84% 5%)",
      foreground: "hsl(210 40% 98%)",
      card: "hsl(222 84% 5%)",
      cardForeground: "hsl(210 40% 98%)",
      popover: "hsl(222 84% 5%)",
      popoverForeground: "hsl(210 40% 98%)",
    },
  },
  green: {
    light: {
      primary: "hsl(142 76% 36%)",
      primaryForeground: "hsl(355 7% 97%)",
      secondary: "hsl(138 76% 97%)",
      secondaryForeground: "hsl(215 25% 27%)",
      accent: "hsl(138 76% 97%)",
      accentForeground: "hsl(215 25% 27%)",
      destructive: "hsl(0 84% 60%)",
      destructiveForeground: "hsl(210 40% 98%)",
      muted: "hsl(138 76% 97%)",
      mutedForeground: "hsl(215 16% 47%)",
      border: "hsl(214 32% 91%)",
      input: "hsl(214 32% 91%)",
      ring: "hsl(142 76% 36%)",
      background: "hsl(0 0% 100%)",
      foreground: "hsl(222 84% 5%)",
      card: "hsl(0 0% 100%)",
      cardForeground: "hsl(222 84% 5%)",
      popover: "hsl(0 0% 100%)",
      popoverForeground: "hsl(222 84% 5%)",
    },
    dark: {
      primary: "hsl(142 76% 36%)",
      primaryForeground: "hsl(355 7% 97%)",
      secondary: "hsl(215 25% 27%)",
      secondaryForeground: "hsl(210 40% 98%)",
      accent: "hsl(215 25% 27%)",
      accentForeground: "hsl(210 40% 98%)",
      destructive: "hsl(0 63% 31%)",
      destructiveForeground: "hsl(210 40% 98%)",
      muted: "hsl(215 25% 27%)",
      mutedForeground: "hsl(217 33% 17%)",
      border: "hsl(215 25% 27%)",
      input: "hsl(215 25% 27%)",
      ring: "hsl(142 76% 36%)",
      background: "hsl(222 84% 5%)",
      foreground: "hsl(210 40% 98%)",
      card: "hsl(222 84% 5%)",
      cardForeground: "hsl(210 40% 98%)",
      popover: "hsl(222 84% 5%)",
      popoverForeground: "hsl(210 40% 98%)",
    },
  },
  purple: {
    light: {
      primary: "hsl(262 83% 58%)",
      primaryForeground: "hsl(210 40% 98%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(215 25% 27%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(215 25% 27%)",
      destructive: "hsl(0 84% 60%)",
      destructiveForeground: "hsl(210 40% 98%)",
      muted: "hsl(210 40% 96%)",
      mutedForeground: "hsl(215 16% 47%)",
      border: "hsl(214 32% 91%)",
      input: "hsl(214 32% 91%)",
      ring: "hsl(262 83% 58%)",
      background: "hsl(0 0% 100%)",
      foreground: "hsl(222 84% 5%)",
      card: "hsl(0 0% 100%)",
      cardForeground: "hsl(222 84% 5%)",
      popover: "hsl(0 0% 100%)",
      popoverForeground: "hsl(222 84% 5%)",
    },
    dark: {
      primary: "hsl(262 83% 58%)",
      primaryForeground: "hsl(210 40% 98%)",
      secondary: "hsl(215 25% 27%)",
      secondaryForeground: "hsl(210 40% 98%)",
      accent: "hsl(215 25% 27%)",
      accentForeground: "hsl(210 40% 98%)",
      destructive: "hsl(0 63% 31%)",
      destructiveForeground: "hsl(210 40% 98%)",
      muted: "hsl(215 25% 27%)",
      mutedForeground: "hsl(217 33% 17%)",
      border: "hsl(215 25% 27%)",
      input: "hsl(215 25% 27%)",
      ring: "hsl(262 83% 58%)",
      background: "hsl(222 84% 5%)",
      foreground: "hsl(210 40% 98%)",
      card: "hsl(222 84% 5%)",
      cardForeground: "hsl(210 40% 98%)",
      popover: "hsl(222 84% 5%)",
      popoverForeground: "hsl(210 40% 98%)",
    },
  },
  orange: {
    light: {
      primary: "hsl(24 95% 53%)",
      primaryForeground: "hsl(60 9% 98%)",
      secondary: "hsl(60 4% 96%)",
      secondaryForeground: "hsl(24 10% 10%)",
      accent: "hsl(60 4% 96%)",
      accentForeground: "hsl(24 10% 10%)",
      destructive: "hsl(0 84% 60%)",
      destructiveForeground: "hsl(210 40% 98%)",
      muted: "hsl(60 4% 96%)",
      mutedForeground: "hsl(25 5% 45%)",
      border: "hsl(20 6% 90%)",
      input: "hsl(20 6% 90%)",
      ring: "hsl(24 95% 53%)",
      background: "hsl(0 0% 100%)",
      foreground: "hsl(20 15% 5%)",
      card: "hsl(0 0% 100%)",
      cardForeground: "hsl(20 15% 5%)",
      popover: "hsl(0 0% 100%)",
      popoverForeground: "hsl(20 15% 5%)",
    },
    dark: {
      primary: "hsl(24 95% 53%)",
      primaryForeground: "hsl(60 9% 98%)",
      secondary: "hsl(12 6% 15%)",
      secondaryForeground: "hsl(60 9% 98%)",
      accent: "hsl(12 6% 15%)",
      accentForeground: "hsl(60 9% 98%)",
      destructive: "hsl(0 63% 31%)",
      destructiveForeground: "hsl(210 40% 98%)",
      muted: "hsl(12 6% 15%)",
      mutedForeground: "hsl(24 5% 64%)",
      border: "hsl(12 6% 15%)",
      input: "hsl(12 6% 15%)",
      ring: "hsl(24 95% 53%)",
      background: "hsl(20 15% 5%)",
      foreground: "hsl(60 9% 98%)",
      card: "hsl(20 15% 5%)",
      cardForeground: "hsl(60 9% 98%)",
      popover: "hsl(20 15% 5%)",
      popoverForeground: "hsl(60 9% 98%)",
    },
  },
  red: {
    light: {
      primary: "hsl(0 84% 60%)",
      primaryForeground: "hsl(210 40% 98%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(215 25% 27%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(215 25% 27%)",
      destructive: "hsl(0 84% 60%)",
      destructiveForeground: "hsl(210 40% 98%)",
      muted: "hsl(210 40% 96%)",
      mutedForeground: "hsl(215 16% 47%)",
      border: "hsl(214 32% 91%)",
      input: "hsl(214 32% 91%)",
      ring: "hsl(0 84% 60%)",
      background: "hsl(0 0% 100%)",
      foreground: "hsl(222 84% 5%)",
      card: "hsl(0 0% 100%)",
      cardForeground: "hsl(222 84% 5%)",
      popover: "hsl(0 0% 100%)",
      popoverForeground: "hsl(222 84% 5%)",
    },
    dark: {
      primary: "hsl(0 84% 60%)",
      primaryForeground: "hsl(210 40% 98%)",
      secondary: "hsl(215 25% 27%)",
      secondaryForeground: "hsl(210 40% 98%)",
      accent: "hsl(215 25% 27%)",
      accentForeground: "hsl(210 40% 98%)",
      destructive: "hsl(0 63% 31%)",
      destructiveForeground: "hsl(210 40% 98%)",
      muted: "hsl(215 25% 27%)",
      mutedForeground: "hsl(217 33% 17%)",
      border: "hsl(215 25% 27%)",
      input: "hsl(215 25% 27%)",
      ring: "hsl(0 84% 60%)",
      background: "hsl(222 84% 5%)",
      foreground: "hsl(210 40% 98%)",
      card: "hsl(222 84% 5%)",
      cardForeground: "hsl(210 40% 98%)",
      popover: "hsl(222 84% 5%)",
      popoverForeground: "hsl(210 40% 98%)",
    },
  },
}

export function applyColorScheme(colorScheme: string, theme: 'light' | 'dark') {
  const config = colorSchemeConfigs[colorScheme]
  if (!config) {
    console.error('❌ Color scheme config not found:', colorScheme)
    return
  }

  const mode = theme === 'dark' ? 'dark' : 'light'
  const colors = config[mode]

  // Only apply primary color variables to avoid conflicts with shadcn/ui
  const primaryColors = {
    primary: colors.primary,
    primaryForeground: colors.primaryForeground,
  }

  Object.entries(primaryColors).forEach(([key, value]) => {
    // Convert camelCase to kebab-case for CSS variables
    const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
    document.documentElement.style.setProperty(`--${cssKey}`, value)
  })
}
