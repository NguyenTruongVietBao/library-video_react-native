import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Library Video</Text>
      <StatusBar style="auto" />
      <Link href="/home">Go to Home</Link>
    </View>
  );
}
