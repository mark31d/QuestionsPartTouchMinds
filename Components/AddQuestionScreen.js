// Components/AddQuestionScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useQuestions } from '../Components/QuestionsContext';

const BG = '#B0271E';
const MAX_VPS = 6;

export default function AddQuestionScreen() {
  const { addUserQuestion, userQuestions, deleteUserQuestion } = useQuestions();

  /* ─── форма ─── */
  const [q,   setQ]  = useState('');
  const [vp,  setVp] = useState('');
  const [vps, setVps] = useState([]);

  /* додати viewpoint */
  const addVp = () => {
    if (!vp.trim()) return;

    if (vps.length >= MAX_VPS) {
      Alert.alert('Limit reached', `Maximum ${MAX_VPS} viewpoints per question`);
      return;
    }
    setVps(prev => [...prev, vp.trim()]);
    setVp('');
  };

  /* зберегти питання */
  const save = () => {
    if (!q.trim() || !vps.length) return;

    addUserQuestion({
      category  : 'custom',         // класифікуємо як «My questions»
      text      : q.trim(),
      viewpoints: vps,
    });

    setQ(''); setVp(''); setVps([]);
    Alert.alert('Saved!', 'Your question is now in “My questions”');
  };

  /* ─── UI ─── */
  return (
    <SafeAreaView style={st.wrap}>
      <Text style={st.h1}>Share a question that touches minds</Text>
      <Text style={st.h2}>
        Add a thought-provoking question and different viewpoints to spark real
        conversations
      </Text>

      {/* Question */}
      <TextInput
        placeholder="Your Question"
        placeholderTextColor="#EEE"
        style={st.input}
        value={q}
        onChangeText={setQ}
      />

      {/* Viewpoint */}
      <TextInput
        placeholder="Viewpoint"
        placeholderTextColor="#EEE"
        style={st.input}
        value={vp}
        onChangeText={setVp}
        onSubmitEditing={addVp}
      />

      {/* кнопка «+» */}
      <TouchableOpacity
        style={[
          st.addVpBtn,
          (!vp.trim() || vps.length >= MAX_VPS) && { opacity: 0.35 },
        ]}
        disabled={!vp.trim() || vps.length >= MAX_VPS}
        onPress={addVp}
      >
        <Text style={st.addVpTxt}>＋</Text>
      </TouchableOpacity>

      {/* перелік viewpoint’ів */}
      <FlatList
        data={vps}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={st.vpRow}>
            <Text style={st.vpTxt}>{item}</Text>
            <TouchableOpacity
              onPress={() => setVps(vps.filter((_, i) => i !== index))}
            >
              <Text style={st.delVp}>−</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        style={{ maxHeight: 160, marginBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Save */}
      <TouchableOpacity
        style={[
          st.saveBtn,
          (!(q.trim() && vps.length) || vps.length > MAX_VPS) && { opacity: 0.5 },
        ]}
        disabled={!(q.trim() && vps.length) || vps.length > MAX_VPS}
        onPress={save}
      >
        <Text style={st.saveTxt}>Save</Text>
      </TouchableOpacity>

      {/* Мої питання (можна видалити довгим тапом) */}
      {userQuestions.length > 0 && (
        <FlatList
          data={userQuestions}
          keyExtractor={x => x.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={st.myCard}
              onLongPress={() =>
                Alert.alert(
                  'Delete This Question?',
                  'Are you sure you want to delete this question? This action can’t be undone.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text   : 'Delete',
                      onPress: () => deleteUserQuestion(item.id),
                      style  : 'destructive',
                    },
                  ],
                )
              }
            >
              <Text style={st.myTag}>My question</Text>
              <Text style={st.myText}>{item.text}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

/* ─── styles ─── */
const st = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: BG, paddingHorizontal: 24, paddingTop: 12 },

  /* заголовок */
  h1: { color: '#FFF', fontSize: 22, fontWeight: '700' },
  h2: { color: '#FFF', fontSize: 14, marginTop: 6, marginBottom: 24 },

  /* поля вводу */
  input: {
    backgroundColor: '#841B14',
    borderRadius   : 12,
    paddingHorizontal: 16,
    paddingVertical  : 12,
    color: '#FFF',
    marginBottom: 12,
  },

  /* кнопка «+ viewpoint» */
  addVpBtn: {
    width : 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#841B14',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  addVpTxt: { color: '#FFF', fontSize: 30, lineHeight: 32 },

  /* рядок viewpoint */
  vpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9E2017',
    borderRadius: 10,
    padding: 12,
  },
  vpTxt: { flex: 1, color: '#FFF' },
  delVp: { color: '#FFF', fontSize: 26, paddingHorizontal: 12 },

  /* Save */
  saveBtn: {
    backgroundColor: '#FFFFFF44',
    borderRadius   : 12,
    paddingVertical: 16,
    alignItems     : 'center',
    marginBottom   : 24,
  },
  saveTxt: { color: '#FFF', fontSize: 16, fontWeight: '600' },

  /* my questions */
  myCard: { backgroundColor: '#841B14', borderRadius: 14, padding: 20 },
  myTag : { color: '#FFF', fontSize: 14, marginBottom: 8 },
  myText: { color: '#FFF', fontSize: 17, fontWeight: '600' },
});
