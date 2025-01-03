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
  org: '',
  orgDepartement: '',
  title: '',
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

type ArrayFieldsNames = keyof Pick<
  typeof initialValues,
  'tels' | 'emails' | 'adrs' | 'urls' | 'socialProfiles'
>;

function ContactCreateScreen({route, navigation}: any) {
  const theme = useTheme();

  const [isShowPersonalMore, setIsShowPersonalMore] = useState(false);

  const [arrayFieldLabelMenuIndex, setArrayFieldLabelMenuIndex] =
    useState<`${ArrayFieldsNames}.${number}`>();

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
        .add('org', data.org)
        .add('title', data.title)
        .add('note', data.note);

      data.tels
        .filter(tel => tel.value)
        .forEach(tel => {
          vcard.add('tel', tel.value, {type: tel.label});
        });

      data.emails
        .filter(email => email.value)
        .forEach(email => {
          vcard.add('email', email.value, {type: email.label});
        });

      data.adrs
        .filter(adr => adr.value)
        .forEach(adr => {
          vcard.add('adr', adr.value, {type: adr.label});
        });

      data.socialProfiles
        .filter(socialProfile => socialProfile.value)
        .forEach(socialProfile => {
          vcard.add('socialProfile', socialProfile.value, {
            type: socialProfile.label,
          });
        });

      data.urls
        .filter(url => url.value)
        .forEach(url => {
          vcard.add('url', url.value);
        });

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
          <View style={{paddingVertical: 16, gap: 16}}>
            <View style={{paddingHorizontal: 16}}>
              <ContactCard />
            </View>

            <View>
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
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <IconButton icon="domain" />
                <TextInput
                  style={{flex: 1}}
                  onChangeText={handleChange('org')}
                  onBlur={handleBlur('org')}
                  value={values.org}
                  label="Entreprise"
                />
                <IconButton icon="account" style={{opacity: 0}} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <IconButton icon="domain" style={{opacity: 0}} />
                <TextInput
                  style={{flex: 1}}
                  onChangeText={handleChange('orgDepartement')}
                  onBlur={handleBlur('orgDepartement')}
                  value={values.orgDepartement}
                  label="Département"
                />
                <IconButton icon="account" style={{opacity: 0}} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <IconButton icon="domain" style={{opacity: 0}} />
                <TextInput
                  style={{flex: 1}}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  label="Poste"
                />
                <IconButton icon="account" style={{opacity: 0}} />
              </View>
            </View>

            <FieldArray name="tels">
              {({remove, push}) => (
                <View>
                  {values.tels.map((tel, index) => (
                    <View key={index}>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton
                          icon="phone"
                          style={[index !== 0 && {opacity: 0}]}
                        />
                        <TextInput
                          keyboardType="phone-pad"
                          style={{flex: 1}}
                          onChangeText={handleChange(`tels.${index}.value`)}
                          onBlur={handleBlur(`tels.${index}.value`)}
                          value={tel.value}
                          autoFocus={index === values.tels.length - 1}
                          label="Téléphone"
                        />
                        {!(index === values.tels.length - 1) && (
                          <IconButton
                            icon="close"
                            onPress={() => remove(index)}
                          />
                        )}
                        {index === values.tels.length - 1 && (
                          <IconButton
                            icon="plus"
                            onPress={() =>
                              push({
                                value: '',
                                label: VCARD_TYPES_LABLES[VCARD_TYPES.HOME],
                              })
                            }
                          />
                        )}
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton icon="phone" style={{opacity: 0}} />
                        <Menu
                          visible={arrayFieldLabelMenuIndex === `tels.${index}`}
                          onDismiss={() =>
                            setArrayFieldLabelMenuIndex(undefined)
                          }
                          anchor={
                            <Pressable
                              onPress={() => {
                                setArrayFieldLabelMenuIndex(`tels.${index}`);
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
                                setArrayFieldLabelMenuIndex(undefined);
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
                </View>
              )}
            </FieldArray>

            <FieldArray name="emails">
              {({remove, push}) => (
                <View>
                  {values.emails.map((email, index) => (
                    <View key={index}>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton
                          icon="email"
                          style={[index !== 0 && {opacity: 0}]}
                        />
                        <TextInput
                          style={{flex: 1}}
                          keyboardType="email-address"
                          onChangeText={handleChange(`emails.${index}.value`)}
                          onBlur={handleBlur(`emails.${index}.value`)}
                          autoFocus={index === values.emails.length - 1}
                          value={email.value}
                          label="Adresse email"
                        />
                        {!(index === values.emails.length - 1) && (
                          <IconButton
                            icon="close"
                            onPress={() => remove(index)}
                          />
                        )}
                        {index === values.emails.length - 1 && (
                          <IconButton
                            icon="plus"
                            onPress={() =>
                              push({
                                value: '',
                                label: VCARD_TYPES_LABLES[VCARD_TYPES.HOME],
                              })
                            }
                          />
                        )}
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton icon="phone" style={{opacity: 0}} />
                        <Menu
                          visible={
                            arrayFieldLabelMenuIndex === `emails.${index}`
                          }
                          onDismiss={() =>
                            setArrayFieldLabelMenuIndex(undefined)
                          }
                          anchor={
                            <Pressable
                              onPress={() => {
                                setArrayFieldLabelMenuIndex(`emails.${index}`);
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
                                setArrayFieldLabelMenuIndex(undefined);
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
                </View>
              )}
            </FieldArray>

            <FieldArray name="adrs">
              {({remove, push}) => (
                <View>
                  {values.adrs.map((adr, index) => (
                    <View key={index}>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton
                          icon="map-marker"
                          style={[index !== 0 && {opacity: 0}]}
                        />
                        <TextInput
                          style={{flex: 1}}
                          onChangeText={handleChange(`adrs.${index}.value`)}
                          onBlur={handleBlur(`adrs.${index}.value`)}
                          autoFocus={index === values.adrs.length - 1}
                          value={adr.value}
                          label="Adresse adr"
                        />
                        {!(index === values.adrs.length - 1) && (
                          <IconButton
                            icon="close"
                            onPress={() => remove(index)}
                          />
                        )}
                        {index === values.adrs.length - 1 && (
                          <IconButton
                            icon="plus"
                            onPress={() =>
                              push({
                                value: '',
                                label: VCARD_TYPES_LABLES[VCARD_TYPES.HOME],
                              })
                            }
                          />
                        )}
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton icon="phone" style={{opacity: 0}} />
                        <Menu
                          visible={arrayFieldLabelMenuIndex === `adrs.${index}`}
                          onDismiss={() =>
                            setArrayFieldLabelMenuIndex(`adrs.${index}`)
                          }
                          anchor={
                            <Pressable
                              onPress={() => {
                                setArrayFieldLabelMenuIndex(`adrs.${index}`);
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
                                setArrayFieldLabelMenuIndex(undefined);
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
                </View>
              )}
            </FieldArray>

            <FieldArray name="socialProfiles">
              {({remove, push}) => (
                <View>
                  {values.socialProfiles.map((socialProfile, index) => (
                    <View key={index}>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton
                          icon="share-variant"
                          style={[index !== 0 && {opacity: 0}]}
                        />
                        <TextInput
                          style={{flex: 1}}
                          onChangeText={handleChange(
                            `socialProfiles.${index}.value`,
                          )}
                          onBlur={handleBlur(`socialProfiles.${index}.value`)}
                          value={socialProfile.value}
                          autoFocus={index === values.socialProfiles.length - 1}
                          label="Réseau social"
                        />
                        {!(index === values.socialProfiles.length - 1) && (
                          <IconButton
                            icon="close"
                            onPress={() => remove(index)}
                          />
                        )}
                        {index === values.socialProfiles.length - 1 && (
                          <IconButton
                            icon="plus"
                            onPress={() =>
                              push({
                                value: '',
                                label: VCARD_TYPES_LABLES[VCARD_TYPES.HOME],
                              })
                            }
                          />
                        )}
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <IconButton icon="phone" style={{opacity: 0}} />
                        <Menu
                          visible={
                            arrayFieldLabelMenuIndex ===
                            `socialProfiles.${index}`
                          }
                          onDismiss={() =>
                            setArrayFieldLabelMenuIndex(undefined)
                          }
                          anchor={
                            <Pressable
                              onPress={() => {
                                setArrayFieldLabelMenuIndex(
                                  `socialProfiles.${index}`,
                                );
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
                                setArrayFieldLabelMenuIndex(undefined);
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
                </View>
              )}
            </FieldArray>

            <FieldArray name="urls">
              {({remove, push}) => (
                <View>
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
                          keyboardType="url"
                          autoFocus={index === values.urls.length - 1}
                          label="Site web"
                        />
                        {!(index === values.urls.length - 1) && (
                          <IconButton
                            icon="close"
                            onPress={() => remove(index)}
                          />
                        )}
                        {index === values.urls.length - 1 && (
                          <IconButton
                            icon="plus"
                            onPress={() =>
                              push({
                                value: '',
                              })
                            }
                          />
                        )}
                      </View>
                    </>
                  ))}
                </View>
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
