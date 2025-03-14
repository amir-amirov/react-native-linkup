import {View, Text, StatusBar, Image, Pressable} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import theme from '../../theme';
import {scale} from '../../utils';
import Button from '../../components/Button/Button';
import {styles} from './styles';

const WelcomeScreen = () => {
  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <StatusBar
        backgroundColor={theme.palette.white}
        barStyle={'dark-content'}
      />
      <View style={styles.container}>
        {/* Welcome Image */}
        <Image
          style={styles.welcomeImage}
          source={require('../../assets/images/welcome.png')}
          resizeMode="contain"
        />

        {/* Title */}
        <View style={{gap: scale(20)}}>
          <Text style={styles.title}>LinkUp!</Text>
          <Text style={styles.punchline}>
            Where every thought finds a home and every image tells a story
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={styles.btn}
            onPress={() => {}}
          />

          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account!</Text>

            <Pressable>
              <Text style={[styles.loginText, {color: theme.palette.primary}]}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default WelcomeScreen;
