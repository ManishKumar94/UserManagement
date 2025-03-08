import React from 'react';
import Toast from "react-native-root-toast";
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator';
import store from './src/redux/store';

const App = () => {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </RootSiblingParent>
  );
};

export default App;
