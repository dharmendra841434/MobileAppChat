import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import SkeletonItem from './SkeletonItem';

const ChatLoader = () => {
  const data = Array.from({length: 5}); // Adjust the length as needed

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={() => <SkeletonItem />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ChatLoader;
