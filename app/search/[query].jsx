import {View, Text, FlatList} from "react-native";
import React, {useEffect} from "react";
import {useLocalSearchParams} from "expo-router";
import useAppwrite from "../../lib/useAppwrite";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import {SearchPosts} from "../../lib/appwrite";
import {SafeAreaView} from "react-native-safe-area-context";

const Search = () => {
    const { query } = useLocalSearchParams();
    const { data: posts, refetch } = useAppwrite(()=>SearchPosts(query));
    useEffect(() => {
        refetch();
    }, [query]);
  return (
      <SafeAreaView className="bg-primary h-full">
          <FlatList
              data={posts}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => <VideoCard video={item} />}
              ListHeaderComponent={() => (
                  <View className="my-6 px-4 ">
                      <Text className="font-pmedium text-xl text-gray-100">
                          Searched for
                      </Text>
                      <Text className="text-2xl font-psemibold text-white">{query}</Text>
                      <View className=" mb-7 mt-4">
                          <SearchInput initailQuery={query} />
                      </View>
                  </View>
              )}
              ListEmptyComponent={() => (
                  <EmptyState
                      title="No videos Found"
                      subtitle="Be the first one to upload a video"
                  />
              )}
          />
      </SafeAreaView>
  );
};

export default Search;
