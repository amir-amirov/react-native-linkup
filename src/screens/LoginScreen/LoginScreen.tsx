import {
  Alert,
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
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginFormData, LoginSchema} from './scheme';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';

const LoginScreen = () => {
  const {t} = useTranslation();
  const {isLoading, setIsAuth, loginUser, setUser} = useUser();

  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

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
          <Text style={styles.welcomeText}>{t('hey')},</Text>
          <Text style={styles.welcomeText}>{t('welcome_back')}</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.inputLabel}>{t('login_to_continue')}</Text>
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
                  placeholder={t('email')}
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
                  ref={passwordInputRef}
                  value={value}
                  onChangeText={onChange}
                  placeholder={t('password')}
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
          {/* <TouchableOpacity disabled={isLoading} activeOpacity={0.5}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity> */}

          <Button
            title={t('login')}
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('no_account')}</Text>
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Signup')}>
            <Text
              style={[
                styles.footerText,
                {color: theme.palette.primary, fontWeight: '600'},
              ]}>
              {t('sign_up')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;
