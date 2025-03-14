import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
  bgView?: string;
}

const ScreenWrapper: React.FC<Props> = ({children, bgView = 'white'}) => {
  return (
    <View style={{flex: 1, backgroundColor: bgView}}>
      <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
