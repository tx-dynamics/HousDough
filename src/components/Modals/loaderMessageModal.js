import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import colors from '../../globalStyles/colorScheme';

const LoaderMessageModal = ({Visibility, message}) => (
  <Modal visible={Visibility} transparent={true} animationType={'fade'}>
    <View style={styles.container}>
      <View style={styles.modal}>
        <ActivityIndicator size={'large'} color={colors.secondary} />
        <Text>{message}</Text>
      </View>
    </View>
  </Modal>
);
export default LoaderMessageModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: '80%',
    height: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
