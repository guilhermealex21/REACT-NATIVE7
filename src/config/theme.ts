import { Dimensions, Platform } from 'react-native';

// Detectar plataforma
export const isWeb = Platform.OS === 'web';
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

// Responsividade - Scale baseado no tamanho da tela
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const responsiveScale = (baseValue: number) => {
  const screenWidthReference = 375; // iPhone base width
  let scale = (baseValue / screenWidthReference) * screenWidth;
  
  // Se for web, reduz muito mais para ficar bem compacto
  if (isWeb) {
    scale = scale * 0.45;
  } else {
    // Mobile com proporção Android padrão (sem redução significativa)
    scale = scale * 0.85;
  }
  
  return scale;
};

// Breakpoints para diferentes dispositivos
export const isSmallDevice = screenWidth < 375;
export const isMediumDevice = screenWidth >= 375 && screenWidth < 768;
export const isLargeDevice = screenWidth >= 768;

// Espaçamento responsivo
export const spacing = {
  xs: responsiveScale(2),
  sm: responsiveScale(4),
  md: responsiveScale(8),
  lg: responsiveScale(12),
  xl: responsiveScale(16),
};

// Tipos de fonte - Usando fonte padrão do dispositivo
export const fonts = {
  regular: 'System',
  bold: 'System',
  medium: 'System',
  titleBold: 'System',
  titleSemiBold: 'System',
};

// Tamanhos de fonte responsivos
export const fontSizes = {
  xs: responsiveScale(9),
  sm: responsiveScale(11),
  md: responsiveScale(13),
  lg: responsiveScale(15),
  xl: responsiveScale(18),
  xxl: responsiveScale(24),
};

// Cores
export const colors = {
  primary: '#007AFF',
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  light: '#f5f5f5',
  white: '#fff',
  text: '#333',
  textSecondary: '#666',
  textTertiary: '#999',
  border: '#ddd',
  background: '#f9f9f9',
};

// Tema
export const theme = {
  colors,
  fonts,
  fontSizes,
  spacing,
  screenWidth,
  screenHeight,
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  isWeb,
  isAndroid,
  isIOS,
};
