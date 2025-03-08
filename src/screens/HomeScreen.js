import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../assets/colors/Colors';
import DeleteIcon from '../../assets/images/delete.svg';
import EditIcon from '../../assets/images/edit.svg';
import AddIcon from '../../assets/images/plus.svg';
import {Strings} from '../common/Strings';
import Loading from '../components/Loading';
import Toolbar from '../components/Toolbar';
import UserFormModal from '../components/UserFormModal';
import Routes from '../navigation/routes';
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from '../services/userService';
import {showErrorMessage, showSuccessMessage} from '../utils/Toast';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {loading, users, error} = useSelector(state => state.users);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userActionType, setIsUserActionType] = useState({action: 'add'});
  const [userList, setUserList] = useState([]);
  const flatListRef = useRef(null); // Ref for FlatList

  useEffect(() => {
    dispatch(fetchUsers())
      .unwrap()
      .then(response => {
        setUserList(response);
      })
      .catch(error => {
        showErrorMessage(error);
      });
  }, []);

  const handleCreateUser = userData => {
     // Create a new user
    dispatch(createUser(userData))
      .unwrap()
      .then(response => {
        setUserList(prev => [...prev, userData]);
        showSuccessMessage('User created successfully');
        // Scroll to last added user
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({animated: true});
        }, 300);
      })
      .catch(error => {
        showErrorMessage(error);
      });
  };

  const handleEditUser = (id, userData) => {
    // Edit an existing user
    dispatch(updateUser({id: 10, userData}))
      .unwrap()
      .then(response => {
        const update = userList.map(user =>
          user.id === id ? {...user, ...userData} : user,
        );
        setUserList(update);
        showSuccessMessage('User updated successfully');
      })
      .catch(error => {
        showErrorMessage(error);
      });
  };

  const handleDeleteUser = id => {
    // Delete a user by ID
    dispatch(deleteUser(id))
      .unwrap()
      .then(response => {
        const update = userList.filter(user => user.id !== id);
        setUserList(update);
        showSuccessMessage('User deleted successfully');
      })
      .catch(error => {
        showErrorMessage(error);
      });
  };

  const deleteUserDialog = id => {
     // Show confirmation dialog before deleting a user
    Alert.alert(
      'Delete User',
      'Are you sure, you want to delete this user?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            handleDeleteUser(id);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) => {
    const {id, username, name, email, address} = item;
    const fullAddress = `${address.suite}, ${address.street}, ${address.city}, ${address.zipcode}`;

    return (
      <Pressable
        style={styles.container}
        key={id}
        onPress={() =>
          navigation.navigate(Routes.USERDETAIL, {userList: item})
        }>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.labelText}>Id</Text>
            <Text style={styles.labelText}>Username</Text>
            <Text style={styles.labelText}>Name</Text>
            <Text style={styles.labelText}>Email</Text>
            <Text style={styles.labelText}>Address</Text>
          </View>
          <View>
            <Text style={styles.labelText}> :</Text>
            <Text style={styles.labelText}> :</Text>
            <Text style={styles.labelText}> :</Text>
            <Text style={styles.labelText}> :</Text>
            <Text style={styles.labelText}> :</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.valueText}>{id}</Text>
            <Text style={styles.valueText}>{username}</Text>
            <Text style={styles.valueText}>{name}</Text>
            <Text style={styles.valueText}>{email}</Text>
            <Text style={styles.valueText}>{fullAddress}</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuTouch}
            onPress={() => {
              setIsUserActionType({action: 'edit', userId: id});
              setIsModalVisible(!isModalVisible);
            }}>
            <EditIcon width={20} height={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuTouch}
            onPress={() => {
              deleteUserDialog(id);
            }}>
            <DeleteIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainContainer}>
        <Toolbar
          isRightIcon={true}
          rightIcon={<AddIcon width="20" height="20" />}
          title={Strings.userList}
          onRightPress={() => {
            setIsUserActionType({action: 'add'});
            setIsModalVisible(!isModalVisible);
          }}
        />
        <FlatList
          ref={flatListRef}
          data={userList}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            !loading && (
              <View style={styles.emptyContainer}>
                <Text>No user found</Text>
              </View>
            )
          }
        />
      </View>

      <UserFormModal
        setVisible={setIsModalVisible}
        isVisible={isModalVisible}
        actionType={userActionType}
        userData={userList}
        onSubmit={userData => {
          if (userActionType.action == 'add') {
            handleCreateUser({
              id:
                userList.length > 0 ? userList[userList.length - 1].id + 1 : 1,
              ...userData,
            });
          } else {
            handleEditUser(userActionType.userId, userData);
          }
        }}
      />

      <Loading isVisible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.white,
    marginTop: 8,
    marginBottom: 5,
    marginHorizontal: 13,
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
  menuContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  menuTouch: {
    marginLeft: 10,
    marginTop: 10,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
});

export default HomeScreen;
