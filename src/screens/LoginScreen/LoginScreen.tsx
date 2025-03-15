import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import theme from '../../theme';
import BackButton from '../../components/Buttons/BackButton/BackButton';
import {useNavigation} from '@react-navigation/native';
import {scale} from '../../utils';
import Input from '../../components/Input/Input';
import Icon from '../../components/Icon/Icon';
import Button from '../../components/Buttons/Button/Button';
import baseService from '../../services/axios/baseService';
import {useUser} from '../../store/user';

const LoginScreen = () => {
  const {isLoading, setIsAuth, loginUser, setUser} = useUser();

  const navigation = useNavigation<any>();

  const emailRef = useRef('');
  const passwordRef = useRef('');

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', 'Please fill all the fields!');
      return;
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser({
        email: emailRef.current.toLowerCase(),
        password: passwordRef.current,
      });

      if (!!response) {
        setUser(response);
        setIsAuth(true);
      }
    } catch (err: any) {
      console.log('Type of error: ', typeof err);
      Alert.alert(
        'Sorry',
        err.length > 0 && typeof err !== 'string' ? err[0] : err,
      );
      console.log('Login error: ', err);
    }
  };
  // const login = async (values: FieldValues) => {
  //   console.log('values', values);
  //   const { passwordLogin, phone } = values;
  //   const formattedNumber = phone.replace(/\D/g, '');
  //   try {
  //     const res = await loginUser({
  //       phone: formattedNumber,
  //       password: passwordLogin,
  //     });

  //     if (res.email_verified_at) {
  //       await getCourses(1);
  //       await getSurahs();
  //       await getJuzs();
  //       setAuthorize(true);
  //     } else {
  //       await resendValidation(res.email);
  //       navigation.navigate('CodeConfermation');
  //     }
  //   } catch (error: any) {
  //     console.log('Login error', error);
  //     Toast.show({
  //       type: 'info',
  //       position: 'top',
  //       text1: error,
  //     });
  //   }
  // };

  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <StatusBar
        backgroundColor={theme.palette.white}
        barStyle={'dark-content'}
      />
      <View style={styles.container}>
        <BackButton onPress={() => navigation.navigate('Welcome')} />

        {/* Welcome */}
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.inputLabel}>Please login to continue</Text>
          <Input
            icon={
              <Icon name="mail" size={scale(26)} strokeWidth={scale(1.6)} />
            }
            placeholder={'Enter your email'}
            onChangeText={(value: string) => {
              emailRef.current = value;
            }}
            editable={!isLoading}
          />
          <Input
            icon={
              <Icon name="lock" size={scale(26)} strokeWidth={scale(1.6)} />
            }
            placeholder={'Enter your password'}
            onChangeText={(value: string) => {
              passwordRef.current = value;
            }}
            editable={!isLoading}
            secureTextEntry
          />
          <TouchableOpacity disabled={isLoading} activeOpacity={0.5}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>

          <Button
            title="Login"
            loading={isLoading}
            onPress={() => onSubmit()}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Signup')}>
            <Text
              style={[
                styles.footerText,
                {color: theme.palette.primary, fontWeight: '600'},
              ]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: scale(45),
    paddingHorizontal: scale(20),
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.palette.text,
  },
  form: {
    gap: scale(25),
  },
  inputLabel: {
    fontSize: 16,
    color: theme.palette.text,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: '600',
    color: theme.palette.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(5),
  },
  footerText: {
    textAlign: 'center',
    color: theme.palette.text,
    fontSize: 16,
  },
});
