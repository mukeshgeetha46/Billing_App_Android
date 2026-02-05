import { Platform, ToastAndroid } from 'react-native';

/**
 * Shows a native Android toast message.
 * @param message The message to display.
 * @param duration The duration of the toast. Defaults to ToastAndroid.SHORT.
 */
export const showToast = (message: string, duration: number = ToastAndroid.SHORT) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, duration);
    } else {
        // Fallback for other platforms where ToastAndroid is not available
        console.log('Toast:', message);
    }
};
