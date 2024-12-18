import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {icons} from '../constants'

export const FormField = ({
    title, value, handleChangeText, otherStyles, placeholder, ...props
                          }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2  ${otherStyles}`}>
            <Text className={"text-base text-gray-100 font-pmedium"}>
                {title}
            </Text>
            <View className={'w-full h-16 px-4 bg-black-200 border-red-500 rounded-2xl focus:border-secondary items-center flex-row'}>
                <TextInput
                    className="text-white font-psemibold text-base flex-1 "
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={'#7b7b8b'}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className={'w-6 h-6 '}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
