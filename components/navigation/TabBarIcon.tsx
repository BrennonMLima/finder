import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ExpoIcons from '@expo/vector-icons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

type IconComponent = React.ComponentType<IconProps<string>>;

interface TabBarIconProps {
  iconType: keyof typeof ExpoIcons;
  name: string;
  style?: any;
  size?: number;
  color?: string;
}

export function TabBarIcon({ iconType, style, size = 28, color, name }: TabBarIconProps) {
  const IconComponent = ExpoIcons[iconType] as IconComponent;

  return <IconComponent size={size} style={[{ marginBottom: 5, color }, style]} name={name} />;
}
