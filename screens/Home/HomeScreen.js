import {View, Text, TextInput, Button, Stylesheet, TouchableOpacity, Dimensions, LogBox, SafeAreaView, StyleSheet} from 'react-native'
import React, { useState, useEffect } from 'react';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Onboarding from '../Onboarding/screens/OnboardingScreen';
import * as ImagePicker from 'expo-image-picker';




export default HomeScreen = () => {


const navigation = useNavigation(); // Use the useNavigation hook here

const handleReset = () => {
    navigation.reset({
        index: 0,
        routes:[{name: 'Onboarding'}],
    })
}
const pickImage =  async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        console.log(result.uri);
    }
}

const [city, setCity] = useState('');
  const [prayerTimes, setPrayerTimes] = useState(null);

  const getPrayerTimes = async () => {
    try {
      const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=United Arab Emirates&method=8`);
      const data = await response.json();
      setPrayerTimes(data);
    } catch (error) {
      console.error("Error fetching prayer times: ", error);
      setPrayerTimes(null);
    }
  };



const sendImageToApi = async (uri) => {
    const formData = new FormData();
    formData.append('image', {
      uri: uri,
      type: 'image/jpeg', // or the correct image mime type
      name: 'image.jpg', // or any name you like
    });
  
    try {
      const response = await axios.post('API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Include any other headers like API keys
        },
      });
  
      setAnalysisResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error sending image to API: ", error);
      setAnalysisResult('Error processing image');
    }
  };
    return(
        <SafeAreaView className="flex-1 justify-center items-center top-0 bg-white">
            
            <View>
                <TextInput
                    placeholder="Enter City"
                    value={city}
                    onChangeText={setCity}
            />
          <Button title="Get Prayer Times" onPress={getPrayerTimes} />
          {/* {prayerTimes && (
            <Text style={styles.result}>
              {JSON.stringify(prayerTimes, null, 2)}
            </Text>     
          )} */}
      
            </View>
            <TouchableOpacity className="w-10 h-10 bg-slate-300 justify-center items-center absolute top-[10%] right-[10%] rounded-2xl " onPress={handleReset}>
                <Text>i</Text>
            </TouchableOpacity>
            <View className="flex-row">
            <TouchableOpacity className="w-28 h-20 rounded-lg justify-center items-center mr-8 border-2 border-yellow-200 " onPress={pickImage}>
                <Text className="text-lg">Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-28 h-20 bg-white rounded-lg justify-center items-center border-2 border-yellow-200 ">
                <Text className="text-lg" >Scan</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
        )
}


// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         top: '0%'
//     },
//     cardContainer:{
//         flexDirection: 'row',
//         top: '10%'
//     },
//     upload:{
//         width: 120,
//         height: 70,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f0f0f0', // Example color
//         marginRight: 10,
//         borderRadius: 10,
//         elevation: 3, // This adds a shadow on Android
//         shadowColor: '#000', // Shadow for iOS
//         shadowOffset: { width: 0, height: 2 }, // Shadow for iOS,
//         shadowRadius: 6, // Shadow for iOS
//         shadowOpacity: 0.3, // Shadow for iOS
//     },
//     scan:{
//         width: 120,
//         height: 70,
//         backgroundColor: '#f0f0f0', // Example color
//         borderRadius: 10,
//         elevation: 3, // This adds a shadow on Android
//         shadowColor: '#000', // Shadow for iOS
//         shadowOffset: { width: 0, height: 2 }, // Shadow for iOS,
//         shadowRadius: 6, // Shadow for iOS
//         shadowOpacity: 0.3, // Shadow for iOS
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginLeft: 10

//     },
//     info:{
//         width: 30,
//         height: 30,
//         backgroundColor: 'lightgrey',
//         borderRadius: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'absolute',
//         top: '10%',
//         right: '10%'
//     },
//     fetchingCity:{
//         position: 'absolute',
//         top: '20%',
//         borderRadius: '50%'
//     },
//     input: {
//         backgroundColor: 'white'
//     },
//     result: {
//         backgroundColor: 'blue',
//     },
//     });