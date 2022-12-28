import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import UserListScreen from '../Screens/UserListScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';



const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
          title: 'LoginScreen',
          headerTitleStyle: { color: "#fff" },
          headerStyle: {
            backgroundColor: '#FBAD28',
          }
        }} /> */}
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{
          title: 'RegistrationScreen',
          headerTitleStyle: { color: "#fff" },
          headerStyle: {
            backgroundColor: '#FBAD28',
          }
        }} />
        <Stack.Screen name="UserListScreen" component={UserListScreen} options={{
          title: 'UserListScreen',
          headerTitleStyle: { color: "#fff" },
          headerStyle: {
            backgroundColor: '#FBAD28',
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;