import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface DismissKeyboardProps {
  children: React.JSX.Element
}

export default function DismissKeyboard({ children }: DismissKeyboardProps) {

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  )
}
