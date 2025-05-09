import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { ToursProvider } from './src/contexts/ToursContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
    return (
        <AuthProvider>
            <ToursProvider>
                <AppNavigator />
            </ToursProvider>
        </AuthProvider>
    );
};

export default App;