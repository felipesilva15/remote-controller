import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Home from './src/screens/Home';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <StatusBar style="auto" />
        <Home />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
