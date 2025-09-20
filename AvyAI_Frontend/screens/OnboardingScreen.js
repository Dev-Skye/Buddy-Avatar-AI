import React, {useRef, useEffect} from "react";
import {View, Text,Image, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import LottieView from "lottie-react-native";
import {Ionicons} from "@expo/vector-icons";

export default function OnboardingScreen({navigation}){

    
 return(
    <View style={styles.container}>
            <View>
                <Image
                source={require('../assets/images/avatarshort.png')}
                style={styles.imagelong}
                resizeMode="cover"
            />
            </View>
            

            <Text style={styles.text}>Hi, I am Buddy!</Text>
            <Text style={styles.text2}>Your Digital Friend</Text>
    
            <TouchableOpacity onPress={() => navigation.navigate("Lottie")}>
                {/* //Lottie  */}
                <View style={{height: 70, width: 70, borderRadius: 50, backgroundColor: '#fff', marginTop: 30}}>
                <Ionicons name="arrow-forward" size={20} color='#000' style={{paddingTop: 25, paddingLeft: 25}}/>
                </View>
            </TouchableOpacity>
        
    </View>
 )   
}

const AVATAR_SIZE= 150;


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00025cff'
    },
    baseText:{
        color: '#fff',
        fontSize: 15,
    },
    imagelong:{
        height: 600,
        width: 600,
        marginTop: -30,
    },
    text:{
        marginTop: -40,
        fontFamily: 'Poppins-Black',
        fontSize: 40,
        marginBottom: -19,
        color: '#fff'
    },
    text2:{
        marginBottom: 10,
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: '#fff',
    
    },
    emoji:{
        position: 'absolute'
    },
    topRight:{
        top: '20%',
        left: '69%'
    },
    bottomLeft:{
        top: '60%',
        left: '18%'
    }

})