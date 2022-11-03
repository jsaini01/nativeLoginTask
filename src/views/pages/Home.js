import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/Button';

const Home = ({navigation}) => {
  const [navigations] = useState(navigation);
  return (
    <View>
      <Text>home</Text>
      <Button text="goback" navigations={navigations} />
    </View>
  );
};

export default Home;
