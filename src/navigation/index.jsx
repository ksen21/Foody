








import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "../screens/HomeScreen"
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetails from '../screens/RecipeDetails';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='welcome' screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="welcome" component={WelcomeScreen} />
            <Stack.Screen name="recipeDetails" component={RecipeDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}

export default AppNavigation;

const styles = StyleSheet.create({})