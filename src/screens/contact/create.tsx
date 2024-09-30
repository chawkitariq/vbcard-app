import {FieldArray, Formik} from 'formik';
import React from 'react';
import {useCallback, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Button, IconButton, Menu, TextInput} from 'react-native-paper';

function ContactCreateScreen({route, navigation}: any) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isShowMoreFields, setIsShowMoreFields] = useState(false);
  const [isLabelMenuVisible, setIsLabelMenuVisible] = useState<{
    [key: string]: boolean;
  }>();

  const handleCreate = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <View
      style={{
        minHeight: '100%',
      }}>
      <Formik
        initialValues={{
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
            {
              value: '',
              label: 'Home',
            },
          ],
          emails: [],
          addresses: [],
          urls: [],
        }}
        validateOnChange={true}
        onSubmit={handleCreate}>
        {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
          <ScrollView style={{paddingHorizontal: 16 * 1.5}}>
            <View style={{gap: 16}}>
              <View>
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
              </View>

              <View style={{flexGrow: 1}}>
                <TextInput
                  onChangeText={handleChange('company')}
                  onBlur={handleBlur('company')}
                  value={values.company}
                  label="Entreprise"
                />
                {isShowMoreFields && (
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
              </View>

              <FieldArray name="tels">
                {({remove, push}) => (
                  <>
                    {values.tels.map((tel, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 16,
                        }}>
                        <TextInput
                          style={{flex: 1, flexGrow: 1}}
                          onChangeText={handleChange(`tels.${index}.value`)}
                          onBlur={handleBlur(`tels.${index}.value`)}
                          value={values.tels[index].value}
                          label="Téléphone"
                        />
                        <Menu
                          visible={!!isLabelMenuVisible?.[`tels.${index}`]}
                          onDismiss={() =>
                            setIsLabelMenuVisible({[`tels.${index}`]: false})
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
                                onChangeText={handleChange(
                                  `tels.${index}.label`,
                                )}
                                onBlur={handleBlur(`tels.${index}.label`)}
                                value={values.tels[index].label}
                                right={<TextInput.Icon icon="chevron-down" />}
                              />
                            </Pressable>
                          }>
                          <Menu.Item title="Partager" />
                          <Menu.Item title="Supprimer" />
                        </Menu>
                      </View>
                    ))}
                    <IconButton
                      mode="contained-tonal"
                      icon="plus"
                      style={{alignSelf: 'center'}}
                      onPress={() =>
                        push({
                          value: '',
                          label: 'home',
                        })
                      }
                    />
                  </>
                )}
              </FieldArray>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

export default ContactCreateScreen;
