/* Components/Settings.js */
import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Switch,
  Share,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BG         = '#B0271E';
const CARD_CLR   = '#841B14';
const CIRCLE_CLR = 'rgba(255,255,255,0.35)';
const ACCENT     = '#FFFFFF';
const STORAGE_KEY = 'qptm_notifications_enabled_v1';

const items = [
  { id: 'notifications', title: 'Notifications', icon: require('../assets/bell.png'),  type: 'toggle' },
  { id: 'share',         title: 'Share the app',  icon: require('../assets/share.png'), type: 'action' },
  { id: 'terms',         title: 'Terms of Use',   icon: require('../assets/doc.png'),   type: 'action' },
];

export default function Settings() {
  const [enabled, setEnabled] = useState(true);

  /* ---- init switch state from storage ---- */
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw !== null) setEnabled(JSON.parse(raw));
      } catch (e) {
        console.warn('[settings] read', e);
      }
    })();
  }, []);

  const saveToggle = useCallback(async (val) => {
    setEnabled(val);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    } catch (e) {
      console.warn('[settings] write', e);
    }
  }, []);

  /* ---- handlers ---- */
  const onShare = async () => {
    try {
      await Share.share({
        message:
          'Check out “Questions that Touch Minds”! Available on iOS / Android.',
      });
    } catch (e) {
      console.warn('[share]', e);
    }
  };

  const showSoon = (title) =>
    Alert.alert(title, 'This feature will be available soon.');

  /* ---- UI ---- */
  return (
    <SafeAreaView style={st.wrap}>
      <Text style={st.h1}>Settings</Text>

      {items.map((item) => {
        const isToggle = item.type === 'toggle';

        const Container = isToggle ? View : TouchableOpacity;
        const containerProps = isToggle
          ? {}
          : {
              activeOpacity: 0.85,
              onPress: item.id === 'share' ? onShare : () => showSoon(item.title),
            };

        return (
          <Container key={item.id} style={st.row} {...containerProps}>
            {/* icon */}
            <View style={st.circle}>
              <Image source={item.icon} style={st.ico} resizeMode="contain" />
            </View>

            {/* title */}
            <Text style={st.title}>{item.title}</Text>

            {/* toggle */}
            {isToggle && (
              <Switch
                style={st.sw}
                ios_backgroundColor="#ffffff55"
                trackColor={{ false: '#ffffff55', true: '#CD2D27' }}
                thumbColor={ACCENT}
                value={enabled}
                onValueChange={saveToggle}
              />
            )}
          </Container>
        );
      })}
    </SafeAreaView>
  );
}

/* ---- styles ---- */
const st = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: BG,
    paddingTop: 24,
  },
  h1: {
    color: ACCENT,
    fontSize: 26,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_CLR,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 18,
    marginHorizontal: 10,
  },

  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: CIRCLE_CLR,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  ico: { width: 30, height: 30, tintColor: ACCENT },

  title: { flex: 1, color: ACCENT, fontSize: 16, fontWeight: '600' },

  sw: { transform: [{ scaleX: 1.35 }, { scaleY: 1.35 }] },
});
