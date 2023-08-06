/**
 * Caio Terra Online
 * Author: Mateo Nares
 *
 * @format
 */
import React, {useState} from 'react';
import {
  Alert,
  Button, Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import {useNavigation} from '@react-navigation/native';
import Password from '../components/PasswordTextBox';

function CreateAccountScreen(): React.JSX.Element {
  // Data for login
  const [log, setUsername] = useState('');
  const [pwd, setPassword] = useState('');
  // useNavigation hook to access navigation object
  const navigation = useNavigation();

  // use API to validate username and password
  const handleLogin = async () => {
    if (!log || !pwd) {
      Alert.alert('Invalid Login', 'Please enter a username and password.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('log', log);
      formData.append('pwd', pwd);
      formData.append('lwa', '1');
      formData.append('login-with-ajax', 'login');

      const response = await fetch(
        'https://caioterra.com/wp-admin/admin-ajax.php',
        {
          method: 'POST',
          body: formData,
        },
      );

      const responseData = await response.json();
      //console.log(responseData);

      if (response.ok) {
        if (responseData.result === false) {
          Alert.alert('Error', responseData.error);
        } else {
          //Alert.alert('Login Successful', 'Welcome!');
          navigation.navigate('Videos' as never); // Navigate to Videos after successful login
        }
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error logging in.');
    }
  };

  // @ts-ignore
  return (
    <ScrollView style={styles.background}>
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>
            Sign up and get access to over 2100 crystal-clear HD videos!
          </Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Username"
            style={styles.input}
            onChangeText={text => setUsername(text)}
            placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
            value={log}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Email"
            inputMode="email"
            style={styles.input}
            placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
          />
          <Password
            autoCapitalize="none"
            label="Password"
            value={pwd}
            onChange={text => setPassword(text)}
            style={styles.input}
          />
          <Password
            autoCapitalize="none"
            label="Repeat Password"
            value={pwd}
            onChange={text => setPassword(text)}
            style={styles.input}
          />
          <Pressable
            //onPress={handleBrowse}
            style={[styles.button, styles.shadowProp]}>
            <Text style={styles.label}>Annual Subscription ($249.99)</Text>
          </Pressable>
          <Pressable
            //onPress={handleBrowse}
            style={[styles.button, styles.shadowProp]}>
            <Text style={styles.label}>Monthly Subscription ($24.99)</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    marginTop: 35,
  },
  button: {
    backgroundColor: '#00a6ff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    display: 'flex',
    marginLeft: 30,
    marginRight: 30,
    paddingBottom: 20,
  },
  label: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    width: '80%',
    marginBottom: 20,
    padding: 10,
  },
  secondary: {
    backgroundColor: '#666',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: -3, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default CreateAccountScreen;