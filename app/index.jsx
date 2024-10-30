import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Hello React Native</Text>
      <StatusBar style="auto" />
      <Link href="/profile">Go to Profile</Link>
      <Link href="/about">Go to About</Link>
    </View>
  );
}
