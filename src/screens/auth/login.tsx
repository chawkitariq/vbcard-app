import {useMutation} from '@tanstack/react-query';
import {Formik} from 'formik';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {AuthApiService} from '../../services';
import {useAuthStore} from '../../stores';
import {AuthLoginResponsePayload} from '../../types';
import {useState} from 'react';

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
    <Formik initialValues={{email: '', password: ''}} onSubmit={handleLogin}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View
          style={{
            minHeight: '100%',
            justifyContent: 'center',
            padding: 24,
            gap: 16,
          }}>
          <TextInput
            mode="outlined"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
            placeholder="Adresse mail"
          />
          <TextInput
            mode="outlined"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="Mot de passe"
            secureTextEntry={isPasswordHidden}
            right={
              <TextInput.Icon
                icon={isPasswordHidden ? 'eye' : 'eye-off'}
                onPress={() => setIsPasswordHidden(s => !s)}
              />
            }
          />
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
