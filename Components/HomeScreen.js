// Components/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuestions } from './QuestionsContext';

const BG = '#CD2D27';

export default function HomeScreen({ navigation }) {
  const { categories, userQuestions } = useQuestions();

  /* показываем «My questions», если их ≥ 3 */
  const showMy   = userQuestions.length >= 3;
  const data     = showMy
    ? [{ id: 'custom', title: 'My questions', icon: require('../assets/cat_identity.png') }, ...categories]
    : categories;

  /* ——— helper для клика по «My questions» ——— */
  const openMyQuestions = () => {
    if (userQuestions.length === 0) {
      /* ещё нет ни одного — сразу предлагаем добавить */
      navigation.navigate('ContributeHome');
    } else {
      /* запускаем QuestionScreen c готовым массивом */
      navigation.navigate('Question', {
        questionsList: userQuestions,
        startIndex   : 0,
      });
    }
  };

  /* ——— UI ——— */
  return (
    <SafeAreaView style={styles.wrap}>
      <Text style={styles.h1}>One question can open a thousand thoughts</Text>
      <Text style={styles.h2}>
        Choose a category and start a conversation that matters
      </Text>

      <FlatList
        data={data}
        keyExtractor={(c) => c.id}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        contentContainerStyle={{ paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          item.id === 'custom' ? (
            <TouchableOpacity
              style={styles.card}
              onPress={openMyQuestions}
              onLongPress={() => navigation.navigate('ContributeHome')}
            >
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Image
                source={require('../assets/arrow-up-right.png')}
                style={styles.arrow}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('Question', {
                  categoryId: item.id,
                  startIndex: 0,
                })
              }
            >
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Image
                source={require('../assets/arrow-up-right.png')}
                style={styles.arrow}
              />
            </TouchableOpacity>
          )
        }
      />
    </SafeAreaView>
  );
}

/* ——— styles ——— */
const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: BG, paddingHorizontal: 24 },
  h1  : { color: '#FFF', fontSize: 26, fontWeight: '700', marginTop: 12 },
  h2  : { color: '#FFF', fontSize: 15, marginTop: 6, marginBottom: 24 },

  card: {
    backgroundColor: '#841B14',
    borderRadius   : 14,
    padding        : 20,
    justifyContent : 'space-between',
    height         : 140,
  },
  icon     : { width: 36, height: 36, tintColor: '#FFF' },
  cardTitle: { color: '#FFF', fontSize: 22, fontWeight: '700', marginTop: 38 },
  arrow    : {
    position  : 'absolute',
    top       : 20,
    right     : 20,
    width     : 22,
    height    : 22,
    tintColor : '#FFF',
  },
});
