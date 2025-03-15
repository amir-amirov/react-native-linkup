import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import theme from '../../theme';
import Header from '../../components/Header/Header';
import {scale} from '../../utils';

const NewPostScreen = () => {
  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <View style={{paddingHorizontal: scale(15), paddingTop: scale(10)}}>
        <Header title="Create Post" showBackButton={true} />

        <Text>MEIR LOH!</Text>
      </View>
    </ScreenWrapper>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({});
