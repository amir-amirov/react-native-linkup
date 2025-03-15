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

const LoginScreen = () => {
  const [isLoading, setLoading] = useState(false);

  const navigation = useNavigation<any>();

  const emailRef = useRef('');
  const passwordRef = useRef('');

  const onSubmit = async () => {
    if (!emailRef.current && !passwordRef.current) {
      Alert.alert('Login', 'Please fill all the fields!');
      return;
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await baseService.post('/users/signin', {
        email: emailRef.current.toLowerCase(),
        password: passwordRef.current,
      });
      console.log('Login response: ', response.data);
    } catch (err) {
      console.log('Error: ', err);
    } finally {
      setLoading(false);
    }
  };

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
            autoCapitalize={'none'}
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
          <TouchableOpacity activeOpacity={0.5}>
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
