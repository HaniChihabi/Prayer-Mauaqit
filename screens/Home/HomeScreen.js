import {View, Text, TextInput, Button, Stylesheet, TouchableOpacity, Dimensions, LogBox, SafeAreaView, StyleSheet} from 'react-native'
import React, { useState, useEffect } from 'react';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
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

        {/* CITY NAME */}
        <View className="  text-2xl h-56 items-center justify-center">
          <Text className="text-4xl font-medium">
            Hannover
          </Text>
        </View>

        {/* RESET BUTTON */}
        <TouchableOpacity className="w-10 h-10 bg-amber-100 justify-center items-center absolute top-[10%] right-[10%] rounded-2xl " onPress={handleReset}>
            <Text className="font-light text-lg">i</Text>
        </TouchableOpacity>

        {/* BIG SCREEN */}
        <View className="w-11/12 h-1/3 border rounded-2xl border-amber-200 mb-10 flex-row flex-wrap">
          <View className="flex-row items-center w-6/12 p-6">
            <MaterialCommunityIcons name="weather-sunset" size={32} color="black" />
            <Text className={"text-2xl ml-3 font-light"}>
              Fadjr
            </Text>
          </View>
          <View className="flex-row items-center w-6/12 p-6">
            <Feather name="sun" size={32} color="black" />
            <Text className={"text-2xl ml-3 font-light"}>
              Duhur
            </Text>
          </View>
          <View className="flex-row items-center w-6/12 p-6">
            <Feather name="sunrise" size={32} color="black" />
            <Text className={"text-2xl ml-3 font-light"}>
              Asr
            </Text>
          </View>
          <View className="flex-row items-center w-6/12 p-6 ">
            <Ionicons name="cloudy-night-outline" size={32} color="black" />
            <Text className={"text-2xl ml-3 font-light"}>
              Maghrib
            </Text>
          </View>
          <View className="flex-row items-center w-6/12 p-6 font-light">
            <MaterialCommunityIcons name="weather-night" size={32} color="black" />
            <Text className={"text-2xl ml-3 font-light"}>
              Ishaa
            </Text>
          </View>
        
          {/* SEARCH BUTTON */}
          <View className={"justify-center items-center"}>
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
          {/* SEARCH BAR */}
            <TextInput
              placeholder="Enter City"
              value={city}
              onChangeText={setCity}
            />
          </View>
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

