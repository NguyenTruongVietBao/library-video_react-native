import {View, Text, ScrollView, Image, Alert} from "react-native";
import React, {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import {FormField} from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import {createUserAction} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {setUser, setIsLogged} = useGlobalContext();

    const handleRegister = async () => {
        if (form.username === '' || form.password === '' || form.email === '') {
            Alert.alert('Error', 'Please enter a username and password');
        }
        setIsSubmitting(true);
        try {
            const result = await createUserAction(
                form.email,
                form.password,
                form.username
            );
            setUser(result)
            setIsLogged(true)
            Alert.alert("Success", "Registration successfully");
            router.replace('/home')
        } catch (e) {
            Alert.alert('handleRegister Loi roi: ', e.message)
        } finally {
            setIsSubmitting(false)
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
                        Register
                    </Text>
                    <FormField
                        title={'Username'}
                        value={form.username}
                        handleChangeText={(e)=>setForm({
                            ...form, username: e
                        })}
                        otherStyles='mt-10'
                    />
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
                        title={'Sing Up'}
                        handlePress={handleRegister}
                        containerStyles={"mt-7"}
                        isLoading={isSubmitting}
                    />
                    <View
                        className={'justify-center pt-5 flex-row gap-2'}
                    >
                        <Text className={'text-lg text-gray-100 font-pregular'}>Already account ?</Text>
                        <Link href={'/sign-in'} className={'text-lg font-psemibold text-secondary'}>Sign In</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
