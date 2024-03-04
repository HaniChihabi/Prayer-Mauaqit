# Prayer Times App 🕌

This React Native application provides dynamic Islamic prayer times based on the user-selected city. It integrates various features for personalization, ease of use, and engaging user experience. Below is an overview of the core functionalities, UI components, and external integrations.

## Core Functionalities

- **Dynamic Prayer Times**: Displays daily Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) based on user's selected city.
- **City Selection**: Users can enter a city name, with live suggestions for easy location finding.
- **Persistent Storage**: Uses AsyncStorage for saving and retrieving user preferences such as selected city and prayer times.
- **Image Upload**: Allows users to select and upload images from their device using Expo's `ImagePicker`.
- **Reset Functionality**: Feature to clear all saved data and return to the initial state, with confirmation for data deletion.
- **Calendar Integration**: Requests calendar permissions to potentially add prayer times to the user’s calendar.

## UI Components & Interaction

- **Keyboard Handling**: Implements `KeyboardAvoidingView` with listeners to adjust UI dynamically based on keyboard visibility.
- **Navigation**: Utilizes React Navigation for app navigation and route management.
- **Iconography**: Uses `@expo/vector-icons` for intuitive UI elements.
- **Touchable Elements**: Extensive use of `TouchableOpacity` for interactive elements, providing user feedback.
- **Image Background**: Sets an engaging image background for the home screen.
- **Safe Area View**: Ensures UI components render within safe device bounds.
- **Search and Select City Feature**: Live search functionality that fetches city suggestions based on user input.
- **Dynamic Text Input**: For city search, with updating suggestions based on input.

## External Integrations and APIs

- **Prayer Times API**: Fetches prayer times from `muslimsalat.com` based on the selected city.
- **GeoDB Cities API**: Fetches city suggestions, facilitating easier selection.
- **Expo Calendar**: Integrates with the device's calendar for adding prayer times, subject to permission.

## Additional Features

- **Alert Dialogs**: For confirmations, enhancing user interaction.
- **Custom Hooks and Effects**: Utilizes React's `useState` and `useEffect` for state management and handling side effects.
- **Responsive Design**: Ensures a consistent experience across devices.
- **Debugging and Error Handling**: For API calls and AsyncStorage operations.

---

This application aims to provide a comprehensive tool for observing Islamic prayer times, enhanced with functionalities for personalization and improved user engagement. It's built with React Native, showcasing dynamic data fetching, persistent storage, and an engaging UI/UX design.
