import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../assets/colors/Colors';
import BackIcon from '../../assets/images/back-white-bg.svg';
import Toolbar from '../components/Toolbar';

const UserDetailScreen = ({route}) => {
  const [userDetail, setUserDetail] = useState(route.params.userList);
  const fullAddress = `${userDetail.address.suite}, ${userDetail.address.street}, ${userDetail.address.city}, ${userDetail.address.zipcode}`;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <Toolbar
          isLeftIcon={true}
          leftIcon={<BackIcon />}
          title={userDetail.username}
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.labelText}>Id</Text>
              <Text style={styles.labelText}>Username</Text>
              <Text style={styles.labelText}>Name</Text>
              <Text style={styles.labelText}>Email</Text>
              <Text style={styles.labelText}>Phone</Text>
              <Text style={styles.labelText}>Website</Text>
              <Text style={styles.labelText}>Address</Text>
            </View>
            <View>
              <Text style={styles.labelText}> :</Text>
              <Text style={styles.labelText}> :</Text>
              <Text style={styles.labelText}> :</Text>
              <Text style={styles.labelText}> :</Text>
              <Text style={styles.labelText}> :</Text>
              <Text style={styles.labelText}> :</Text>
              <Text style={styles.labelText}> :</Text>
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.valueText}>{userDetail.id}</Text>
              <Text style={styles.valueText}>{userDetail.username}</Text>
              <Text style={styles.valueText}>{userDetail.name}</Text>
              <Text style={styles.valueText}>{userDetail.email}</Text>
              <Text style={styles.valueText}>{userDetail.phone}</Text>
              <Text style={styles.valueText}>{userDetail.website}</Text>
              <Text style={styles.valueText}>{fullAddress}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.white,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  subContainer: {
    flexDirection: 'row',
  },
  labelContainer: {
    flex: 1,
    marginLeft: 10,
  },
  labelText: {
    fontSize: 16,
    marginTop: 5,
    color: Colors.text.title,
  },
  valueText: {
    fontSize: 16,
    marginTop: 5,
    color: Colors.text.subTitle,
  },
});

export default UserDetailScreen;
