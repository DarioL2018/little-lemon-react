import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/Home';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();
export const AppContext = createContext();
function App() {
  const [state, setState] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('kOnboardingCompleted');
        setState({
          isLoading: false,
          isOnboardingCompleted: value === 'true',
        });
      } catch (e) {
        console.error('Failed to load onboarding status', e);
        setState({ isLoading: false, isOnboardingCompleted: false });
      }
    };
    checkOnboarding();
  }, []);

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <AppContext.Provider value={{ state, setState }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.isOnboardingCompleted ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </>
          ) : (
            <Stack.Screen name="Onboarding">
              {props => <OnboardingScreen {...props} onComplete={async () => {
                await AsyncStorage.setItem('kOnboardingCompleted', 'true');
                setState({ ...state, isOnboardingCompleted: true });
              }} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}
export default App;