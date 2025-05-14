// src/Components/Loader.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';

/* ───── константы ───── */
const COUNT = 4;                // сколько вопросов на экране
const STEP  = 180;              // задержка между соседями (мс)

/* ───── иконки через require ───── */
const Q_ICONS = {
  black: require('../assets/question_black.png'),
  white: require('../assets/question_white.png'),
};

export default function Loader() {
  /* по одному Animated.Value на каждую иконку */
  const opacities = useRef(
    Array.from({ length: COUNT }, () => new Animated.Value(0)),
  ).current;

  /* бесконечная цепочка «появился — исчез» */
  useEffect(() => {
    const seq = opacities.map((val, idx) =>
      Animated.sequence([
        Animated.delay(idx * STEP),
        Animated.timing(val, { toValue: 1, duration: STEP * 1.2, useNativeDriver: true }),
        Animated.timing(val, { toValue: 0, duration: STEP * 1.2, useNativeDriver: true }),
      ]),
    );

    /* запускаем «змейкой» и повторяем в цикле */
    Animated.loop(Animated.stagger(STEP / 2, seq)).start();
  }, [opacities]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.row}>
        {opacities.map((opacity, i) => (
          <Animated.Image
            key={i}
            source={i === 1 ? Q_ICONS.white : Q_ICONS.black}
            style={[
              styles.q,
              { opacity },
            ]}
            resizeMode="contain"
          />
        ))}
      </View>
    </View>
  );
}

/* ───── СТИЛИ ───── */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0271E',      // тот же красный из макета
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  q: {
    width: 95,       // подгоните под размеры ваших png
    height: 95,
    marginHorizontal: 1,
  },
});
