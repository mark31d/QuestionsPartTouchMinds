// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* ───── контекст з питаннями ───── */
import { QuestionsProvider } from './Components/QuestionsContext';

/* ───── екрани ───── */
import Loader            from './Components/Loader';           // NEW
import OnboardingScreen  from './Components/OnboardingScreen';
import HomeScreen        from './Components/HomeScreen';
import CategoryScreen    from './Components/CategoryScreen';
import ViewpointsModal   from './Components/ViewpointsModal';
import AddQuestionScreen from './Components/AddQuestionScreen';
import QuestionScreen from './Components/QuestionScreen';
/* ───── кастомний TabBar ───── */
import CustomTabBar from './Components/CustomTabBar';
import ContributeHome   from './Components/ContributeHome';   
import ContributeEditor from './Components/ContributeEditor'; 
import SettingsScreen     from './Components/Settings'; 
/* ───── створюємо навігацію ───── */
const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ContributeStack = createNativeStackNavigator();
function ContributeFlow() {
  return (
    <ContributeStack.Navigator screenOptions={{ headerShown:false }}>
      <ContributeStack.Screen name="ContributeHome"   component={ContributeHome} />
      <ContributeStack.Screen name="ContributeEditor" component={ContributeEditor} />
    </ContributeStack.Navigator>
  );
}
/* нижні вкладки */
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home"       component={HomeScreen} />
      <Tab.Screen name="Contribute" component={ContributeFlow} />
      <Tab.Screen
        name="Favorites"
        component={CategoryScreen}
        initialParams={{ fromFav: true }}
      />
      {/* Settings поки порожній */}
      <Tab.Screen name="Settings"  component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  /* 1) Loader → 2) Intro (єдиножды) → 3) Main   */
  const [bootDone,  setBootDone]  = useState(false);  // Loader
  const [seenIntro, setSeenIntro] = useState(false);  // Onboarding

  /* мінімально показуємо Loader 1,5 сек. */
  useEffect(() => {
    const t = setTimeout(() => setBootDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  /* ——— Loader ——— */
  if (!bootDone) {
    return <Loader />;
  }

  /* ——— Навігація ——— */
  return (
    <QuestionsProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Onboarding лише першого разу */}
          {!seenIntro && (
            <Stack.Screen
              name="Intro"
              component={OnboardingScreen}
              options={{ animation: 'fade' }}
              initialParams={{ onDone: () => setSeenIntro(true) }}
            />
          )}

          <Stack.Screen name="Main"     component={BottomTabs} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="Question" component={QuestionScreen} />
          <Stack.Screen
            name="Viewpoints"
            component={ViewpointsModal}
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}

          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </QuestionsProvider>
  );
}
