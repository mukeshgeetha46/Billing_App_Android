// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: IconMapping = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'doc.text.fill': 'article', // Orders
  'cart.fill': 'shopping-cart', // Cart
  'person.fill': 'person', // Profile
  'line.3.horizontal': 'menu', // Menu
  'bell': 'notifications', // Bell
  'magnifyingglass': 'search', // Search
  'slider.horizontal.3': 'tune', // Filter
  'chevron.left': 'chevron-left',
  'plus': 'add',
  'cube.box': 'inventory',
  'minus': 'remove',
  'heart': 'favorite-border',
  'heart.fill': 'favorite',
  'pencil': 'edit',
  'building.2': 'business',
  'creditcard': 'credit-card',
  'globe': 'public',
  'arrow.right.square': 'logout',
  'tag': 'local-offer',
  'mail': 'mail-outline',
  'unfold_more': 'unfold-more',
  'camera': 'photo-camera',
  'more.vertical': 'more-vert',
  'more.horizontal': 'more-horiz',
  'eye': 'visibility',
  'folder.badge.plus': 'create-new-folder',
  'grid.view': 'grid-view',
  'mappin.and.ellipse': 'location-on',
  'phone.fill': 'phone',
  'arrow.triangle.2.circlepath': 'sync',
  'checkmark': 'check',
  'banknote': 'payments',
  'calendar': 'calendar-today',
  'filter': 'filter-list',
  'truck': 'local-shipping',
  'drop': 'water-drop',
  'shippingbox': 'inventory',
  'square.grid.2x2': 'grid-view',
  'cart': 'shopping-cart',
};


/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
