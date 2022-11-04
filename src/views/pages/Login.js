import {View, TextInput, StyleSheet, Text, Alert} from 'react-native';

import React, {useState} from 'react';
import Btn from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  //   const [navigations] = useState(navigation);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userData, setUserData] = useState();

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
        .then(res => {
          navigation.navigate('Home');
          const StoreData = async () => {
            try {
              await AsyncStorage.setItem('token', JSON.stringify(res));
            } catch (error) {
              console.log('err', error);
            }
          };
          StoreData();
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
