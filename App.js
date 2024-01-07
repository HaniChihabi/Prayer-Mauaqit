// Import screens
import OnboardingScreen from './screens/Onboarding/screens/OnboardingScreen';
import HomeScreen from './screens/Home/HomeScreen'
import LoadingScreen from './screens/Loading/LoadingScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" >
        <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};