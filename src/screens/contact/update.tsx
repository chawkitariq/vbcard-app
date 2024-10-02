import {useMutation, useQuery} from '@tanstack/react-query';
import {FieldArray, Formik, FormikProps} from 'formik';
import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {useCallback, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {
  Appbar,
  Button,
  List,
  Menu,
  TextInput,
  useTheme,
} from 'react-native-paper';
import vCard from 'vcf';
import {ContactApiService} from '../../services';

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
  note: '',
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
  adrs: [
    {
      value: '',
      label: 'Home',
    },
  ],
  urls: [
    {
      value: '',
    },
  ],
  socialProfiles: [
    {
      value: '',
      label: 'Home',
    },
  ],
};

function ContactUpdateScreen({route, navigation}: any) {
  const {contactId} = route.params;

  useLayoutEffect(() => {
    if (!contactId) {
      navigation.goBack();
    }
  }, [contactId]);

  const {data} = useQuery({
    queryKey: ['contacts', contactId],
    queryFn: () => ContactApiService.findOne(contactId),
    enabled: !!contactId,
  });

  const theme = useTheme();

  const [isShowMore, setIsShowMore] = useState(false);

  const [isLabelMenuVisible, setIsLabelMenuVisible] = useState<{
    [key: string]: boolean;
  }>();

  const {isPending, mutate: handleCreate} = useMutation({
    mutationKey: ['contacts'],
    mutationFn: ContactApiService.create,
    onSuccess: () => {
      navigation.goBack();
    },
    onError: error => console.error(error),
  });

  const handleSubmit = useCallback(
    (data: typeof initialValues) => {
      const vcard = new vCard();
      vcard
        .add('version', '4.0')
        .add('fn', `${data.firstName} ${data.lastName}`)
        .add('org', data.company)
        .add('title', data.companyTitle)
        .add('note', data.note);

      for (const tel of data.tels) {
        vcard.add('tel', tel.value, {type: tel.label});
      }

      for (const email of data.emails) {
        vcard.add('email', email.value, {type: email.label});
      }

      for (const adr of data.adrs) {
        vcard.add('adr', adr.value, {type: adr.label});
      }

      for (const socialProfile of data.socialProfiles) {
        vcard.add('socialProfile', socialProfile.value, {
          type: socialProfile.label,
        });
      }

      for (const url of data.urls) {
        vcard.add('url', url.value);
      }

      handleCreate({vcard: vcard.toString()});
    },
    [handleCreate],
  );

  const formRef = useRef<FormikProps<typeof initialValues>>(null);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Appbar.Header>
          <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
          <Appbar.Content title="Edition Contact" />
          <Button
            mode="contained"
            onPress={() => formRef?.current?.submitForm()}>
            Ok
          </Button>
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => navigation.goBack()}
          />
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
        onSubmit={handleSubmit}>
        {({handleChange, handleBlur, setFieldValue, values}) => (
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
              {isShowMore && (
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
              {isShowMore && (
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
              {isShowMore && (
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
              {isShowMore && (
                <>
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
                </>
              )}
            </List.Section>

            <FieldArray name="tels">
              {({remove, push}) => (
                <List.Section title="Téléphone" style={{gap: 16}}>
                  {values.tels.map((tel, index) => (
                    <View key={index} style={{gap: 16}}>
                      <TextInput
                        style={{flex: 1, flexGrow: 1}}
                        onChangeText={handleChange(`tels.${index}.value`)}
                        onBlur={handleBlur(`tels.${index}.value`)}
                        value={tel.value}
                        label="Téléphone"
                      />
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
                      <TextInput
                        style={{flex: 1, flexGrow: 1}}
                        onChangeText={handleChange(`emails.${index}.value`)}
                        onBlur={handleBlur(`emails.${index}.value`)}
                        value={email.value}
                        label="Adresse mail"
                      />
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

            {!isShowMore && (
              <Button onPress={() => setIsShowMore(true)}>Afficher tout</Button>
            )}

            {isShowMore && (
              <>
                <FieldArray name="adrs">
                  {({remove, push}) => (
                    <List.Section title="Adresses" style={{gap: 16}}>
                      {values.adrs.map((adr, index) => (
                        <View key={index} style={{gap: 16}}>
                          <TextInput
                            style={{flex: 1, flexGrow: 1}}
                            onChangeText={handleChange(`adrs.${index}.value`)}
                            onBlur={handleBlur(`adrs.${index}.value`)}
                            value={adr.value}
                            label="Boîte postale, Adresse étendue, Nom de rue, Ville, Région (ou état/province), Code postal, Pays"
                          />
                          <Menu
                            visible={!!isLabelMenuVisible?.[`adrs.${index}`]}
                            onDismiss={() =>
                              setIsLabelMenuVisible({
                                [`adrs.${index}`]: false,
                              })
                            }
                            anchor={
                              <Pressable
                                onPress={() => {
                                  setIsLabelMenuVisible({
                                    [`adrs.${index}`]: true,
                                  });
                                }}>
                                <TextInput
                                  style={{width: '50%'}}
                                  label="Label"
                                  editable={false}
                                  value={
                                    adr.label.charAt(0).toUpperCase() +
                                    adr.label.slice(1)
                                  }
                                  right={<TextInput.Icon icon="chevron-down" />}
                                />
                              </Pressable>
                            }>
                            {TYPES.map(type => (
                              <Menu.Item
                                onPress={() => {
                                  setFieldValue(`adrs.${index}.label`, type);
                                  setIsLabelMenuVisible(undefined);
                                }}
                                title={
                                  type.charAt(0).toUpperCase() + type.slice(1)
                                }
                              />
                            ))}
                          </Menu>
                        </View>
                      ))}
                    </List.Section>
                  )}
                </FieldArray>

                <FieldArray name="socialProfiles">
                  {({remove, push}) => (
                    <List.Section title="Réseau sociaux" style={{gap: 16}}>
                      {values.socialProfiles.map((socialProfile, index) => (
                        <View key={index} style={{gap: 16}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 16,
                            }}>
                            <TextInput
                              style={{flex: 1, flexGrow: 1}}
                              onChangeText={handleChange(
                                `socialProfiles.${index}.value`,
                              )}
                              onBlur={handleBlur(
                                `socialProfiles.${index}.value`,
                              )}
                              value={socialProfile.value}
                              label="Adresse mail"
                            />
                          </View>
                          <Menu
                            visible={
                              !!isLabelMenuVisible?.[`socialProfiles.${index}`]
                            }
                            onDismiss={() =>
                              setIsLabelMenuVisible({
                                [`socialProfiles.${index}`]: false,
                              })
                            }
                            anchor={
                              <Pressable
                                onPress={() => {
                                  setIsLabelMenuVisible({
                                    [`socialProfiles.${index}`]: true,
                                  });
                                }}>
                                <TextInput
                                  style={{width: '50%'}}
                                  label="Label"
                                  editable={false}
                                  value={
                                    socialProfile.label
                                      .charAt(0)
                                      .toUpperCase() +
                                    socialProfile.label.slice(1)
                                  }
                                  right={<TextInput.Icon icon="chevron-down" />}
                                />
                              </Pressable>
                            }>
                            {TYPES.map(type => (
                              <Menu.Item
                                onPress={() => {
                                  setFieldValue(
                                    `socialProfiles.${index}.label`,
                                    type,
                                  );
                                  setIsLabelMenuVisible(undefined);
                                }}
                                title={
                                  type.charAt(0).toUpperCase() + type.slice(1)
                                }
                              />
                            ))}
                          </Menu>
                        </View>
                      ))}
                    </List.Section>
                  )}
                </FieldArray>

                <FieldArray name="urls">
                  {({remove, push}) => (
                    <List.Section title="Liens externe" style={{gap: 16}}>
                      {values.urls.map((url, index) => (
                        <View key={index} style={{gap: 16}}>
                          <TextInput
                            style={{flex: 1, flexGrow: 1}}
                            onChangeText={handleChange(`urls.${index}.value`)}
                            onBlur={handleBlur(`urls.${index}.value`)}
                            value={url.value}
                            label="lien"
                          />
                        </View>
                      ))}
                    </List.Section>
                  )}
                </FieldArray>

                <List.Section title="Note">
                  <TextInput
                    multiline
                    onChangeText={handleChange('note')}
                    onBlur={handleBlur('note')}
                    value={values.note}
                    label="note"
                  />
                </List.Section>
              </>
            )}
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

export default ContactUpdateScreen;
