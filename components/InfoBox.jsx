import { View, Text } from "react-native";
import React from "react";

export default function InfoBox({ title, containerStyles, titleStyles,subtitle }) {
    return (
        <View className={containerStyles}>
            <Text className={titleStyles}>{title}</Text>
            <Text className="text-pregular text-gray-400">{subtitle}</Text>
        </View>
    );
}