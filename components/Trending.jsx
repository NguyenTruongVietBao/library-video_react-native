import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Image,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons, images } from "../constants";
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
    0: { scale: 0.9 },
    1: { scale: 1.1 },
};

const zoomOut = {
    0: { scale: 1.1 },
    1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false);
    return (
        <Animatable.View
            className="mr-5 my-4 border-2 rounded-[36px] p-1"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            style={{borderColor: activeItem === item.$id ? "#FF9C01":"#161622"}}
            duration={500}
        >
            {play ? (

                <Video
                    source={{uri:item.video}}
                    className='w-52 h-72 bg-white/10 rounded-[36px]'
                    style={{ width: 208, height: 288, borderRadius: 36, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
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
                    className="justify-center items-center  relative"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={images.thumbnail}
                        // className="w-52 h-72 rounded-[36px] overflow-hidden shadow-lg shadow-black/40"
                        style={{
                            width: 208,
                            height: 288,
                            borderRadius: 36,
                            overflow: 'hidden',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.4,
                            shadowRadius: 4,
                            elevation: 8, // for Android shadow support
                        }}
                        resizeMode="cover"
                    />
                    <Image
                        source={icons.play}
                        className="absolute w-12 h-12"
                        resizeMode="contain"
                    />
                </TouchableOpacity>

            )}
        </Animatable.View>
    );
};

export default function Trending({ posts }) {
    const [activeItem, setActiveItem] = useState(posts[1]);

    const viewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            contentOffset={{ x: 170 }}
            horizontal
        />
    );
}

