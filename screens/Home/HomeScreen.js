import {View, Alert, KeyboardAvoidingView, Platform, Keyboard, Text, TextInput, Button, Stylesheet, TouchableOpacity, Dimensions, LogBox, SafeAreaView, StyleSheet, ImageBackground} from 'react-native'
import React, { useState, useEffect } from 'react';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo, AntDesign, Feather, MaterialCommunityIcons, Ionicons, Fontisto } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Calendar from 'expo-calendar';




export default HomeScreen = () => {

  const [fajrTime, setFajrTime] = useState('');
  const [dhuhrTime, setDhuhrTime] = useState('');
  const [asrTime, setAsrTime] = useState('');
  const [maghribTime, setMaghribTime] = useState('');
  const [ishaTime, setIshaTime] = useState('');
  const navigation = useNavigation(); // Use the useNavigation hook here
  const [cityName, setCityName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [displayCity, setDisplayCity] = useState(''); // New state for display in TextInput
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const addPrayerTimesToCalendar = async () => {
    // Request permissions
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissions required', 'We need calendar permissions to create prayer time events');
      return;
    }
  
    // Find existing calendars
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    
    // Filter for suitable calendar (e.g., local, not subscribed or read-only)
    const suitableCalendar = calendars.find(calendar => calendar.allowsModifications && calendar.source.type === 'local');
  
    if (!suitableCalendar) {
      Alert.alert('No suitable calendar found', 'Please ensure you have a local calendar that allows modifications.');
      return;
    }
  
    // Define a helper to add an event
    const addEvent = async (title, startDate, endDate) => {
      const eventId = await Calendar.createEventAsync(suitableCalendar.id, {
        title,
        startDate,
        endDate,
        timeZone: 'GMT', // Adjust based on your needs
      });
      console.log(`Event created: ${eventId}`);
    };
  
    // Prepare dates for the prayer times - assuming they are for today
    const today = new Date();
    const prayerTimes = [
      { title: 'Fajr', time: fajrTime },
      { title: 'Dhuhr', time: dhuhrTime },
      { title: 'Asr', time: asrTime },
      { title: 'Maghrib', time: maghribTime },
      { title: 'Isha', time: ishaTime },
    ];
  
    // For each prayer time, add an event
    for (const { title, time } of prayerTimes) {
      const [hours, minutes] = time.split(':').map(Number); // Assuming time is in HH:mm format
      const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
      const endDate = new Date(startDate.getTime() + 30 * 60000); // Assuming 30 minutes duration for each prayer
  
      await addEvent(`${title} Prayer`, startDate, endDate);
    }
  
    Alert.alert('Success', 'Prayer times added to your calendar');
  };
  

  const deleteStoredData = async () => {
    try {
      await AsyncStorage.removeItem('savedCityData');
      console.log("City data deleted successfully");
      // Optionally, reset the state variables to their initial state
      setCityName('');
      setDisplayCity('');
      setFajrTime('');
      setDhuhrTime('');
      setAsrTime('');
      setMaghribTime('');
      setIshaTime('');
    } catch (error) {
      console.error("Error deleting city data: ", error);
    }
  };
  


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );
  
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const saveCityData = async (city, prayerTimes) => {
    try {
      const cityData = { city, prayerTimes };
      await AsyncStorage.setItem('savedCityData', JSON.stringify(cityData));
      console.log("saved citydata")
    } catch (error) {
      console.error("Error saving city data: ", error);
    }
  };

  useEffect(() => {
    const loadCityData = async () => {
      try {
        const savedCityData = await AsyncStorage.getItem('savedCityData');
        if (savedCityData !== null) {
          const { city, prayerTimes } = JSON.parse(savedCityData);
          setCityName(city);
          setDisplayCity(city);
          setFajrTime(prayerTimes.fajr);
          setDhuhrTime(prayerTimes.dhuhr);
          setAsrTime(prayerTimes.asr);
          setMaghribTime(prayerTimes.maghrib);
          setIshaTime(prayerTimes.isha);
          console.log("Loaded city data: ", city, prayerTimes);
        } else {
          console.log("No saved city data found");
        }
      } catch (error) {
        console.error("Error loading city data: ", error);
      }
    };
  
    loadCityData();
  }, []);
  
  

  const handleSelectCity = () => {
    const selectedCity = displayCity.split(',')[0];
    setCityName(selectedCity);
    setSuggestions([]); // Clear suggestions here
    getPrayerTimes();
    saveCityData(selectedCity);
  };
  
  
  
const handleReset = () => {
    navigation.reset({
        index: 0,
        routes:[{name: 'Onboarding'}],
    })
}

const handleResetAndDeleteData = () => {
  Alert.alert(
    "Confirm Reset",
    "Every data will be resetted. Are you sure you want to reset?"
    ,
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { 
        text: "Yes", 
        onPress: async () => {
          await deleteStoredData();
          handleReset();
        }
      }
    ],
    { cancelable: false }
  );
};

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

  const fetchsuggestions = async  (input) => {
    if (input.length > 0) {
      try {
        setSuggestions([]);
        const options= {
          method: 'GET',
          url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
          params: { namePrefix: input, minPopulation: 10000, limit: 5 },
          headers: {
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
                    'X-RapidAPI-Key': 'e88ee664bdmshad6c6505a38d94cp144614jsndeb85cd45b61' 
          }
         }
          const response = await axios.request(options);
          const cities = response.data.data.map(city => `${city.name}, ${city.countryCode}`);
          setSuggestions(cities)
          console.log("From fetch suggestions:", cities);
      }
      catch (error) {
        setSuggestions([])
      }
    }

  }

  const getPrayerTimes = async () => {
    if (cityName.trim() === '') {
      alert("Please enter a city");
      return;
    }
    try {
      const apiKey = '821bf235767ff49d9c4e630649bd7e74';
      const response = await fetch(`https://muslimsalat.com/${cityName}.json?key=${apiKey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      if (response.status === 200 && data) {
        const todaysTimings = data.items[0];
        setFajrTime(todaysTimings.fajr);
        setDhuhrTime(todaysTimings.dhuhr);
        setAsrTime(todaysTimings.asr);
        setMaghribTime(todaysTimings.maghrib);
        setIshaTime(todaysTimings.isha);
        Keyboard.dismiss();
  
        // Save the city name and prayer times
        saveCityData(cityName, {
          fajr: todaysTimings.fajr,
          dhuhr: todaysTimings.dhuhr,
          asr: todaysTimings.asr,
          maghrib: todaysTimings.maghrib,
          isha: todaysTimings.isha
        });
      } else {
        alert("Failed to fetch prayer times. Please try again");
      }
    } catch (error) {
      console.error("Error fetching prayer times: ", error);
      alert("Error fetching prayer times. Please try again");
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
      <ImageBackground source={require('../Onboarding/assets/fajr.jpg')} style={{ flex: 1 }}>

<KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
    keyboardVerticalOffset={-500}
  >
      <SafeAreaView className="flex-1 justify-center items-center top-0 bg-white">
      <View className={`${isKeyboardVisible ? "absolute w-full h-[60%] top-0 bg-white -z-10 justify-center items-center" : "hidden"}`}>
        <Text className={"text-lg font-extralight top-12"}>{cityName}</Text>
      </View>

        {/* CITY NAME */}
       
        {/* RESET BUTTON */}
        <TouchableOpacity className="w-10 h-10  justify-center items-center absolute top-[5%] right-[5%] rounded-3xl bg-slate-50 border-amber-200" onPress={handleResetAndDeleteData}>
            <Text className="font-light text-lg">i</Text>
        </TouchableOpacity>

        {/* BIG SCREEN */}
        
    <View className={"flex-row w-11/12 mt-[50%] rounded-3xl border-amber-200 -z-20"}>
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
          <View className={`justify-center items-center flex-row space-x-5 m-5 }`}>
            <TextInput
              placeholder="Enter City"
              value={displayCity}
              onChangeText={(text)=>{
                setDisplayCity(text);
                setCityName(text.split(',')[0]);
                fetchsuggestions(text);
              }}
              className={"p-4 border-[1px] rounded-2xl w-[45%]"}
            />

            <TouchableOpacity className="bg-amber-200 w-[45%] h-14 justify-center items-center rounded-2xl relative top-0 border" title="Get Prayer Times" onPress={handleSelectCity}>
              <Text className="text-lg font-thin">
                Select City
              </Text>
            </TouchableOpacity>
            
           
          {/* SEARCH BAR */}
          </View>

      <TouchableOpacity className="w-[90%] mb-[5%] h-[10%] rounded-2xl justify-center items-center border-2 border-amber-400	"    onPress={addPrayerTimesToCalendar}

>
            <AntDesign name="calendar" size={40} color="orange" />
            {/* <Text className="text-lg font-extralight mt-5" >Send '{cityName}' times to calendar</Text> */}
      </TouchableOpacity>

        {/* BUTTONS */}
        <View className="flex-row -z-10">
          {/* FETCHING SUGGESTIONS */}
            {suggestions.length > 0 && (
              <View className={` ${isKeyboardVisible ? "absolute bg-white rounded-2xl w-[92%] z-30 bottom-[130%] h-[150%] justify-center items-center" : "hidden"}`}>
                {suggestions.map((suggestion, index) =>(
                  <TouchableOpacity
                  key= {index}
                  onPress={() => {
                    setDisplayCity(suggestion)
                  }}
                  >
                  <Text className={"text-lg"}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            )}
          <TouchableOpacity className="w-[43%] h-2/3 rounded-2xl justify-center items-center mr-5 border-2 border-teal-200 " onPress={pickImage}>
            <Entypo name="upload" size={40} color="turquoise" />
            <Text className="text-lg mt-7 font-thin">Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[43%] h-2/3 rounded-2xl justify-center items-center border-2 border-red-200">
            <AntDesign name="scan1" size={40} color="pink" />
            <Text className="text-lg font-thin mt-7" >Scan</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </KeyboardAvoidingView>
      </ImageBackground>
    )
}

