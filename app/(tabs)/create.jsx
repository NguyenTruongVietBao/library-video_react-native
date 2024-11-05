import {View, Text, Alert, TouchableOpacity, ScrollView, Image} from "react-native";
import {useGlobalContext} from "../../context/GlobalProvider";
import {router} from "expo-router";
import {icons} from "../../constants";
import {SafeAreaView} from "react-native-safe-area-context";
import {createVideo} from "../../lib/appwrite";
import {FormField} from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {useState} from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {ResizeMode, Video} from "expo-av";

const Create = () => {
    const { user } = useGlobalContext();
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
    });
    const openPicker = async (selectType) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:
                selectType === "image"
                    ? ImagePicker.MediaTypeOptions.Images
                    : ImagePicker.MediaTypeOptions.Videos,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            if (selectType === "image") {
                setForm({ ...form, thumbnail: result.assets[0] });
            }
            if (selectType === "video") {
                setForm({ ...form, video: result.assets[0] });
            }
        }
    };
    const handleCreate = async () => {
        if (!form.prompt || !form.title || !form.video || !form.thumbnail) {
            return Alert.alert("Please fill all the fields");
        }
        setUploading(true);
        try {
            await createVideo({
                ...form,
                userId: user.$id,
            });
            Alert.alert("Successfully, Post uploaded successfully");
            router.push("/home");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setForm({
                title: "",
                video: null,
                thumbnail: null,
                prompt: "",
            });
            setUploading(false); // Set to false after upload completes.
        }
    };
  return (
      <SafeAreaView className="bg-primary h-full">
          <ScrollView className="px-4 my-6">
              <View className="w-full ">
                  <Text className="text-white font-psemibold text-2xl">
                      Upload Video
                  </Text>
                  <FormField
                      title="Video Title"
                      value={form.title}
                      placeHolder="Enter your video title"
                      handleChangeText={(e) => setForm({ ...form, title: e })}
                      otherStyles='mt-10'
                  />
                  <View className="space-y-2 mt-5">
                      <Text className="text-gray-100 text-base font-pmedium">Upload Video</Text>
                      <TouchableOpacity onPress={() => openPicker("video")}>
                          {form.video ? (
                              <Video
                                  source={{ uri: form.video.uri }}
                                  style={{ width: '100%', height: 256, borderRadius: 16 }}
                                  resizeMode={ResizeMode.COVER}
                              />
                          ) : (
                              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl  justify-center items-center">
                                  <View className={'w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'}>
                                      <Image
                                          source={icons.upload}
                                          resizeMode={'contain'}
                                          className={'w-5 h-5'}
                                      />
                                  </View>
                              </View>
                          )}
                      </TouchableOpacity>
                  </View>
                  <View className="space-y-2 mt-5">
                      <Text className="text-gray-100 text-base font-pmedium">Upload Thumbnail</Text>
                      <TouchableOpacity onPress={() => openPicker("image")}>
                          {form.thumbnail ? (
                              <Image
                                  source={{ uri: form.thumbnail.uri }}
                                  className="w-full h-64 rounded-2xl"
                                  resizeMode={'cover'}
                              />
                          ) : (
                              <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl flex flex-row items-center justify-center">
                                  <Image
                                      source={icons.upload}
                                      resizeMode={'contain'}
                                      className={'w-5 h-5'}
                                  />
                                  <Text className="text-sm text-gray-100 font-pmedium">
                                      Upload Image
                                  </Text>
                              </View>
                          )}
                      </TouchableOpacity>
                  </View>
                  <FormField
                      title={'Prompt Title'}
                      value={form.prompt}
                      placeHolder="Enter your prompt"
                      handleChangeText={(e) => setForm({...form, prompt: e })}
                      otherStyles={'mt-5'}
                  />
                  <CustomButton
                      title="Submit & Publish"
                      handlePress={handleCreate}
                      isLoading={uploading}
                      containerStyles={'mt-5'}
                  />
              </View>
          </ScrollView>
      </SafeAreaView>
  );
};

export default Create;
