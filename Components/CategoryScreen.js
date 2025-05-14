// Components/CategoryScreen.js
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuestions } from '../Components/QuestionsContext';

const BG = '#B0271E';
const MY_META = {
  title: 'My question',
  icon : require('../assets/cat_identity.png'),
};

export default function CategoryScreen({ route, navigation }) {
  const { catId, fromFav = false } = route.params ?? {};
  const { categories, questions, favorites, toggleFav } = useQuestions();

  /* -------- meta экрана -------- */
  const cat =
    categories.find((c) => c.id === catId) ??
    (fromFav
      ? {
          id      : 'favorites',
          title   : 'Your Saved Questions',
          subtitle: 'Questions you save live here — ready for your next deep conversation',
        }
      : { id: 'custom', title: 'My questions' });

  /* -------- отфильтрованные вопросы -------- */
  const data = useMemo(() => {
    if (fromFav)             return questions.filter((q) => favorites.includes(q.id));
    if (cat.id === 'custom') return questions.filter((q) => q.contributed);
    return questions.filter((q) => q.category === cat.id);
  }, [questions, favorites, fromFav, cat]);

  const metaOf = (q) => categories.find((c) => c.id === q.category) ?? MY_META;

  /* -------- UI -------- */
  return (
    <SafeAreaView style={st.wrap}>
      {/* back: иконка + текст */}
     
      {/* заголовок экрана */}
      <View style={{ marginBottom: 24 }}>
        <Text style={st.h1}>{cat.title}</Text>
        {cat.subtitle && <Text style={st.h2}>{cat.subtitle}</Text>}
      </View>

      {data.length === 0 ? (
        <View style={st.centerFlex}>
          <Text style={st.emptyTxt}>
            {fromFav ? 'You haven’t saved any questions yet' : 'No questions yet'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(q) => q.id}
          ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const meta = metaOf(item);

            return (
              <TouchableOpacity
                style={st.card}
                onPress={() => {
                  if (fromFav) {
                    navigation.navigate('Viewpoints', { questionId: item.id });
                  } else {
                    navigation.navigate('Question', {
                      ...(cat.id === 'custom'
                        ? { questionsList: data }
                        : { categoryId: cat.id }),
                      startIndex: data.findIndex((q) => q.id === item.id),
                    });
                  }
                }}
                onLongPress={() => {
                  if (!fromFav) return;
                  Alert.alert(
                    'Remove from Favorites?',
                    'This question will disappear from your saved list.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Remove', style: 'destructive', onPress: () => toggleFav(item.id) },
                    ],
                  );
                }}
              >
                <View style={st.headerRow}>
                  <Image source={meta.icon} style={st.icon} />
                  <Text style={st.catTitle}>{meta.title}</Text>
                </View>

                <Text style={st.q}>{item.text}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

/* -------- styles -------- */
const st = StyleSheet.create({
  wrap:  { flex: 1, backgroundColor: BG, paddingHorizontal: 24, paddingTop: 12 },
  centerFlex: { flex: 1, justifyContent: 'center', alignItems: 'center' },



  emptyTxt: { color: '#FFF', fontSize: 16 },

  h1: { color: '#FFF', fontSize: 26, fontWeight: '700' },
  h2: { color: '#FFF', fontSize: 15, marginTop: 6 },

  card:       { backgroundColor:'#841B14', borderRadius:14, padding:20 },
  headerRow:  { flexDirection:'row', alignItems:'center' },
  icon:       { width:28, height:28, tintColor:'#FFF', marginRight:10 },
  catTitle:   { color:'#FFF', fontSize:16, fontWeight:'700' },
  q:          { color:'#FFF', fontSize:18, fontWeight:'600', marginTop:32 },
});
