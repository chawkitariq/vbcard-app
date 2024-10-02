import {useMutation} from '@tanstack/react-query';
import {Formik} from 'formik';
import {View} from 'react-native';
import {
  Button,
  HelperText,
  Portal,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {AuthApiService} from '../../services';
import {useAuthStore} from '../../stores';
import {AuthLoginResponsePayload} from '../../types';
import {useState} from 'react';
import {object, string} from 'yup';

const validationSchema = object().shape({
  email: string()
    .email('Doit être une adresse mail valide')
    .required('Obligatoire'),
  password: string().required('Obligatoire'),
});

const LoginScreen = ({navigation}: any) => {
  const theme = useTheme();

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const {login} = useAuthStore();

  const {
    isPending,
    isError,
    reset,
    mutate: handleLogin,
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: AuthApiService.login,
    onSuccess: ({jwt}: AuthLoginResponsePayload) => {
      login({jwt});
    },
  });

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={validationSchema}
      validateOnChange={true}
      onSubmit={handleLogin}>
      {({handleChange, handleBlur, handleSubmit, errors, touched, values}) => (
        <View
          style={{
            minHeight: '100%',
            justifyContent: 'center',
            padding: 24,
            gap: 16,
          }}>
          <View>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              placeholder="Adresse mail"
              error={!!(errors.email && touched.email)}
            />
            <HelperText
              type="error"
              visible={!!(errors.email && touched.email)}>
              {errors.email}
            </HelperText>
          </View>
          <View>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Mot de passe"
              secureTextEntry={isPasswordHidden}
              error={!!(errors.password && touched.password)}
              right={
                <TextInput.Icon
                  icon={isPasswordHidden ? 'eye' : 'eye-off'}
                  onPress={() => setIsPasswordHidden(s => !s)}
                />
              }
            />
            <HelperText
              type="error"
              visible={!!(errors.password && touched.password)}>
              {errors.password}
            </HelperText>
          </View>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={{alignSelf: 'flex-end', textDecorationLine: 'underline'}}>
            Pas encore inscrit ?
          </Text>
          <Button
            style={{paddingVertical: 16 / 3, borderRadius: 16 / 3}}
            mode="contained"
            onPress={() => handleSubmit()}
            disabled={isPending}
            loading={isPending}>
            Se connecter
          </Button>
          <Portal>
            <Snackbar
              icon="close"
              onIconPress={() => reset()}
              visible={!!isError}
              onDismiss={() => reset()}>
              L'email ou le mot de passe sont invalides
            </Snackbar>
          </Portal>
        </View>
      )}
    </Formik>
  );
};

export default LoginScreen;
