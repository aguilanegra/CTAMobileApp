import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VideoManagerScreen from './VideoManagerScreen';
import AccountManagerScreen from './AccountManagerScreen';
import CurriculumListingScreen from './CurriculumListingScreen';
import LessonPlansListingScreen from './LessonPlansListingScreen';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function MainManagerScreen() {
  Orientation.unlockAllOrientations();
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.tabContainer}>
        <Tab.Navigator
          initialRouteName="Videos"
          sceneContainerStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }}
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgba(58, 58, 58, 1)',
              paddingTop: 8,
              paddingBottom: 8,
              height: 60,
              marginBottom: 0,
            },
            //tabBarActiveBackgroundColor: 'rgba(255, 255, 255, 0.2)',
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
            tabBarActiveTintColor: '#fff',
          }}>
          <Tab.Screen
            name="Videos"
            component={VideoManagerScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="film" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="Lessons"
            component={LessonPlansListingScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="book" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="Curriculum"
            component={CurriculumListingScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="cubes" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountManagerScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="user-circle" color={color} size={20} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#000',
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    position: 'relative',
    padding: 10,
  },
  sceneContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
});

export default MainManagerScreen;
