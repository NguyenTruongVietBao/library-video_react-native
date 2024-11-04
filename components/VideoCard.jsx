import {View, Text, Image, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {ResizeMode, Video} from "expo-av";
import {icons} from "../constants";

const VideoCard = (
    {video: {title, thumbnail, video, creator: {username, avatar}}}
) => {
    const [play, setPlay] = useState(false)
    return (
        <View className="flex-col items-center px-4 mb-14 ">
            <View className="flex flex-row justify-center items-center mb-2">
                <View className="w-[46px] h-[45px] border border-secondary-100 p-1 rounded-lg">
                    <Image
                        source={{uri: avatar}}
                        className="w-full h-full rounded-lg"
                        resizeMode="cover"
                    />
                </View>
                <View className="justify-center ml-3 flex-1 gap-y-1">
                    <Text className="text-white text-sm" numberOfLines={1}>
                        {title}
                    </Text>
                    <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>{username}</Text>
                </View>
                <View className='pt-2'>
                    <Image
                        source={icons.menu}
                        className="w-5 h-5"
                        resizeMode="contain"
                    />
                </View>
            </View>
            {play ? (
                <Video
                    source={{uri:video}}
                    style={{ width: '100%', height: 240, borderRadius: 12 }}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status)=>{
                        if(status.didJustFinish){
                            setPlay(false)
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setPlay(true)}
                    className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
                >
                    <Image source={{uri: thumbnail}}
                           className="w-full h-full rounded-xl mt-3"
                           resizeMode="cover"
                    />
                    <Image source={icons.play}
                           className="w-12 h-12 absolute"
                           resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};
export default VideoCard;