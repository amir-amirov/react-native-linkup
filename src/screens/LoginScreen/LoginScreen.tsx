import {
  Alert,
  StatusBar,
  StyleSheet,
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
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginFormData, LoginSchema} from './scheme';

const LoginScreen = () => {
  const {isLoading, setIsAuth, loginUser, setUser} = useUser();

  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver<LoginFormData>(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser({
        email: data.email.toLowerCase(),
        password: data.password,
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
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.inputLabel}>Please login to continue</Text>
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
                  value={value}
                  placeholder={'Enter your email'}
                  onChangeText={onChange}
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
                  placeholder={'Enter your password'}
                  value={value}
                  onChangeText={onChange}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit(onSubmit)}
                  editable={!isLoading}
                  secureTextEntry
                />
              )}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </View>
          <TouchableOpacity disabled={isLoading} activeOpacity={0.5}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>

          <Button
            title="Login"
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
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
  inputView: {
    gap: scale(5),
  },
  error: {
    color: theme.palette.rose,
    fontSize: 12,
    marginLeft: scale(15),
  },
});
