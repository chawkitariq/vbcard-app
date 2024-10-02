import {useMutation} from '@tanstack/react-query';
import {Formik, FormikProps} from 'formik';
import {Alert, Text, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {AuthApiService} from '../../services';
import {useCallback, useRef, useState} from 'react';
import {object, ref, string} from 'yup';

const initialValues = {email: '', password: '', passwordConfirmation: ''};

const validationSchema = object().shape({
  email: string().email('Adresse mail invalide').required('Obligatoire'),
  password: string().required('Obligatoire'),
  passwordConfirmation: string()
    .required('Obligatoire')
    .oneOf([ref('password')], 'Les mots de passe ne correspondent pas'),
});

const RegisterScreen = ({navigation}: any) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const formRef = useRef<FormikProps<typeof initialValues>>(null);

  const {isPending, mutate: handleRegister} = useMutation({
    mutationKey: ['register'],
    mutationFn: AuthApiService.register,
    onSuccess: () => {
      formRef?.current?.resetForm();
      Alert.alert('Inscription', 'Inscription réussi', [
        {onPress: () => navigation.navigate('Login')},
      ]);
    },
    onError: error => console.error(error),
  });

  const handleSubmit = useCallback(
    ({passwordConfirmation, ...payload}: typeof initialValues) => {
      handleRegister(payload);
    },
    [handleRegister],
  );

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={true}
      onSubmit={handleSubmit}>
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
          <View>
            <TextInput
              onChangeText={handleChange('passwordConfirmation')}
              onBlur={handleBlur('passwordConfirmation')}
              value={values.passwordConfirmation}
              placeholder="Confirmation du mot de passe"
              secureTextEntry={isPasswordHidden}
              error={
                !!(errors.passwordConfirmation && touched.passwordConfirmation)
              }
              right={
                <TextInput.Icon
                  icon={isPasswordHidden ? 'eye' : 'eye-off'}
                  onPress={() => setIsPasswordHidden(s => !s)}
                />
              }
            />
            <HelperText
              type="error"
              visible={
                !!(errors.passwordConfirmation && touched.passwordConfirmation)
              }>
              {errors.passwordConfirmation}
            </HelperText>
          </View>
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{alignSelf: 'flex-end', textDecorationLine: 'underline'}}>
            Vous êtes déjâ inscrit ?
          </Text>
          <Button
            style={{paddingVertical: 16 / 3, borderRadius: 16 / 3}}
            mode="contained"
            onPress={() => handleSubmit()}
            disabled={isPending}
            loading={isPending}>
            S'inscrire
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default RegisterScreen;
