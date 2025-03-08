import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Colors from '../../assets/colors/Colors';
import CloseIcon from '../../assets/images/close.svg';
import {Strings} from '../common/Strings';
import {isTextNotEmpty, validateEmail, validateUrl} from '../utils/Validation';

const UserFormModal = ({
  isVisible,
  setVisible,
  actionType,
  userData,
  onSubmit,
}) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [suite, setSuite] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Create refs for each input
  const usernameRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const websiteRef = useRef(null);
  const suiteRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const zipcodeRef = useRef(null);

  const focusNextInput = nextInputRef => {
    if (nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (actionType?.userId && userData?.length) {
      const oldData = userData.find(item => item.id == actionType.userId);
      if (oldData) {
        setUsername(oldData.username || '');
        setName(oldData.name || '');
        setEmail(oldData.email || '');
        setPhone(oldData.phone || '');
        setWebsite(oldData.website || '');
        setSuite(oldData.address?.suite || '');
        setStreet(oldData.address?.street || '');
        setCity(oldData.address?.city || '');
        setZipcode(oldData.address?.zipcode || '');
      }
    } else {
      clearForm();
    }
  }, [isVisible, userData, actionType]);

  const checkValidation = () => {
    Keyboard.dismiss();
    setErrors({});
    if (!isTextNotEmpty(username)) {
      setErrors(prev => ({...prev, username: 'Username is required'}));
      usernameRef.current.focus();
    } else if (!isTextNotEmpty(name)) {
      setErrors(prev => ({...prev, name: 'Name is required'}));
      nameRef.current.focus();
    } else if (!isTextNotEmpty(email)) {
      setErrors(prev => ({...prev, email: 'Email is required'}));
      emailRef.current.focus();
    } else if (!validateEmail(email)) {
      setErrors(prev => ({...prev, email: 'Please enter a valid email'}));
      emailRef.current.focus();
    } else if (!isTextNotEmpty(phone)) {
      setErrors(prev => ({...prev, phone: 'Phone is required'}));
      phoneRef.current.focus();
    } else if (phone.length < 12) {
      setErrors(prev => ({
        ...prev,
        phone: 'Please enter a valid phone number',
      }));
      phoneRef.current.focus();
    } else if (!isTextNotEmpty(website)) {
      setErrors(prev => ({
        ...prev,
        website: 'Please enter a valid website URL',
      }));
      websiteRef.current.focus();
    } else if (!validateUrl(website)) {
      setErrors(prev => ({
        ...prev,
        website: 'Please enter a valid website URL',
      }));
      websiteRef.current.focus();
    } else if (!isTextNotEmpty(suite)) {
      setErrors(prev => ({...prev, suite: 'Suite is required'}));
      suiteRef.current.focus();
    } else if (!isTextNotEmpty(street)) {
      setErrors(prev => ({...prev, street: 'Street is required'}));
      streetRef.current.focus();
    } else if (!isTextNotEmpty(city)) {
      setErrors(prev => ({...prev, city: 'City is required'}));
      cityRef.current.focus();
    } else if (!isTextNotEmpty(zipcode)) {
      setErrors(prev => ({...prev, zipcode: 'Zipcode is required'}));
      zipcodeRef.current.focus();
    } else {
      const userData = {
        name,
        username,
        email,
        address: {
          street,
          suite,
          city,
          zipcode,
        },
        phone,
        website,
      };
      onSubmit(userData);
      clearForm();
      setVisible(false);
    }
  };

  const clearForm = () => {
    setUsername('');
    setName('');
    setEmail('');
    setPhone('');
    setWebsite('');
    setSuite('');
    setStreet('');
    setCity('');
    setZipcode('');
    setErrors({});
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {}}>
      <TouchableOpacity style={styles.touchView} />
      <Pressable
        style={styles.ModalContainerView}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.ModelContainer}>
          <TouchableOpacity
            style={styles.closeIconView}
            onPress={() => {
              setVisible(false);
              clearForm();
            }}>
            <CloseIcon />
          </TouchableOpacity>

          <Text style={styles.titleText}>
            {actionType.action == 'add' ? Strings.addUser : Strings.editUser}
          </Text>

          <ScrollView>
            <View>
              <TextInput
                label="Username"
                mode="outlined"
                style={styles.textInput}
                value={username}
                onChangeText={value => {
                  setUsername(value);
                }}
                ref={usernameRef}
                returnKeyType="next"
                onSubmitEditing={() => focusNextInput(nameRef)}
              />
              {errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <TextInput
                label="Name"
                mode="outlined"
                style={styles.textInput}
                value={name}
                onChangeText={value => {
                  setName(value);
                }}
                ref={nameRef}
                returnKeyType="next"
                onSubmitEditing={() => focusNextInput(emailRef)}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <TextInput
                label="Email"
                mode="outlined"
                style={styles.textInput}
                value={email}
                onChangeText={value => {
                  setEmail(value);
                }}
                ref={emailRef}
                returnKeyType="next"
                keyboardType={'email-address'}
                autoCapitalize="none"
                onSubmitEditing={() => focusNextInput(phoneRef)}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                label="Phone"
                mode="outlined"
                keyboardType="phone-pad"
                style={styles.textInput}
                value={phone}
                onChangeText={value => {
                  const numericValue = value.replace(/[^0-9]/g, '');
                  let formattedValue = '';
                  if (numericValue.length > 0) {
                    formattedValue += numericValue.substring(0, 3);
                  }
                  if (numericValue.length > 3) {
                    formattedValue += '-' + numericValue.substring(3, 6);
                  }
                  if (numericValue.length > 6) {
                    formattedValue += '-' + numericValue.substring(6, 10);
                  }
                  setPhone(formattedValue);
                }}
                maxLength={12}
                ref={phoneRef}
                returnKeyType="next"
                onSubmitEditing={() => focusNextInput(websiteRef)}
              />
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              <TextInput
                label="Website"
                mode="outlined"
                style={styles.textInput}
                value={website}
                onChangeText={value => {
                  setWebsite(value);
                }}
                ref={websiteRef}
                returnKeyType="next"
                autoCapitalize="none"
                onSubmitEditing={() => focusNextInput(suiteRef)}
              />
              {errors.website && (
                <Text style={styles.errorText}>{errors.website}</Text>
              )}

              <TextInput
                label="Suite"
                mode="outlined"
                style={styles.textInput}
                value={suite}
                onChangeText={value => {
                  setSuite(value);
                }}
                ref={suiteRef}
                returnKeyType="next"
                onSubmitEditing={() => focusNextInput(streetRef)}
              />
              {errors.suite && (
                <Text style={styles.errorText}>{errors.suite}</Text>
              )}

              <TextInput
                label="Street"
                mode="outlined"
                style={styles.textInput}
                value={street}
                onChangeText={value => {
                  setStreet(value);
                }}
                ref={streetRef}
                returnKeyType="next"
                onSubmitEditing={() => focusNextInput(cityRef)}
              />
              {errors.street && (
                <Text style={styles.errorText}>{errors.street}</Text>
              )}

              <TextInput
                label="City"
                mode="outlined"
                style={styles.textInput}
                value={city}
                onChangeText={value => {
                  setCity(value);
                }}
                ref={cityRef}
                returnKeyType="next"
                onSubmitEditing={() => focusNextInput(zipcodeRef)}
              />
              {errors.city && (
                <Text style={styles.errorText}>{errors.city}</Text>
              )}

              <TextInput
                label="Zipcode"
                mode="outlined"
                style={styles.textInput}
                keyboardType="number-pad"
                value={zipcode}
                onChangeText={value => {
                  const numericValue = value.replace(/[^0-9]/g, '');
                  setZipcode(numericValue);
                }}
                ref={zipcodeRef}
                returnKeyType="done"
              />
              {errors.zipcode && (
                <Text style={styles.errorText}>{errors.zipcode}</Text>
              )}
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={checkValidation}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>
              {actionType.action === 'add' ? Strings.add : Strings.update}
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModelContainer: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: '80%',
  },
  ModalContainerView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  titleText: {
    color: Colors.text.title,
    fontSize: 19,
    marginBottom: 10,
  },
  touchView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeIconView: {alignSelf: 'flex-end'},
  textInput: {
    fontSize: 16,
    height: 38,
    marginTop: 5,
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: Colors.app.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserFormModal;
