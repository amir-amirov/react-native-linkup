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
import {useTranslation} from 'react-i18next';

const SignUpScreen = () => {
  const {t} = useTranslation();

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
        t('sorry'),
        err.length > 0 && typeof err !== 'string' ? err[0] : err,
      );
      console.log(t('something_wrong'), err);
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
            <Text style={styles.welcomeText}>{t('lets')}</Text>
            <Text style={styles.welcomeText}>{t('get_started')}</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.inputLabel}>{t('signin_details')}</Text>
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
                    placeholder={t('name')}
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
                    placeholder={t('email')}
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
                    placeholder={t('confirm_password')}
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
              title={t('sign_up')}
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('already_account')}</Text>
            <TouchableOpacity
              disabled={isLoading}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Login')}>
              <Text
                style={[
                  styles.footerText,
                  {color: theme.palette.primary, fontWeight: '600'},
                ]}>
                {t('login')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default SignUpScreen;
