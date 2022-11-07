import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  useEffect(() => {
    retrieveData();
  }, []);

  const [token, setToken] = useState();

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value) {
        console.log('value', value);
        setToken(value);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const Handlerbtn = () => {
    AsyncStorage.removeItem('token');
    console.log('token', token);
    navigation.navigate('Login');
  };

  return (
    <View>
      <Text>{token}</Text>
      <Button text="Logout" onPress={() => Handlerbtn()} />
    </View>
  );
};

export default Home;
