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

const LoaderModal = ({Visibility}) => (
  <Modal visible={Visibility} transparent={true} animationType={'fade'}>
    <View style={styles.container}>
      <View style={styles.modal}>
        <ActivityIndicator size={'large'} color={colors.secondary} />
      </View>
    </View>
  </Modal>
);
export default LoaderModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
