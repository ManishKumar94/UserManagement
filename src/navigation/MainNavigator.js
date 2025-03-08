import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import Routes from './routes';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.HOME}>
        <Stack.Screen
          name={Routes.HOME}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.USERDETAIL}
          component={UserDetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
