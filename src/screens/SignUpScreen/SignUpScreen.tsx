import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
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
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {SignUpFormData, signUpSchema} from './scheme';
import {styles} from './styles';

const SignUpScreen = () => {
  const {isLoading, setIsAuth, registerUser, setUser} = useUser();

  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver<SignUpFormData>(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await registerUser({
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
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
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
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
            <View style={styles.inputView}>
              <Controller
                control={control}
                name="name"
                render={({field: {onChange, value}}) => (
                  <Input
                    icon={
                      <Icon
                        name="user"
                        size={scale(26)}
                        strokeWidth={scale(1.6)}
                      />
                    }
                    value={value}
                    onChangeText={onChange}
                    placeholder={'Enter your name'}
                    autoCorrect={false}
                    dataDetectorTypes="none"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => emailInputRef.current?.focus()}
                    editable={!isLoading}
                  />
                )}
              />
              {errors.name && (
                <Text style={styles.error}>{errors.name.message}</Text>
              )}
            </View>
            <View style={styles.inputView}>
              <Controller
                control={control}
                name="email"
                render={({field: {onChange, value}}) => (
                  <Input
                    icon={
                      <Icon
                        name="mail"
                        size={scale(26)}
                        strokeWidth={scale(1.6)}
                      />
                    }
                    ref={emailInputRef}
                    value={value}
                    onChangeText={onChange}
                    placeholder={'Enter your email'}
                    autoCorrect={false}
                    dataDetectorTypes="none"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    editable={!isLoading}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}
            </View>
            <View style={styles.inputView}>
              <Controller
                control={control}
                name="password"
                render={({field: {onChange, value}}) => (
                  <Input
                    icon={
                      <Icon
                        name="lock"
                        size={scale(26)}
                        strokeWidth={scale(1.6)}
                      />
                    }
                    ref={passwordInputRef}
                    value={value}
                    onChangeText={onChange}
                    placeholder={'Enter your password'}
                    autoCorrect={false}
                    dataDetectorTypes="none"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() =>
                      confirmPasswordInputRef.current?.focus()
                    }
                    editable={!isLoading}
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
            </View>
            <View style={styles.inputView}>
              <Controller
                control={control}
                name="confirmPassword"
                render={({field: {onChange, value}}) => (
                  <Input
                    icon={
                      <Icon
                        name="lock"
                        size={scale(26)}
                        strokeWidth={scale(1.6)}
                      />
                    }
                    ref={confirmPasswordInputRef}
                    value={value}
                    onChangeText={onChange}
                    placeholder={'Confirm your password'}
                    autoCorrect={false}
                    dataDetectorTypes="none"
                    returnKeyType="done"
                    blurOnSubmit={false}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    editable={!isLoading}
                    secureTextEntry
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text style={styles.error}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            <Button
              title="Sign Up"
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
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
      </ScrollView>
    </ScreenWrapper>
  );
};

export default SignUpScreen;
