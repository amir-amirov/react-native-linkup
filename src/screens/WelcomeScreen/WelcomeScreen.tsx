import {View, Text, StatusBar, Image, Pressable} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import theme from '../../theme';
import {scale} from '../../utils';
import Button from '../../components/Buttons/Button/Button';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const WelcomeScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<any>();

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
          <Text style={styles.title}>Stratum!</Text>
          <Text style={styles.punchline}>{t('moto')}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title={t('getting_started')}
            buttonStyle={styles.btn}
            onPress={() => navigation.navigate('Signup')}
          />

          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>{t('already_account')}</Text>

            <Pressable
              onPress={() => navigation.navigate('Login')}
              hitSlop={scale(10)}>
              <Text style={[styles.loginText, {color: theme.palette.primary}]}>
                {t('login')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default WelcomeScreen;
