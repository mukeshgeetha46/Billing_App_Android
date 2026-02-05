import { persistor, store } from '@/store';
import { Slot } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayout() {
    return (
        <Provider store={store}>
            <PersistGate
                loading={
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#1E5AEE" />
                    </View>
                }
                persistor={persistor}
            >
                <Slot />
            </PersistGate>
        </Provider>
    );
}
