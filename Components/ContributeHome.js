// Components/ContributeHome.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,                     // ← добавили
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuestions }      from './QuestionsContext';

const BG = '#CD2D27';

export default function ContributeHome({ navigation }) {
  const { userQuestions, deleteUserQuestion } = useQuestions();   // ← delete
  const insets = useSafeAreaInsets();

  /* динамический отступ нижней кнопки */
  const addBtnStyle = [
    styles.addBtn,
    userQuestions.length ? { marginBottom: 24 } : null,
  ];

  /* —— рендер одной карточки —— */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Viewpoints', { questionId: item.id })}
      onLongPress={() =>                      // ← долгий тап = удалить
        Alert.alert(
          'Delete this question?',
          'Are you sure you want to delete this question? This action can’t be undone.',
          [
            { text: 'Cancel',  style: 'cancel' },
            { text: 'Delete',  style: 'destructive', onPress: () => deleteUserQuestion(item.id) },
          ],
        )
      }
    >
      <View style={styles.cardRow}>
        <Text style={styles.myTag}>My question</Text>
        <Image source={require('../assets/cat_identity.png')} style={styles.myIco} />
      </View>
      <Text style={styles.cardQ}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.wrap, { paddingTop: insets.top + 15 }]}>
      <Text style={styles.h1}>Share a question that touches minds</Text>
      <Text style={styles.h2}>
        Add a thought-provoking question and different viewpoints to spark real
        conversations
      </Text>

      {/* ─── Add question ─── */}
      <TouchableOpacity
        style={addBtnStyle}
        onPress={() => navigation.navigate('ContributeEditor')}
      >
        <Text style={styles.addTxt}>Add question</Text>
      </TouchableOpacity>

      {/* ─── список собственных вопросов ─── */}
      <FlatList
        data={userQuestions}
        keyExtractor={(x) => x.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        contentContainerStyle={{
          paddingVertical: 24,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* ─── styles ─── */
const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: BG, paddingHorizontal: 24 },
  h1:  { color: '#FFF', fontSize: 20, fontWeight: '700', marginTop: 30, marginHorizontal: 10 },
  h2:  { color: '#FFF', fontSize: 15, marginTop: 10, marginBottom: 24, marginHorizontal: 10 },

  addBtn: {
    marginTop: 20,
    backgroundColor: '#F5F5F5B2',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  addTxt: { color: '#FFF', fontSize: 16, fontWeight: '600' },

  card: { backgroundColor: '#841B14', borderRadius: 14, padding: 20, marginHorizontal: 10 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  myTag:  { color: '#FFF', fontSize: 20 },
  myIco:  { width: 40, height: 40, tintColor: '#FFF' },
  cardQ:  { color: '#FFF', fontSize: 18, fontWeight: '800', marginTop: 32, alignSelf: 'center' },
});
