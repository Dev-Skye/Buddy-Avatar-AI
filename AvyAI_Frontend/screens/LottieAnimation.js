import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function LottieAnimation({navigation}) {
  // Size of each animation
  const animSize = 100;
  const gap = 20; // space between animations in final grid

  // Initial positions (off-screen corners)
  const anim1 = useRef(new Animated.ValueXY({ x: -150, y: -150 })).current; // top-left
  const anim2 = useRef(new Animated.ValueXY({ x: width + 150, y: -150 })).current; // top-right
  const anim3 = useRef(new Animated.ValueXY({ x: -150, y: height + 150 })).current; // bottom-left
  const anim4 = useRef(new Animated.ValueXY({ x: width + 150, y: height + 150 })).current; // bottom-right

  // Final positions (2x2 grid around center)
  const centerX = width / 2 - animSize / 2;
  const centerY = height / 2 - animSize / 2;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(anim1, { toValue: { x: centerX - animSize - gap / 2, y: centerY - animSize - gap / 2 }, duration: 500, useNativeDriver: false }),
      Animated.delay(1000),
      Animated.timing(anim2, { toValue: { x: centerX + gap / 2, y: centerY - animSize - gap / 2 }, duration: 500, useNativeDriver: false }),
      Animated.delay(1000),
      Animated.timing(anim3, { toValue: { x: centerX - animSize - gap / 2, y: centerY + gap / 2 }, duration: 500, useNativeDriver: false }),
      Animated.delay(1000),
      Animated.timing(anim4, { toValue: { x: centerX + gap / 2, y: centerY + gap / 2 }, duration: 500, useNativeDriver: false }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.animContainer}>
            <Animated.View style={{ position: 'absolute', transform: anim1.getTranslateTransform() }}>
                <LottieView source={require('../assets/lottie/laughing.json')} autoPlay loop style={{ width: 140, height: 140 }} />
            </Animated.View>
            <Animated.View style={{ position: 'absolute', transform: anim2.getTranslateTransform() }}>
                <LottieView source={require('../assets/lottie/heart.json')} autoPlay loop style={{ width: 120, height: 120 }} />
            </Animated.View>
            <Animated.View style={{ position: 'absolute', transform: anim3.getTranslateTransform() }}>
                <LottieView source={require('../assets/lottie/head.json')} autoPlay loop style={{ width: 260, height: 260, marginTop: -20 }} />
            </Animated.View>
            <Animated.View style={{ position: 'absolute', transform: anim4.getTranslateTransform() }}>
                <LottieView source={require('../assets/lottie/cool.json')} autoPlay loop style={{ width: 150, height: 150, marginTop: 35 }} />
            </Animated.View>
        </View>
      

        <View style={styles.textContainer}>
            <Text style={styles.text}>Share Your Feelings!</Text>
        <Text style={styles.text2}>When you need a personal companion who reads your emotions, listens and cares for you.  
            I am always here to lift you up. Let's talk, laugh and try something new!</Text>
                
                    
                    <View style={{height: 50, width: 350, marginTop: 40, marginLeft: 50}}>
                        <TouchableOpacity onPress={() => navigation.navigate("Status")}>
                            {/* Chat */}
                            <View style={{height: 55, width: 300, borderRadius: 50, backgroundColor: '#ffbb00ff', marginTop: 5,}}>
                                <Text style={{marginTop: 15, textAlign: 'center', fontSize: 18, fontFamily: 'Poppins-Bold'}}>Let's Talk</Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>
        </View>
        

    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00025cff',
        justifyContent: 'center'
    },
   text:{
        marginTop: 40,
        fontSize: 30,
        fontFamily: 'Poppins-ExtraBold',
        color: '#fff',
        marginBottom: -7
    },
    text2:{
        marginBottom: 10,
        textAlign:'center',
        fontSize: 13,
        fontFamily: 'Poppins-Light',
        fontWeight: 100,
        color: '#fff',  
    },
    animContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginRight: 200, // animations at top
    alignItems: 'center',
    marginBottom: 100,
    marginTop: -100 // move down slightly if needed
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start', // text below animations
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 150,
  },
})