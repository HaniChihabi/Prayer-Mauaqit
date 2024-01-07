import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {View, Text, ActivityIndicator} from 'react-native'

export default LoadingScreen = () => {

    const navigation = useNavigation()
    useEffect(()=> {
        const checkOnboarding = async() => {
            try {
                const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted')
                if (onboardingCompleted === 'true') {
                    // Retrieve City Name
                    const storedCityName = await AsyncStorage.getItem('city')
                    // Navigate to the Home screen and pass the city name
                    navigation.replace('Home', {selectedCity: storedCityName})
                }
                else {
                // If onboarding is not completed, navigate to the Onboarding screen
                    navigation.replace('Onboarding')
                }
            } catch (error) {
                // Handle errors, navigate to Onboarding as a safe default
                navigation.replace('Onboarding')

            }
        }
        checkOnboarding()
    }, [navigation])

    return (
        <></>
    );
}