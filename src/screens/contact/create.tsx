import {useMutation, useQueryClient} from '@tanstack/react-query';
import {FieldArray, Formik, FormikProps} from 'formik';
import React, {useEffect, useRef} from 'react';
import {useCallback, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {
  Appbar,
  Button,
  IconButton,
  Menu,
  TextInput,
  useTheme,
} from 'react-native-paper';
import vCard from 'vcf';
import {ContactApiService} from '../../services';
import {ContactCard} from '../../components';
import {
  VCARD_SOCIAL_PROFILES_TYPES,
  VCARD_TYPES_LABLES,
  VCARD_SOCIAL_PROFILES_TYPES_LABELS,
  VCARD_TYPES,
} from '../../constants';

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
      label: VCARD_TYPES_LABLES[VCARD_TYPES.HOME],
    },
  ],
  emails: [
    {
      value: '',
      label: VCARD_TYPES_LABLES[VCARD_TYPES.HOME],
    },
  ],
  adrs: [
    {
      value: '',
      label: VCARD_TYPES_LABLES[VCARD_TYPES.HOME],
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
      label:
        VCARD_SOCIAL_PROFILES_TYPES_LABELS[
          VCARD_SOCIAL_PROFILES_TYPES.FACEBOOK
        ],
    },
  ],
};

function ContactCreateScreen({route, navigation}: any) {
  const theme = useTheme();

  const [isShowPersonalMore, setIsShowPersonalMore] = useState(false);

  const [isLabelMenuVisible, setIsLabelMenuVisible] = useState<{
    [key: string]: boolean;
  }>();

  const queryClient = useQueryClient();

  const {isPending, mutate: handleCreate} = useMutation({
    mutationKey: ['contacts'],
    mutationFn: ContactApiService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contacts'],
      });
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
          <Appbar.Content title="Nouveau Contact" />
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
          <View style={{gap: 16}}>
            <Pressable style={{paddingHorizontal: 16}}>
              <ContactCard />
            </Pressable>

            {isShowPersonalMore && (
              <View style={{flexDirection: 'row'}}>
                <IconButton icon="account" />
                <TextInput
                  style={{flex: 1}}
                  onChangeText={handleChange('namePrefix')}
                  onBlur={handleBlur('namePrefix')}
                  value={values.namePrefix}
                  label="Prefix"
                />
                <IconButton
                  icon="chevron-up"
                  onPress={() => setIsShowPersonalMore(false)}
                />
              </View>
            )}
            <View style={{flexDirection: 'row'}}>
              <IconButton
                icon="account"
                style={[isShowPersonalMore && {opacity: 0}]}
              />
              <TextInput
                style={{flex: 1}}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                label="Prénom"
              />
              <IconButton
                icon="chevron-down"
                style={[isShowPersonalMore && {opacity: 0}]}
                onPress={() => setIsShowPersonalMore(true)}
              />
            </View>
            {isShowPersonalMore && (
              <View style={{flexDirection: 'row'}}>
                <IconButton icon="account" style={{opacity: 0}} />
                <TextInput
                  style={{flex: 1}}
                  onChangeText={handleChange('middleName')}
                  onBlur={handleBlur('middleName')}
                  value={values.middleName}
                  label="Deuxième prénom"
                />
                <IconButton icon="chevron-down" style={{opacity: 0}} />
              </View>
            )}
            <View style={{flexDirection: 'row'}}>
              <IconButton icon="account" style={{opacity: 0}} />
              <TextInput
                style={{flex: 1}}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                label="Nom"
              />
              <IconButton icon="chevron-down" style={{opacity: 0}} />
            </View>
            {isShowPersonalMore && (
              <>
                <View style={{flexDirection: 'row'}}>
                  <IconButton icon="account" style={{opacity: 0}} />
                  <TextInput
                    style={{flex: 1}}
                    onChangeText={handleChange('nameSuffix')}
                    onBlur={handleBlur('nameSuffix')}
                    value={values.nameSuffix}
                    label="Suffixe"
                  />
                  <IconButton icon="chevron-down" style={{opacity: 0}} />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <IconButton icon="account" style={{opacity: 0}} />
                  <TextInput
                    style={{flex: 1}}
                    onChangeText={handleChange('nickName')}
                    onBlur={handleBlur('nickName')}
                    value={values.nickName}
                    label="Surnom"
                  />
                  <IconButton icon="chevron-down" style={{opacity: 0}} />
                </View>
              </>
            )}

            <View style={{flexDirection: 'row'}}>
              <IconButton icon="domain" />
              <TextInput
                style={{flex: 1}}
                onChangeText={handleChange('company')}
                onBlur={handleBlur('company')}
                value={values.company}
                label="Entreprise"
              />
              <IconButton icon="account" style={{opacity: 0}} />
            </View>
            <View style={{flexDirection: 'row'}}>
              <IconButton icon="domain" style={{opacity: 0}} />
              <TextInput
                style={{flex: 1}}
                onChangeText={handleChange('companyDepartement')}
                onBlur={handleBlur('companyDepartement')}
                value={values.companyDepartement}
                label="Département"
              />
              <IconButton icon="account" style={{opacity: 0}} />
            </View>
            <View style={{flexDirection: 'row'}}>
              <IconButton icon="domain" style={{opacity: 0}} />
              <TextInput
                style={{flex: 1}}
                onChangeText={handleChange('companyTitle')}
                onBlur={handleBlur('companyTitle')}
                value={values.companyTitle}
                label="Poste"
              />
              <IconButton icon="account" style={{opacity: 0}} />
            </View>

            <FieldArray name="tels">
              {({remove, push}) => (
                <>
                  {values.tels.map((tel, index) => (
                    <View key={index} style={{gap: 16}}>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton
                          icon="phone"
                          style={[index !== 0 && {opacity: 0}]}
                        />
                        <TextInput
                          style={{flex: 1}}
                          onChangeText={handleChange(`tels.${index}.value`)}
                          onBlur={handleBlur(`tels.${index}.value`)}
                          value={tel.value}
                          label="Téléphone"
                        />
                        <IconButton
                          icon="close"
                          style={[values.tels.length <= 1 && {opacity: 0}]}
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton icon="phone" style={{opacity: 0}} />
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
                          {Object.values(VCARD_TYPES_LABLES).map(type => (
                            <Menu.Item
                              onPress={() => {
                                setFieldValue(`tels.${index}.label`, type);
                                setIsLabelMenuVisible(undefined);
                              }}
                              title={
                                type.charAt(0).toUpperCase() + type.slice(1)
                              }
                            />
                          ))}
                        </Menu>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </FieldArray>

            <FieldArray name="emails">
              {({remove, push}) => (
                <>
                  {values.emails.map((email, index) => (
                    <View key={index} style={{gap: 16}}>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton
                          icon="email"
                          style={[index !== 0 && {opacity: 0}]}
                        />
                        <TextInput
                          style={{flex: 1}}
                          onChangeText={handleChange(`emails.${index}.value`)}
                          onBlur={handleBlur(`emails.${index}.value`)}
                          value={email.value}
                          label="Adresse email"
                        />
                        <IconButton
                          icon="close"
                          style={[values.emails.length <= 1 && {opacity: 0}]}
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton icon="phone" style={{opacity: 0}} />
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
                          {Object.values(VCARD_TYPES_LABLES).map(type => (
                            <Menu.Item
                              onPress={() => {
                                setFieldValue(`emails.${index}.label`, type);
                                setIsLabelMenuVisible(undefined);
                              }}
                              title={
                                type.charAt(0).toUpperCase() + type.slice(1)
                              }
                            />
                          ))}
                        </Menu>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </FieldArray>

            <FieldArray name="adrs">
              {({remove, push}) => (
                <>
                  {values.adrs.map((adr, index) => (
                    <View key={index} style={{gap: 16}}>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton
                          icon="map-marker"
                          style={[index !== 0 && {opacity: 0}]}
                        />
                        <TextInput
                          style={{flex: 1}}
                          onChangeText={handleChange(`adrs.${index}.value`)}
                          onBlur={handleBlur(`adrs.${index}.value`)}
                          value={adr.value}
                          label="Adresse adr"
                        />
                        <IconButton
                          icon="close"
                          style={[values.adrs.length <= 1 && {opacity: 0}]}
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton icon="phone" style={{opacity: 0}} />
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
                          {Object.values(VCARD_TYPES_LABLES).map(type => (
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
                    </View>
                  ))}
                </>
              )}
            </FieldArray>

            <FieldArray name="socialProfiles">
              {({remove, push}) => (
                <>
                  {values.socialProfiles.map((socialProfile, index) => (
                    <View key={index} style={{gap: 16}}>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton
                          icon="account-network"
                          style={[index !== 0 && {opacity: 0}]}
                        />
                        <TextInput
                          style={{flex: 1}}
                          onChangeText={handleChange(
                            `socialProfiles.${index}.value`,
                          )}
                          onBlur={handleBlur(`socialProfiles.${index}.value`)}
                          value={socialProfile.value}
                          label="Réseau social"
                        />
                        <IconButton
                          icon="close"
                          style={[
                            values.socialProfiles.length <= 1 && {opacity: 0},
                          ]}
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton icon="phone" style={{opacity: 0}} />
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
                                label="Label"
                                editable={false}
                                value={
                                  socialProfile.label.charAt(0).toUpperCase() +
                                  socialProfile.label.slice(1)
                                }
                                right={<TextInput.Icon icon="chevron-down" />}
                              />
                            </Pressable>
                          }>
                          {Object.values(
                            VCARD_SOCIAL_PROFILES_TYPES_LABELS,
                          ).map(type => (
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
                    </View>
                  ))}
                </>
              )}
            </FieldArray>

            <FieldArray name="urls">
              {({remove, push}) => (
                <>
                  {values.urls.map((url, index) => (
                    <>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton
                          icon="web"
                          style={[index !== 0 && {opacity: 0}]}
                        />
                        <TextInput
                          style={{flex: 1}}
                          onChangeText={handleChange(`urls.${index}.value`)}
                          onBlur={handleBlur(`urls.${index}.value`)}
                          value={url.value}
                          label="Site web"
                        />
                        <IconButton
                          icon="close"
                          style={[values.urls.length <= 1 && {opacity: 0}]}
                        />
                      </View>
                    </>
                  ))}
                </>
              )}
            </FieldArray>

            <View style={{flexDirection: 'row'}}>
              <IconButton icon="note" />
              <TextInput
                style={{flex: 1}}
                multiline
                onChangeText={handleChange('note')}
                onBlur={handleBlur('note')}
                value={values.note}
                label="note"
              />
              <IconButton icon="note" style={{opacity: 0}} />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

export default ContactCreateScreen;
