// src/Components/OnboardingScreen.js
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import PagerView from 'react-native-pager-view';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    key  : 's1',
    img  : require('../assets/onb1.png'),    // ваши background-файлы
    title: 'Questions that touch minds',
    desc : `It’s a space for thoughtful, challenging, and
meaningful questions — designed to spark real conversation`,
  },
  {
    key  : 's2',
    img  : require('../assets/onb2.png'),
    title: 'Pick a category. Explore a question.\nTalk it out',
    desc : `Each question comes with different viewpoints.
Discuss with friends, reflect on your own, or just see how others think`,
  },
  {
    key  : 's3',
    img  : require('../assets/onb3.png'),
    title: 'Start a conversation that matters',
    desc : `Whether you're with friends or flying solo,
you’re one question away from something meaningful`,
  },
];

export default function OnboardingScreen({ navigation, route }) {
  const pager = useRef(null);
  const [page, setPage] = useState(0);

  // переход вперёд / финиш
  const next = () => {
    if (page < SLIDES.length - 1) {
      pager.current?.setPage(page + 1);
    } else {
      route.params?.onDone?.();
      navigation.replace('Main');
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Skip */}
      <TouchableOpacity style={styles.skipBtn} onPress={next}>
        <Text style={styles.skipTxt}>Skip</Text>
      </TouchableOpacity>

      {/* Pager */}
      <PagerView
        ref={pager}
        style={styles.pager}
        initialPage={0}
        onPageSelected={e => setPage(e.nativeEvent.position)}
      >
        {SLIDES.map(slide => (
          <View key={slide.key}>
            <ImageBackground source={slide.img} style={styles.bg}>

              {/* затемняющий градиент снизу */}
              <View style={styles.fade} />

              {/* текстовый блок */}
              <View style={styles.bottom}>
                <Text style={styles.h1}>{slide.title}</Text>
                <Text style={styles.desc}>{slide.desc}</Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </PagerView>

      {/* Next / Start Exploring */}
      <TouchableOpacity style={styles.nextBtn} onPress={next}>
        <Text style={styles.nextTxt}>
          {page === SLIDES.length - 1 ? 'Start Exploring' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ── styles ───────────────────────────────────────── */
const P = 24;
const styles = StyleSheet.create({
  root : { flex: 1, backgroundColor: '#000' },

  pager: { flex: 1 },

  bg   : { width, height, justifyContent: 'flex-end' },

  fade : {
    ...StyleSheet.absoluteFillObject,
    height: height * 1,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  bottom: { paddingHorizontal: P, paddingBottom: height * 0.15 },

  h1   : { color: '#fff', fontSize: 28, fontWeight: '700', marginBottom: 12 },
  desc : { color: '#fff', fontSize: 15, lineHeight: 22 },

  skipBtn: { position: 'absolute', top: 50, right: P, zIndex: 2 },
  skipTxt: { color: '#fff', fontSize: 16 },

  nextBtn: {
    position: 'absolute',
    bottom  : 30,
    left    : P,
    right   : P,
    height  : 50,
    borderRadius: 12,
    backgroundColor: '#ddd7',      // светло-серый с небольшой прозрачностью
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextTxt: { fontSize: 16, fontWeight: '600', color: '#000' },
});
