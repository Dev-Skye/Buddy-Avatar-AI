import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ChatScreen from "../screens/ChatScreen";
import SettingScreen from "../screens/SettingScreen";
import LottieAnimation from "../screens/LottieAnimation";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName = 'Splash' screenOptions={{headerShown: false}}>
                <Stack.Screen name="Splash" component={SplashScreen}/> 
                <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
                <Stack.Screen name="Lottie" component={LottieAnimation}/>
                <Stack.Screen name="Chat" component={ChatScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Settings" component={SettingScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}