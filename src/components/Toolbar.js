import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../assets/colors/Colors';

export default function Toolbar({
  onLeftPress,
  title,
  buttonViewStyle,
  textStyle,
  button,
  isLeftIcon,
  leftIcon,
  isRightIcon,
  rightIcon,
  onRightPress,
}) {
  return (
    <Pressable style={[styles.button, buttonViewStyle]}>
      <View style={[styles.buttonView, button]}>
        {isLeftIcon && leftIcon && (
          <TouchableOpacity onPress={onLeftPress}>{leftIcon}</TouchableOpacity>
        )}
        <Text
          style={[styles.buttonText, textStyle]}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {title}
        </Text>
        {isRightIcon && rightIcon && (
          <TouchableOpacity onPress={onRightPress}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
  },
  buttonView: {
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.text.title,
    flex: 1,
    paddingHorizontal: 5,
  },
});
