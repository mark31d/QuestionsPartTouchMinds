// Components/ViewpointsModal.js
import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet, Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuestions } from '../Components/QuestionsContext';

const BG = '#B0271E';

export default function ViewpointsModal({ route, navigation }) {
  const { questionId }            = route.params;
  const { questions, categories } = useQuestions();

  /* ---------- data ---------- */
  const q   = questions.find((x) => x.id === questionId);
  const cat = categories.find((c) => c.id === q.category) ?? {
    icon : require('../assets/cat_identity.png'),
    title: 'My question',
  };

  /* свой вопрос — можно редактировать */
  const canEdit = q.contributed === true || q.category === 'custom';

  /* ---------- share ---------- */
  const shareViewpoints = async () => {
    try {
      const text =
        `${q.text}\n\nPopular viewpoints:\n` +
        q.viewpoints.map(v => `• ${v}`).join('\n');

      await Share.share({ message: text });
    } catch (e) {
      console.warn('[share error]', e);
    }
  };

  /* ---------- UI ---------- */
  return (
    <SafeAreaView style={st.wrap}>
      {/* close */}
      <TouchableOpacity style={st.close} onPress={navigation.goBack}>
        <Image source={require('../assets/close.png')}
               style={st.closeImg} resizeMode="contain" />
      </TouchableOpacity>

      <Text style={st.h1}>Popular viewpoints</Text>

      {/* карточка вопроса */}
      <View style={st.card}>
        <View style={st.row}>
          <Image source={cat.icon} style={st.icon} />
          <Text style={st.catTitle}>{cat.title}</Text>
        </View>
        <Text style={st.q}>{q.text}</Text>
      </View>

      {/* сами viewpoints */}
      <FlatList
        data={q.viewpoints}
        keyExtractor={(_,i)=>i.toString()}
        renderItem={({ item }) => (
          <View style={st.vp}><Text style={st.vpTxt}>{item}</Text></View>
        )}
        ItemSeparatorComponent={() => <View style={{ height:12 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom:140 }}
      />

      {/* edit (карандаш) */}
      {canEdit && (
        <TouchableOpacity
          style={st.editBtn}
          onPress={() =>
            navigation.navigate('ContributeEditor', { editId: q.id })
          }>
          <Image source={require('../assets/pencil.png')} style={st.editIco}/>
        </TouchableOpacity>
      )}

      {/* share — стиль зависит от canEdit */}
      <TouchableOpacity
        style={[st.shareBtn, !canEdit && st.shareCentered]}
        onPress={shareViewpoints}
      >
        <Image source={require('../assets/share.png')} style={st.shareIco}/>
        <Text style={st.shareTxt}>Share viewpoints</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ---------- styles ---------- */
const st = StyleSheet.create({
  wrap:{ flex:1, backgroundColor:BG, paddingHorizontal:24, paddingTop:24 },

  /* close */
  close:{
    position:'absolute', right:24, top:16, zIndex:10,
    width:46, height:46, borderRadius:28,
    backgroundColor:'rgba(255,255,255,0.55)',
    alignItems:'center', justifyContent:'center',
  },
  closeImg:{ width:20, height:20, tintColor:'#FFF' },

  h1:{ color:'#FFF', fontSize:24, fontWeight:'700', marginBottom:24 },

  /* card */
  card:{ backgroundColor:'#841B14', borderRadius:14, padding:20, marginBottom:24 },
  row :{ flexDirection:'row', alignItems:'center' },
  icon:{ width:28, height:28, tintColor:'#FFF', marginRight:10 },
  catTitle:{ color:'#FFF', fontSize:16, fontWeight:'700' },
  q:{ color:'#FFF', fontSize:18, fontWeight:'600', marginTop:32 },

  /* viewpoint pill */
  vp:{ backgroundColor:'#841B14', borderRadius:12, padding:16 },
  vpTxt:{ color:'#FFF', fontSize:15 },

  /* edit */
  editBtn:{
    position:'absolute', left:24, bottom:25,
    width:60, height:60, borderRadius:30,
    backgroundColor:'rgba(255,255,255,0.65)',
    alignItems:'center', justifyContent:'center',
  },
  editIco:{ width:26, height:26, tintColor:'#FFFFFF' },

  /* share common */
  shareBtn:{
    position:'absolute',
    right:24,             /* по умолчанию — при наличии edit-кнопки */
    left:90,              /* не наезжать на pencil */
    bottom:25,
    flexDirection:'row',
    backgroundColor:'rgba(255,255,255,0.65)',
    paddingVertical:20,
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center',
  },
  /* вариант без edit: тянется на всю ширину и оказывается по центру */
  shareCentered:{
    left:24,
    right:24,
  },

  shareIco:{ width:20, height:20, tintColor:'#FFF', marginRight:8 },
  shareTxt:{ color:'#FFF', fontSize:16, fontWeight:'600' },
});
