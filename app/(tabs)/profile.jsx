import {Alert, Button, Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {signOutAction} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
import {router} from "expo-router";

const Profile = () => {
    const {setUser, setIsLogged} = useGlobalContext();

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
      <View>
          <Text>Profile</Text>
          <Button title="Logout" className="bg-primary text-black p-10" onPress={handleLogout} />
      </View>
  );
};

export default Profile;
