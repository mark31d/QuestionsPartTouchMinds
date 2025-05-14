// src/screens/QuestionScreen.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuestions } from '../Components/QuestionsContext';

const { height } = Dimensions.get('window');
const BG = '#B0271E';

/* fallback-мета, если вопрос из кастомной категории */
const FALLBACK_CAT = {
  id:   'custom',
  title:'My questions',
  icon: require('../assets/cat_identity.png'),
};

export default function QuestionScreen({ route, navigation }) {
  /* ───── параметры навигации ─────
     categoryId    – обычный путь (по категории)
     questionsList – готовый массив (Favorites / My)
     startIndex    – с какого вопроса начать                      */
  const { categoryId, startIndex = 0, questionsList } = route.params ?? {};

  const { categories, questions, favorites, toggleFav } = useQuestions();

  /* ───── финальный список вопросов на экране ───── */
  const list = useMemo(() => {
    if (Array.isArray(questionsList) && questionsList.length) return questionsList;
    if (categoryId) return questions.filter((q) => q.category === categoryId);
    return [];
  }, [questionsList, questions, categoryId]);

  /* если по какой-то причине список пустой */
  if (!list.length) {
    return (
      <SafeAreaView style={[st.wrap, { justifyContent: 'center', alignItems: 'center' }]}>
        <TouchableOpacity style={st.backRow} onPress={navigation.goBack}>
          <Image source={require('../assets/arrowBack.png')} style={st.backIco} />
          <Text style={st.backTxt}>Back</Text>
        </TouchableOpacity>
        <Text style={{ color: '#FFF' }}>No questions available</Text>
      </SafeAreaView>
    );
  }

  /* ───── локальный индекс (листание Next) ───── */
  const [idx, setIdx] = useState(
    Math.max(0, Math.min(startIndex, list.length - 1)),
  );
  const q   = list[idx];
  const cat = categories.find((c) => c.id === q.category) ?? FALLBACK_CAT;

  /* ───── share current question ───── */
  const onShare = () => {
    Share.share({ message: q.text }).catch(() => {});
  };

  /* ───── UI ───── */
  return (
    <SafeAreaView style={st.wrap}>
      {/* Back */}
      <TouchableOpacity style={st.backRow} onPress={navigation.goBack}>
        <Image source={require('../assets/arrowBack.png')} style={st.backIco} />
        <Text style={st.backTxt}>Back</Text>
      </TouchableOpacity>

      {/* Card */}
      <View style={st.card}>
        {/* header */}
        <View style={st.cardHeader}>
          <Text style={st.cat}>{cat.title}</Text>
          <Image source={cat.icon} style={st.catIco} />
        </View>

        {/* question */}
        <View style={st.qWrap}>
          <Text style={st.qTxt}>{q.text}</Text>
        </View>

        {/* share & fav */}
        <View style={st.iconsRow}>
          <TouchableOpacity style={st.circle} onPress={onShare}>
            <Image
              source={require('../assets/share.png')}
              style={[st.circleIco, { tintColor: '#FFF' }]}
            />
          </TouchableOpacity>

          <TouchableOpacity style={st.circle} onPress={() => toggleFav(q.id)}>
            <Image
              source={require('../assets/heart.png')}
              style={[
                st.circleIco,
                { tintColor: favorites.includes(q.id) ? BG : '#FFF' },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Next */}
      {list.length > 1 && (
        <TouchableOpacity
          style={st.nextBtn}
          onPress={() => setIdx((i) => (i + 1) % list.length)}
        >
          <Text style={st.nextTxt}>Next question</Text>
        </TouchableOpacity>
      )}

      {/* Viewpoints link */}
      <TouchableOpacity
        style={{ marginTop: 12 }}
        onPress={() => navigation.navigate('Viewpoints', { questionId: q.id })}
      >
        <Text style={st.link}>Show popular viewpoints</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ───── styles ───── */
const CARD_H = Math.round(height * 0.58);

const st = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: BG, paddingHorizontal: 24 },

  /* back */
  backRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 30 },
  backIco: { width: 20, height: 20, tintColor: '#FFF', marginRight: 2, resizeMode: 'contain' },
  backTxt: { color: '#FFF', fontSize: 16 },

  /* card */
  card: {
    backgroundColor: '#841B14',
    borderRadius: 14,
    height: CARD_H,
    padding: 20,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  cat: { color: '#FFF', fontSize: 20, fontWeight: '900' },
  catIco: { width: 40, height: 40, tintColor: '#FFF' },

  qWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  qTxt: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
  },

  /* icons */
  iconsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12 },
  circle: {
    width: 43,
    height: 43,
    borderRadius: 28,
    backgroundColor: '#FFFFFF55',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  circleIco: { width: 24, height: 24, resizeMode: 'contain' },

  /* next */
  nextBtn: {
    marginTop: 24,
    backgroundColor: '#FFFFFF55',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextTxt: { color: '#FFF', fontSize: 16 },

  link: { color: '#FFF', fontSize: 15, textAlign: 'center' },
});
