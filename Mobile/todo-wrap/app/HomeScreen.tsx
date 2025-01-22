import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://youtube.com' }} // Replace with your URL
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default HomeScreen;
