import {View, Text, TextInput, Button, Stylesheet, TouchableOpacity, Dimensions, LogBox, SafeAreaView, StyleSheet} from 'react-native'
import React, { useState, useEffect } from 'react';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Onboarding from '../Onboarding/screens/OnboardingScreen';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Fab } from '@gluestack-ui/themed';
import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { VStack, HStack, Avatar, AvatarImage, Heading, FabIcon, EditIcon, NativeBaseProvider } from 'native-base';




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
            <TouchableOpacity className="w-1/3 h-2/3 rounded-2xl justify-center items-center mr-8 border-2 border-yellow-200 " onPress={pickImage}>
            <Entypo name="upload" size={40} color="#fde68a" />
                <Text className="text-lg">Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/3 h-2/3 bg-white rounded-2xl justify-center items-center border-2 border-yellow-200 ">
            <AntDesign name="scan1" size={40} color="#fde68a" />
                <Text className="text-lg" >Scan</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>

        )
}

