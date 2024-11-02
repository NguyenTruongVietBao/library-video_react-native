import { View, Text, Button, Alert } from "react-native";
import React from "react";
import {logout, signOutAction} from '../../lib/appwrite'; // Import the logout function
import { useGlobalContext } from '../../context/GlobalProvider';
import {router} from "expo-router"; // Import global context

const Home = () => {
    const { setIsLogged, setUser } = useGlobalContext(); // Destructure context to update state
    const handleLogout = async () => {
        try {
            await signOutAction(); // Call the logout function
            setIsLogged(false); // Update global state
            setUser(null); // Clear user data
            Alert.alert('Success', 'You have been logged out.');
            router.replace('/sign-in');
        } catch (error) {
            console.error('Logout error: ', error);
            Alert.alert('Error', 'An error occurred while logging out.');
        }
    };

    return (
        <View className={'mt-14'}>
            <Button title="Logout" className="bg-primary text-black p-10" onPress={handleLogout} />
        </View>
    );
};

export default Home;
