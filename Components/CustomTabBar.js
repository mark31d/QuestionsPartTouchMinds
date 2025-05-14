// src/Components/CustomTabBar.js
import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

/* ─── palette ─── */
const BG            = '#CD2D27';                 // bar-background
const CIRCLE_CLR    = 'rgba(255,255,255,.35)';   // button-background
const ICON_CLR      = '#FFFFFF';                 // normal icon
const ACTIVE_CLR    = '#7F1D1D';                 // coloured icon when focused
const TAB_W         = width / 4;

/* ─── local icons ─── */
const ICONS = {
  Home       : require('../assets/home.png'),
  Contribute : require('../assets/light.png'),
  Favorites  : require('../assets/heart.png'),
  Settings   : require('../assets/gear.png'),
};

export default function CustomTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { name } = route;
        const focused  = state.index === index;

        const onPress = () => {
          const evt = navigation.emit({ type: 'tabPress', target: route.key });
          if (!evt.defaultPrevented) navigation.navigate(name);
        };

        /* ——— tint logic ———
           все иконки подсвечиваем одним цветом при активе */
        const tint = focused ? ACTIVE_CLR : ICON_CLR;

        return (
          <TouchableOpacity
            key={name}
            style={styles.btn}
            activeOpacity={0.85}
            onPress={onPress}
          >
            <View style={styles.circle}>
              <Image source={ICONS[name]} style={[styles.icon, { tintColor: tint }]} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/* ─── styles ─── */
const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: BG,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#00000022',
  },
  btn: {
    width: TAB_W,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 32,
    backgroundColor: CIRCLE_CLR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
