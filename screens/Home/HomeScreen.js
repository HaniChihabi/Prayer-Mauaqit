import {View, Text, TextInput, Button, Stylesheet, TouchableOpacity, Dimensions, LogBox, SafeAreaView, StyleSheet} from 'react-native'
import React, { useState, useEffect } from 'react';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo, AntDesign, Feather, MaterialCommunityIcons, Ionicons, Fontisto } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default HomeScreen = () => {

  const [fajrTime, setFajrTime] = useState('');
  const [dhuhrTime, setDhuhrTime] = useState('');
  const [asrTime, setAsrTime] = useState('');
  const [maghribTime, setMaghribTime] = useState('');
  const [ishaTime, setIshaTime] = useState('');
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
      setFajrTime(data.data.timings.Fajr);
      setDhuhrTime(data.data.timings.Dhuhr);
      setAsrTime(data.data.timings.Asr);
      setMaghribTime(data.data.timings.Maghrib);
      setIshaTime(data.data.timings.Isha);
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

        {/* CITY NAME */}
        <View className="  h-56 items-center justify-center">
          <Text className="text-xl font-medium">
            Asr
          </Text>
        </View>

        {/* RESET BUTTON */}
        <TouchableOpacity className="w-10 h-10  justify-center items-center absolute top-[10%] right-[10%] rounded-2xl border-amber-200" onPress={handleReset}>
            <Text className="font-light text-lg">i</Text>
        </TouchableOpacity>

        {/* BIG SCREEN */}
    <View className={"flex-row w-11/12 rounded-3xl border-amber-200"}>
      {/* PRAYER NAMES */}
        <View className=" w-[50] h-1/3 mb-10 flex-1 m-5">
          <View className="flex-row items-center p-2">
            <MaterialCommunityIcons name="weather-sunset" size={30} color="rgb(253 224 71)" />
            <Text className={"text-2xl ml-3 font-extralight"}>Fadjr</Text>
          </View>
          <View className="flex-row items-center w-full p-2">
            <Feather name="sun" size={30} color="rgb(253 224 71)" />
            <Text className={"text-2xl ml-3 font-extralight"}>
              Duhur
            </Text>
          </View>
          <View className="flex-row items-center p-2">
            <Feather name="sunrise" size={30} color="rgb(253 224 71)" />
            <Text className={"text-2xl ml-3 font-extralight "}>
              Asr
            </Text>
          </View>
          <View className="flex-row items-center p-2">
            <Ionicons name="cloudy-night-outline" size={30} color="rgb(253 224 71)" />
            <Text className={"text-2xl ml-3 font-extralight"}>
              Maghrib
            </Text>
          </View>
          <View className="flex-row items-center p-2 font-light">
            <MaterialCommunityIcons name="weather-night" size={30} color="rgb(253 224 71)" />
            <Text className={"text-2xl ml-3 font-extralight"}>
              Ishaa
            </Text>
          </View>
        </View> 
           {/* PRAYER TIMES */}
        <View className=" h-1/3 mb-10 flex-1 items-center m-5">
            <Text className={"text-2xl ml-3 font-extralight p-2"}>{fajrTime}</Text>
            <Text className={"text-2xl ml-3 font-extralight p-2"}>{dhuhrTime}</Text>
            <Text className={"text-2xl ml-3 font-extralight p-2"}>{asrTime}</Text>
            <Text className={"text-2xl ml-3 font-extralight p-2"}>{maghribTime}</Text>
            <Text className={"text-2xl ml-3 font-extralight p-2"}>{ishaTime}</Text>
        </View>
          
        </View>
{/* SEARCH BUTTON */}
          <View className={"justify-center items-center flex-row space-x-5 m-5"}>
            <TextInput
              placeholder="Enter City"
              value={city}
              onChangeText={setCity}
              className={"p-4 border-[1px] rounded-2xl w-[45%]"}
            />
            <TouchableOpacity className="bg-amber-200 w-[45%] h-14 justify-center items-center rounded-2xl relative top-0 border-[1px]" title="Get Prayer Times" onPress={getPrayerTimes}>
              <Text className="text-lg font-thin">
                Select City
              </Text>
            </TouchableOpacity>
            {prayerTimes && (
              <Text >
                {JSON.stringify(prayerTimes, null, 2)}
              </Text>     
            )}
          {/* SEARCH BAR */}
          </View>

            
          
        {/* BUTTONS */}
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

