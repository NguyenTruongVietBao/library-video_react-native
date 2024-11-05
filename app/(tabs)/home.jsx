import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import {getAllPosts} from "../../lib/appwrite";
import Trending from "../../components/Trending";
import {useGlobalContext} from "../../context/GlobalProvider";

const Home = () => {
    const {user} = useGlobalContext()
    const { data: posts, refetch } = useAppwrite(getAllPosts);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard video={item}/>
                )}
                ListHeaderComponent={() => (
                    <View className="px-4 my-6 space-y-6 ml-2">
                        {/*Header*/}
                        <View className="mb-6 flex-row items-center justify-between">
                            <View>
                                <Text className="text-sm font-pmedium text-gray-100">
                                    Welcome
                                </Text>
                                <Text className="text-2xl font-psemibold text-white">
                                    Hi {user?.username}
                                </Text>
                            </View>
                            <View>
                                <Image
                                    source={images.logoSmall}
                                    className={"w-[115px] h-[35px] mt-5"}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                        {/*Search input */}
                        <SearchInput/>
                        {/*List video */}
                        <View className="my-6">
                            <Text className="text-white font-psemibold text-lg">Latest Videos </Text>
                            <Trending posts={posts ?? []} />
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

export default Home;


