import {Formik} from 'formik';
import {useCallback, useState} from 'react';
import {View} from 'react-native';
import {Button, Icon, IconButton, TextInput} from 'react-native-paper';

function ContactUpdateScreen({route, navigation}: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShowMoreFields, setIsShowMoreFields] = useState(false);

  const handleCreate = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <View
      style={{
        minHeight: '100%',
        padding: 16,
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
          tels: [],
          emails: [],
          addresses: [],
          urls: [],
        }}
        validateOnChange={true}
        onSubmit={handleCreate}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={{gap: 16 * 1.5}}>
            <View
              style={{
                flexDirection: 'row',
                gap: 16 / 1.5,
              }}>
              <View style={{flexGrow: 1, gap: 16 * 1.5}}>
                <View style={{flexDirection: 'row', gap: 16 / 1.5}}>
                  <Icon size={24} source="account-outline" />
                  <View style={{flexGrow: 1, gap: 16 * 0.75}}>
                    {isExpanded && (
                      <TextInput
                        mode="outlined"
                        onChangeText={handleChange('namePrefix')}
                        onBlur={handleBlur('namePrefix')}
                        value={values.namePrefix}
                        placeholder="Prefix"
                      />
                    )}
                    <TextInput
                      mode="outlined"
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      placeholder="Prénom"
                    />
                    {isExpanded && (
                      <TextInput
                        mode="outlined"
                        onChangeText={handleChange('middleName')}
                        onBlur={handleBlur('middleName')}
                        value={values.middleName}
                        placeholder="Deuxième prénom"
                      />
                    )}
                    <TextInput
                      mode="outlined"
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                      placeholder="Nom"
                    />
                    {isExpanded && (
                      <>
                        <TextInput
                          mode="outlined"
                          onChangeText={handleChange('nameSuffix')}
                          onBlur={handleBlur('nameSuffix')}
                          value={values.nameSuffix}
                          placeholder="Suffixe"
                        />
                        <TextInput
                          mode="outlined"
                          onChangeText={handleChange('nickName')}
                          onBlur={handleBlur('nickName')}
                          value={values.nickName}
                          placeholder="Surnom"
                        />
                      </>
                    )}
                  </View>
                </View>

                <View style={{flexDirection: 'row', gap: 16 / 1.5}}>
                  <Icon size={24} source="domain" />
                  <View style={{flexGrow: 1, gap: 16 * 0.75}}>
                    <TextInput
                      mode="outlined"
                      onChangeText={handleChange('company')}
                      onBlur={handleBlur('company')}
                      value={values.company}
                      placeholder="Entreprise"
                    />
                    {isShowMoreFields && (
                      <>
                        <TextInput
                          mode="outlined"
                          onChangeText={handleChange('companyDepartement')}
                          onBlur={handleBlur('companyDepartement')}
                          value={values.companyDepartement}
                          placeholder="Département"
                        />
                        <TextInput
                          mode="outlined"
                          onChangeText={handleChange('companyTitle')}
                          onBlur={handleBlur('companyTitle')}
                          value={values.companyTitle}
                          placeholder="Poste"
                        />
                      </>
                    )}
                  </View>
                </View>
              </View>

              <IconButton
                size={24}
                icon={!isExpanded ? 'chevron-down' : 'chevron-up'}
                onPress={() => setIsExpanded(s => !s)}
              />
            </View>

            {!isShowMoreFields && (
              <Button onPress={() => setIsShowMoreFields(true)}>
                Afficher plus de champs
              </Button>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
}

export default ContactUpdateScreen;
