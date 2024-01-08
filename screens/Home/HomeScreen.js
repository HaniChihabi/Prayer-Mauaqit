import {View, Text, TextInput, Button, Stylesheet, TouchableOpacity, Dimensions, LogBox, SafeAreaView, StyleSheet} from 'react-native'
import React, { useState, useEffect } from 'react';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Onboarding from '../Onboarding/screens/OnboardingScreen';
import * as ImagePicker from 'expo-image-picker';
import { Entypo, AntDesign, Feather, MaterialCommunityIcons, Ionicons, Fontisto } from '@expo/vector-icons'; 




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
          <View className="absolute top-[10%] text-2xl">
            <Text className="text-4xl">
              Hannover
            </Text>
          </View>
          <View className="w-11/12 h-2/6 justify-center items-center border rounded-2xl border-amber-200 mb-10 flex-box top-">
            <View className="flex-row items-center">
            <MaterialCommunityIcons name="weather-sunset" size={24} color="black" />
              <Text className={"w-56 bg-amber-200"}>
                Fadjr
              </Text>
            </View>
            <View className="flex-row items-center">
            <Feather name="sun" size={24} color="black" />
              <Text className={"w-56 bg-amber-200"}>
                Duhgur
              </Text>
            </View>
            <View className="flex-row items-center">
            <Feather name="sunrise" size={24} color="black" />
              <Text className={"w-56 bg-amber-200"}>
                Asr
              </Text>
            </View>
            <View className="flex-row items-center">
            <Ionicons name="cloudy-night-outline" size={24} color="black" />
              <Text className={"w-56 bg-amber-200"}>
                Maghrib
              </Text>
            </View>
            <View className="flex-row items-center">
            <MaterialCommunityIcons name="weather-night" size={24} color="black" />
              <Text className={"w-56 bg-amber-200"}>
                Ishaa
              </Text>
            </View>
    <View>
                    <TextInput
                        placeholder="Enter City"
                        value={city}
                        onChangeText={setCity}
                />
              <TouchableOpacity className="bg-amber-200 w-28 h-14 justify-center items-center rounded-2xl relative top-0" title="Get Prayer Times" onPress={getPrayerTimes}>
                <Text className="text-lg font-thin">
                  Select City
                </Text>
              </TouchableOpacity>
              {/* {prayerTimes && (
                <Text style={styles.result}>
                  {JSON.stringify(prayerTimes, null, 2)}
                </Text>     
              )} */}
          
                </View>
          </View>
            
            <TouchableOpacity className="w-10 h-10 bg-amber-50 justify-center items-center absolute top-[10%] right-[10%] rounded-2xl " onPress={handleReset}>
                <Text>i</Text>
            </TouchableOpacity>
            <View className="flex-row">
            <TouchableOpacity className="w-[43%] h-2/3 rounded-2xl justify-center items-center mr-5 border-2 border-teal-200 " onPress={pickImage}>
            <Entypo name="upload" size={40} color="turquoise" />
                <Text className="text-lg mt-7 font-thin">Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[43%] h-2/3 rounded-2xl justify-center items-center border border-red-200">
            <AntDesign name="scan1" size={40} color="pink" />
                <Text className="text-lg font-thin mt-7" >Scan</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>

        )
}

