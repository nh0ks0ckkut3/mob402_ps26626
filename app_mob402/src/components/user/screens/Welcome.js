import React from 'react';
import { WelcomeStyles } from '../styles/WelcomeStyles';
import {
    View,
    SafeAreaView,
    Image
} from 'react-native';

const Welcome = (props) => {
    const navigation = props.navigation
    var goToApp = setInterval(function() {
        navigation.navigate("Onboarding");
        if(true){
            clearInterval(goToApp);
        }
    }, 2000)
    return (
        <SafeAreaView style={WelcomeStyles.container}>
            <View style={WelcomeStyles.div_logo}>
                <Image source={require('../../../media/images/logo_zero5.png')} />
            </View>
            
        </SafeAreaView>

    );
}

export default Welcome;