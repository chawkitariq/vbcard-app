import {useMutation} from '@tanstack/react-query';
import {Formik} from 'formik';
import {Text, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
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

const LoginScreen = (props: any) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const {login} = useAuthStore();

  const {isPending, mutate: handleLogin} = useMutation({
    mutationKey: ['login'],
    mutationFn: AuthApiService.login,
    onSuccess: (payload: AuthLoginResponsePayload) => {
      login(payload);
    },
    onError: error => console.error(error),
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
              mode="outlined"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              placeholder="Adresse mail"
              error={!!(errors.email && touched.email)}
            />
            {errors.email && touched.email && (
              <HelperText type="error">{errors.email}</HelperText>
            )}
          </View>
          <View>
            <TextInput
              mode="outlined"
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
            {errors.password && touched.password && (
              <HelperText type="error">{errors.password}</HelperText>
            )}
          </View>
          <Button
            style={{paddingVertical: 16 / 3, borderRadius: 16 / 3}}
            mode="contained"
            onPress={() => handleSubmit()}
            disabled={isPending}
            loading={isPending}>
            Connexion
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default LoginScreen;
