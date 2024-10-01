import {FieldArray, Formik, FormikProps} from 'formik';
import React, {useEffect, useRef} from 'react';
import {useCallback, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {
  Appbar,
  Button,
  IconButton,
  List,
  Menu,
  TextInput,
  useTheme,
} from 'react-native-paper';

const TYPES = ['mobile', 'home', 'work', 'other'];

const initialValues = {
  namePrefix: '',
  firstName: '',
  middleName: '',
  lastName: '',
  nameSuffix: '',
  nickName: '',
  company: '',
  companyDepartement: '',
  companyTitle: '',
  tels: [
    {
      value: '',
      label: 'Home',
    },
  ],
  emails: [
    {
      value: '',
      label: 'Home',
    },
  ],
  adrs: [],
  urls: [],
  socialProfiles: [],
};

function ContactCreateScreen({route, navigation}: any) {
  const theme = useTheme();

  const [isExpanded, setIsExpanded] = useState(true);
  const [isLabelMenuVisible, setIsLabelMenuVisible] = useState<{
    [key: string]: boolean;
  }>();

  const handleCreate = useCallback((data: any) => {
    console.log(data);
  }, []);

  const formRef = useRef<FormikProps<typeof initialValues>>(null);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Nouveau Contact" />
          <Button onPress={() => formRef?.current?.submitForm()}>Ok</Button>
        </Appbar.Header>
      ),
    });
  }, [navigation, formRef]);

  return (
    <ScrollView
      style={{
        minHeight: '100%',
      }}>
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validateOnChange={true}
        onSubmit={handleCreate}>
        {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
          <View style={{padding: 16 * 1.5}}>
            <List.Section>
              <Pressable
                style={{
                  aspectRatio: 16 / 9,
                  borderRadius: theme.roundness,
                  backgroundColor: theme.colors.surfaceVariant,
                }}></Pressable>
            </List.Section>

            <List.Section title="Personnel" style={{gap: 16}}>
              {isExpanded && (
                <TextInput
                  onChangeText={handleChange('namePrefix')}
                  onBlur={handleBlur('namePrefix')}
                  value={values.namePrefix}
                  label="Prefix"
                />
              )}
              <TextInput
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                label="Prénom"
              />
              {isExpanded && (
                <TextInput
                  onChangeText={handleChange('middleName')}
                  onBlur={handleBlur('middleName')}
                  value={values.middleName}
                  label="Deuxième prénom"
                />
              )}
              <TextInput
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                label="Nom"
              />
              {isExpanded && (
                <>
                  <TextInput
                    onChangeText={handleChange('nameSuffix')}
                    onBlur={handleBlur('nameSuffix')}
                    value={values.nameSuffix}
                    label="Suffixe"
                  />
                  <TextInput
                    onChangeText={handleChange('nickName')}
                    onBlur={handleBlur('nickName')}
                    value={values.nickName}
                    label="Surnom"
                  />
                </>
              )}
            </List.Section>

            <List.Section title="Entreprise" style={{gap: 16}}>
              <TextInput
                onChangeText={handleChange('company')}
                onBlur={handleBlur('company')}
                value={values.company}
                label="Entreprise"
              />
              <TextInput
                onChangeText={handleChange('companyDepartement')}
                onBlur={handleBlur('companyDepartement')}
                value={values.companyDepartement}
                label="Département"
              />
              <TextInput
                onChangeText={handleChange('companyTitle')}
                onBlur={handleBlur('companyTitle')}
                value={values.companyTitle}
                label="Poste"
              />
            </List.Section>

            <FieldArray name="tels">
              {({remove, push}) => (
                <List.Section title="Téléphone" style={{gap: 16}}>
                  {values.tels.map((tel, index) => (
                    <View key={index} style={{gap: 16}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 16,
                        }}>
                        <TextInput
                          style={{flex: 1, flexGrow: 1}}
                          onChangeText={handleChange(`tels.${index}.value`)}
                          onBlur={handleBlur(`tels.${index}.value`)}
                          value={tel.value}
                          label="Téléphone"
                        />
                        <IconButton
                          size={16}
                          mode="contained-tonal"
                          icon="close"
                          onPress={() => remove(index)}
                          disabled={values.tels.length <= 1}
                        />
                      </View>
                      <Menu
                        visible={!!isLabelMenuVisible?.[`tels.${index}`]}
                        onDismiss={() =>
                          setIsLabelMenuVisible({
                            [`tels.${index}`]: false,
                          })
                        }
                        anchor={
                          <Pressable
                            onPress={() => {
                              setIsLabelMenuVisible({
                                [`tels.${index}`]: true,
                              });
                            }}>
                            <TextInput
                              style={{width: '50%'}}
                              label="Label"
                              editable={false}
                              value={
                                tel.label.charAt(0).toUpperCase() +
                                tel.label.slice(1)
                              }
                              right={<TextInput.Icon icon="chevron-down" />}
                            />
                          </Pressable>
                        }>
                        {TYPES.map(type => (
                          <Menu.Item
                            onPress={() => {
                              setFieldValue(`tels.${index}.label`, type);
                              setIsLabelMenuVisible(undefined);
                            }}
                            title={type.charAt(0).toUpperCase() + type.slice(1)}
                          />
                        ))}
                      </Menu>
                    </View>
                  ))}
                </List.Section>
              )}
            </FieldArray>

            <FieldArray name="emails">
              {({remove, push}) => (
                <List.Section title="Adresse mail" style={{gap: 16}}>
                  {values.emails.map((email, index) => (
                    <View key={index} style={{gap: 16}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 16,
                        }}>
                        <TextInput
                          style={{flex: 1, flexGrow: 1}}
                          onChangeText={handleChange(`emails.${index}.value`)}
                          onBlur={handleBlur(`emails.${index}.value`)}
                          value={email.value}
                          label="Adresse mail"
                        />
                        <IconButton
                          size={16}
                          mode="contained-tonal"
                          icon="close"
                          onPress={() => remove(index)}
                          disabled={values.emails.length <= 1}
                        />
                      </View>
                      <Menu
                        visible={!!isLabelMenuVisible?.[`emails.${index}`]}
                        onDismiss={() =>
                          setIsLabelMenuVisible({
                            [`emails.${index}`]: false,
                          })
                        }
                        anchor={
                          <Pressable
                            onPress={() => {
                              setIsLabelMenuVisible({
                                [`emails.${index}`]: true,
                              });
                            }}>
                            <TextInput
                              style={{width: '50%'}}
                              label="Label"
                              editable={false}
                              value={
                                email.label.charAt(0).toUpperCase() +
                                email.label.slice(1)
                              }
                              right={<TextInput.Icon icon="chevron-down" />}
                            />
                          </Pressable>
                        }>
                        {TYPES.map(type => (
                          <Menu.Item
                            onPress={() => {
                              setFieldValue(`emails.${index}.label`, type);
                              setIsLabelMenuVisible(undefined);
                            }}
                            title={type.charAt(0).toUpperCase() + type.slice(1)}
                          />
                        ))}
                      </Menu>
                    </View>
                  ))}
                </List.Section>
              )}
            </FieldArray>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

export default ContactCreateScreen;
