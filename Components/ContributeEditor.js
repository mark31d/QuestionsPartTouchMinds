/* eslint-disable react-hooks/exhaustive-deps */
// src/Components/ContributeEditor.js
import React, { useEffect, useCallback, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,                // ⬅️ импорт для картинки-крестика
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useQuestions } from './QuestionsContext';

const BG     = '#B0271E';
const MAX_VP = 6;

export default function ContributeEditor({ route, navigation }) {
  const editId = route.params?.editId;
  const {
    addUserQuestion,
    updateUserQuestion,
    userQuestions,
  } = useQuestions();

  /* исходные данные при редактировании */
  const original      = editId ? userQuestions.find((x) => x.id === editId) : null;
  const [question,  setQuestion]  = useState(original?.text       ?? '');
  const [vpInput,   setVpInput]   = useState('');
  const [viewpoints, setVps]      = useState(original?.viewpoints ?? []);

  /* флаг «несохранённые изменения» */
  const dirty =
    question.trim() !== (original?.text ?? '') ||
    JSON.stringify(viewpoints) !== JSON.stringify(original?.viewpoints ?? []);

  /* предупреждение при выходе без сохранения */
  useFocusEffect(
    useCallback(() => {
      const onBeforeRemove = (e) => {
        if (!dirty) return;
        e.preventDefault();
        Alert.alert(
          'Unsaved Changes',
          'You have unsaved changes. Are you sure you want to leave without saving?',
          [
            { text: 'Keep Editing', style: 'cancel' },
            { text: 'Discard', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
          ],
        );
      };
      navigation.addListener('beforeRemove', onBeforeRemove);
      return () => navigation.removeListener('beforeRemove', onBeforeRemove);
    }, [dirty, navigation]),
  );

  /* helpers */
  const addVp = () => {
    if (!vpInput.trim()) return;
    if (viewpoints.length >= MAX_VP) {
      Alert.alert('Limit reached', `Maximum ${MAX_VP} viewpoints`);
      return;
    }
    setVps([...viewpoints, vpInput.trim()]);
    setVpInput('');
  };

  const save = () => {
    if (!question.trim() || viewpoints.length === 0) return;

    if (editId) {
      updateUserQuestion(editId, { text: question.trim(), viewpoints });
    } else {
      addUserQuestion({ category: 'custom', text: question.trim(), viewpoints });
    }
    navigation.goBack();
  };

  /* UI */
  return (
    <SafeAreaView style={st.wrap}>
      {/* Кнопка «закрыть» c картинкой close.png */}
      <TouchableOpacity style={st.close} onPress={navigation.goBack}>
        <Image
          source={require('../assets/close.png')}
          style={st.closeImg}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={st.h1}>Add your own question</Text>

      {/* Question */}
      <Text style={st.label}>Your Question</Text>
      <TextInput
        style={st.input}
        value={question}
        onChangeText={setQuestion}
        placeholderTextColor="#EEE"
      />

      {/* Viewpoint */}
      <Text style={st.label}>Viewpoint</Text>
      <TextInput
        style={st.input}
        value={vpInput}
        onChangeText={setVpInput}
        onSubmitEditing={addVp}
        placeholderTextColor="#EEE"
      />

      {/* «＋» */}
      <TouchableOpacity
        style={[st.plus, (!vpInput.trim() || viewpoints.length >= MAX_VP) && { opacity: 0.35 }]}
        disabled={!vpInput.trim() || viewpoints.length >= MAX_VP}
        onPress={addVp}
      >
        <Text style={st.plusTxt}>＋</Text>
      </TouchableOpacity>

      {/* список viewpoints */}
      <FlatList
        data={viewpoints}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={st.vpRow}>
            <Text style={st.vpTxt}>{item}</Text>
            <TouchableOpacity onPress={() => setVps(viewpoints.filter((_, i) => i !== index))}>
              <Text style={st.delTxt}>−</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        style={{ maxHeight: 180, marginBottom: 16 }}
      />

      {/* Save */}
      <TouchableOpacity
        style={[
          st.saveBtn,
          (!question.trim() || !viewpoints.length) && { opacity: 0.5 },
        ]}
        disabled={!question.trim() || !viewpoints.length}
        onPress={save}
      >
        <Text style={st.saveTxt}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* styles */
const st = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 24,
    paddingTop: 12,
  },

  /* close */
  close: {
    position: 'absolute',
    right: 10,
    top: 25,
    zIndex: 10,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',

  },
  closeImg: { width: 18, height: 18, tintColor: '#FFF' , },

  /* titles / labels */
  h1: {
    marginTop: 10,
    color: '#FFF',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    marginHorizontal: 10,
  },
  label: { color: '#FFF', marginBottom: 4, marginHorizontal: 10 },

  /* inputs */
  input: {
    backgroundColor: '#841B14',
    borderRadius: 12,
    padding: 12,
    color: '#FFF',
    marginBottom: 12,
    marginHorizontal: 10,
  },

  /* plus button */
  plus: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#841B14',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginHorizontal: 10,
  },
  plusTxt: { color: '#FFF', fontSize: 32, lineHeight: 34 },

  /* viewpoint row */
  vpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9E2017',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 10,
  },
  vpTxt: { flex: 1, color: '#FFF' },
  delTxt: { color: '#FFF', fontSize: 28, paddingHorizontal: 12 },

  /* save */
  saveBtn: {
    backgroundColor: '#FFFFFF44',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    marginHorizontal: 10,
  },
  saveTxt: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
