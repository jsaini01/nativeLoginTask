import {View, TextInput, StyleSheet, Text, Alert} from 'react-native';

import React, {useEffect, useState} from 'react';
import Btn from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState();
  useEffect(() => {
    retrieveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log('value', value);
      if (value) {
        navigation.navigate('Home');
        setToken(value);
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const Api = 'https://reqres.in/api/login';

  const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$',
  );
  const validPassword = new RegExp('^(?=.?[a-zA-Z])');

  const apiHandle = async () => {
    console.log('email', email);
    console.log('password', password);
    let items = {email, password};
    if (validEmail.test(email) && validPassword.test(password)) {
      fetch(Api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(items),
      })
        .then(res => res.json())
        .then(async res => {
          console.log('res?.token', res?.token);
          await AsyncStorage.setItem('token', res?.token);
          setToken(res?.token);
        })
        .catch(err => {
          console.log('err', err);
        });
    } else {
      Alert.alert('not valid');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="User id"
        cursorColor={'grey'}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        cursorColor={'grey'}
        secureTextEntry={true}
        onChangeText={num => setPassword(num)}
        value={password}
      />
      <Text style={styles.forgot}>Forgot Password</Text>
      <Btn text="Login" onPress={() => apiHandle()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: 10,
    borderWidth: 1,
    width: '80%',
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontSize: 13,
    borderRadius: 50,
  },
  forgot: {
    color: 'black',
    fontWeight: '500',
  },
});

export default Login;
