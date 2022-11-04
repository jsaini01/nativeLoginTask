import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../../components/Button';
// import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  useEffect(() => {
    retrieveData();
  }, []);

  // const route = useRoute();
  const [token, setToken] = useState();

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        console.log('fffff', value);

        setToken(value);
      }
    } catch (error) {
      console.log('errorsdsd', error);
    }
  };

  const Handlerbtn = () => {
    navigation.navigate('Login');
    AsyncStorage.removeItem('token');
  };

  return (
    <View>
      <Text>{token}</Text>

      <Button text="goback" onPress={() => Handlerbtn()} />
    </View>
  );
};

export default Home;
