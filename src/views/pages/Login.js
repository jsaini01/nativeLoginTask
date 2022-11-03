import {View, TextInput, StyleSheet, Text, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import Btn from '../../components/Button';

const Login = ({navigation}) => {
  //   const [navigations] = useState(navigation);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const Api = 'https://reqres.in/api/login';

  const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$',
  );
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

  const apiHandle = async () => {
    try {
      let response = await fetch(Api, {
        method: 'GET',
      });

      let res = await response.json();
      console.log('response', response.status);
      if (response.status === 200) {
        console.log('res', JSON.stringify(res));
      } else {
        console.log('not registered');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    if (validEmail.test(userId) && validPassword.test(password)) {
      navigation.navigate('Home');
      apiHandle();
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
        onChangeText={text => setUserId(text)}
        value={userId}
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
      <Btn text="Login" onPress={() => handleSubmit()} />
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
