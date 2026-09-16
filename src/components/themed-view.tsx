import { View, type ViewProps } from 'react-native';

const backgrounds = {
  background: '#ffffff',
  backgroundElement: '#F0F0F3',
} as const;

export type ThemedViewProps = ViewProps & {
  type?: keyof typeof backgrounds;
};

export function ThemedView({ style, type = 'background', ...otherProps }: ThemedViewProps) {
  return <View style={[{ backgroundColor: backgrounds[type] }, style]} {...otherProps} />;
}
