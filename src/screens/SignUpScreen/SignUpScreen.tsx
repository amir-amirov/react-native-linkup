import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import theme from '../../theme';
import BackButton from '../../components/Buttons/BackButton/BackButton';
import {useNavigation} from '@react-navigation/native';
import {scale} from '../../utils';
import Input from '../../components/Input/Input';
import Icon from '../../components/Icon/Icon';
import Button from '../../components/Buttons/Button/Button';
import {useUser} from '../../store/user';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SignUpScreen = () => {
  const {isLoading, setIsAuth, registerUser, setUser} = useUser();

  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert('Registration', 'Please fill all the fields!');
      return;
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser({
        name: nameRef.current,
        email: emailRef.current.toLowerCase(),
        password: passwordRef.current,
      });

      if (!!response) {
        setUser(response);
        setIsAuth(true);
      }
    } catch (err: any) {
      Alert.alert(
        'Sorry',
        err.length > 0 && typeof err !== 'string' ? err[0] : err,
      );
      console.log('Signin error: ', err);
    }
  };

  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <StatusBar
        backgroundColor={theme.palette.white}
        barStyle={'dark-content'}
      />
      <View
        style={[
          styles.container,
          {paddingTop: insets.top > 0 ? scale(10) : scale(20)},
        ]}>
        <BackButton onPress={() => navigation.navigate('Welcome')} />

        {/* Welcome */}
        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.inputLabel}>
            Please fill the details to create a new account
          </Text>
          <Input
            icon={
              <Icon name="user" size={scale(26)} strokeWidth={scale(1.6)} />
            }
            placeholder={'Enter your name'}
            onChangeText={(value: string) => {
              nameRef.current = value;
            }}
            editable={!isLoading}
          />
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
          <Input
            icon={
              <Icon name="lock" size={scale(26)} strokeWidth={scale(1.6)} />
            }
            placeholder={'Confirm your password'}
            onChangeText={(value: string) => {
              passwordRef.current = value;
            }}
            editable={!isLoading}
            secureTextEntry
          />

          <Button
            title="Sign Up"
            loading={isLoading}
            onPress={() => onSubmit()}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={[
                styles.footerText,
                {color: theme.palette.primary, fontWeight: '600'},
              ]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUpScreen;

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
