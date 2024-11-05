import {Alert, Button, FlatList, Image, RefreshControl, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {getUserPosts, signOutAction} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
import {router} from "expo-router";
import EmptyState from "../../components/EmptyState";
import {icons} from "../../constants";
import VideoCard from "../../components/VideoCard";
import {SafeAreaView} from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
    const {user, setUser, setIsLogged} = useGlobalContext();
    const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };
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
      <SafeAreaView className="bg-primary h-full">
          <FlatList
              data={posts}
              // data={[]}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => <VideoCard video={item} />}
              ListHeaderComponent={() => (
                  <View className="my-6 px-4 w-full justify-center items-center">
                      <TouchableOpacity className="w-full items-end" onPress={handleLogout}>
                          <Image
                              source={icons.logout}
                              className="w-6 h-6"
                              resizeMode="contain"
                          />
                      </TouchableOpacity>
                      <View className="w-16 h-16 border border-secondary rounded-lg items-center justify-center ">
                          <Image
                              source={{uri: user?.avatar}}
                              className="w-[90%] h-[90%] rounded-lg"
                              resizeMode="cover"
                          />
                      </View>
                      <InfoBox
                          title={user?.username}
                          containerStyles="mt-5"
                          titleStyles="text-lg text-white"
                      />
                      <View className="flex flex-row items-center justify-center w-full ">
                          <InfoBox
                              title={posts.length || 0}
                              subtitle="posts"
                              containerStyles="mr-10 w-[30%] items-center"
                              titleStyles="text-lg text-white"
                          />
                          <InfoBox
                              title="1.2k"
                              subtitle="followers"
                              containerStyles="mr-5 w-[30%] items-center"
                              titleStyles="text-lg text-white"
                          />
                      </View>
                  </View>
              )}
              ListEmptyComponent={() => (
                  <EmptyState
                      title="No videos Found"
                      subtitle="Be the first one to upload a video"
                  />
              )}
              refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
          />
      </SafeAreaView>
  );
};

export default Profile;
