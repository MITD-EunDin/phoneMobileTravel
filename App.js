import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { ToursProvider } from './src/contexts/ToursContext';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
    return (
        <AuthProvider>
            <ToursProvider>
                <AppNavigator />
            </ToursProvider>
            <Toast />
        </AuthProvider>
    );
};

export default App;