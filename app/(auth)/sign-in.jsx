import {View, Text, ScrollView, Image, Alert, Button} from "react-native";
import React, {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import {FormField} from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import {getCurrentUser, signInAction, signOutAction} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";

const SingIn = () => {
  const {setUser, setIsLogged} = useGlobalContext();

  const [form, setForm] = useState({
      email: '',
      password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setIsSubmitting(true);
    try {
      await signInAction(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      Alert.alert("Success", "Login succeeded");
      router.replace("/home")
    } catch (e) {
      Alert.alert('handleLogin Loi roi: ', e.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className={"bg-primary h-full"}>
      <ScrollView>
        <View className={"w-full justify-center min-h-[83vh] px-4 my-6"}>
          <Image
            source={images.logo}
            className={"w-[115px] h-[35px]"}
            resizeMode="contain"
          />
          <Text
            className={"text-4xl text-white text-semibold font-psemibold mt-10"}
          >
            Login
          </Text>
          <FormField
            title={'Email'}
            value={form.email}
            handleChangeText={(e)=>setForm({
              ...form, email: e
            })}
            otherStyles='mt-7 '
            keyboardType='email-address'
          />
          <FormField
              title={'Password'}
              value={form.password}
              handleChangeText={(e)=>setForm({
                ...form, password: e
              })}
              otherStyles='mt-7 '
          />
          <CustomButton
            title={'Sing In'}
            handlePress={handleLogin}
            containerStyles={"mt-7"}
            isLoading={isSubmitting}
          />
          <View
            className={'justify-center pt-5 flex-row gap-2'}
          >
            <Text className={'text-lg text-gray-100 font-pregular'}>Don't have any account ?</Text>
            <Link href={'/sign-up'} className={'text-lg font-psemibold text-secondary'}>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingIn;
