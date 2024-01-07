import {View, Text, Stylesheet, TouchableOpacity, Dimensions, LogBox, SafeAreaView, StyleSheet} from 'react-native'
import React, { useState, useEffect } from 'react';



export default HomeScreen = () => {

    return(
        <SafeAreaView style={styles.container}>
            
            <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.upload}>
                <Text>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scan}>
                <Text>Scan</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
        )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: '10%'
    },
    cardContainer:{
        flexDirection: 'row',

    },
    upload:{
        width: 120,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Example color
        marginRight: 10,
        borderRadius: 10,
        elevation: 3, // This adds a shadow on Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow for iOS,
        shadowRadius: 6, // Shadow for iOS
        shadowOpacity: 0.3, // Shadow for iOS
    },
    scan:{
        width: 120,
        height: 70,
        backgroundColor: '#f0f0f0', // Example color
        borderRadius: 10,
        elevation: 3, // This adds a shadow on Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow for iOS,
        shadowRadius: 6, // Shadow for iOS
        shadowOpacity: 0.3, // Shadow for iOS
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10

    }
})