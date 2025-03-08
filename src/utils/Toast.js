import Toast from 'react-native-root-toast';
import Colors from '../../assets/colors/Colors';

export function showSuccessMessage(message) {
  try {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      textColor: Colors.white,
      backgroundColor: Colors.green,
      containerStyle: {borderRadius: 20, paddingHorizontal: 15},
    });
    setTimeout(function () {
      Toast.hide(toast);
    }, 2000);
  } catch (e) {
    console.log(e);
  }
}

export function showErrorMessage(message) {
  try {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      textColor: Colors.white,
      backgroundColor: Colors.red,
      containerStyle: {borderRadius: 20, paddingHorizontal: 15},
    });
    setTimeout(function () {
      Toast.hide(toast);
    }, 2000);
  } catch (e) {
    console.log(e);
  }
}
