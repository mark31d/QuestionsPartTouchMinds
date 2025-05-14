/* QuestionsContext
 * хранит вопросы, фиксированные категории с иконками, избранное
 * + пользовательские «My questions»
 */
import React, {
  createContext, useContext, useEffect, useCallback, useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import INITIAL_QUESTIONS from './questions';

/* ───── категория-метаданные (порядок = макет) ───── */
export const CATEGORIES = [
  { id: 'identity', title: 'Self & Identity',      icon: require('../assets/cat_identity.png') },
  { id: 'ethics',   title: 'Ethics & Morality',    icon: require('../assets/cat_ethics.png')   },
  { id: 'love',     title: 'Love & Relationships', icon: require('../assets/cat_love.png')     },
  { id: 'society',  title: 'Society & Worldview',  icon: require('../assets/cat_society.png')  },
];

/* ───── ключи хранилища ───── */
const BASE_KEY  = 'qptm_questions_base_v1';
const USER_KEY  = 'qptm_questions_user_v1';

/* ─────────────────────────────────────────────── */
const QuestionsContext = createContext();

/* ============ Provider ============ */
export function QuestionsProvider({ children }) {
  /* базовые (фирменные) */
  const [baseQuestions, setBaseQuestions]   = useState(INITIAL_QUESTIONS);
  /* пользовательские */
  const [userQuestions, setUserQuestions]   = useState([]);

  /* ---------- загрузка при старте ---------- */
  useEffect(() => {
    (async () => {
      try {
        const rawBase = await AsyncStorage.getItem(BASE_KEY);
        if (rawBase) setBaseQuestions(JSON.parse(rawBase));
        const rawUser = await AsyncStorage.getItem(USER_KEY);
        if (rawUser) setUserQuestions(JSON.parse(rawUser));
      } catch (err) {
        console.warn('[QuestionsContext] read error', err);
      }
    })();
  }, []);

  /* ---------- helpers для сохранения ---------- */
  const persistBase = useCallback(async (arr) => {
    setBaseQuestions(arr);
    try { await AsyncStorage.setItem(BASE_KEY, JSON.stringify(arr)); }
    catch (e) { console.warn('[QuestionsContext] base write', e); }
  }, []);

  const persistUser = useCallback(async (arr) => {
    setUserQuestions(arr);
    try { await AsyncStorage.setItem(USER_KEY, JSON.stringify(arr)); }
    catch (e) { console.warn('[QuestionsContext] user write', e); }
  }, []);

  /* ---------- агрегированные данные ---------- */
  const allQuestions = [...baseQuestions, ...userQuestions];
  const favorites    = allQuestions.filter(q => q.favorite).map(q => q.id);

  /* ---------- CRUD ---------- */
  /** список по категории */
  const getByCategory = (catId) =>
    allQuestions.filter(q => q.category === catId);

  /** переключить избранное */
  const toggleFav = (id) => {
    // пробуем в базовых
    const idxBase = baseQuestions.findIndex(q => q.id === id);
    if (idxBase !== -1) {
      const upd = [...baseQuestions];
      upd[idxBase] = { ...upd[idxBase], favorite: !upd[idxBase].favorite };
      return persistBase(upd);
    }
    // значит пользовательский
    const updU = userQuestions.map(q =>
      q.id === id ? { ...q, favorite: !q.favorite } : q);
    persistUser(updU);
  };

  /** add / update / delete пользовательских */
  const addUserQuestion = ({ text, viewpoints }) => {
    const newQ = {
      id: Date.now().toString(),
      category: 'custom',
      text,
      viewpoints,
      favorite: false,
      contributed: true,
    };
    persistUser([...userQuestions, newQ]);
  };

  const updateUserQuestion = (id, patch) => {
    persistUser(userQuestions.map(q => (q.id === id ? { ...q, ...patch } : q)));
  };

  const deleteUserQuestion = (id) =>
    persistUser(userQuestions.filter(q => q.id !== id));

  /* ---------- value для потребителей ---------- */
  const ctxValue = {
    /* данные */
    questions     : allQuestions,
    userQuestions ,
    categories    : CATEGORIES,
    favorites     ,

    /* функции */
    getByCategory ,
    toggleFav     ,
    addUserQuestion,
    updateUserQuestion,
    deleteUserQuestion,
  };

  return (
    <QuestionsContext.Provider value={ctxValue}>
      {children}
    </QuestionsContext.Provider>
  );
}

/* ============ Hook ============ */
export function useQuestions() {
  const ctx = useContext(QuestionsContext);
  if (!ctx) throw new Error('useQuestions must be used inside <QuestionsProvider>');
  return ctx;
}
