import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import colors from '../../globalStyles/colorScheme';

const LoaderMessageModal = ({Visibility, message, progressPercentage}) => (
  <Modal visible={Visibility} transparent={true} animationType={'fade'}>
    <View style={styles.container}>
      <View style={styles.modal}>
        <Image
          source={require('../../../assets/icons/upload.png')}
          resizeMode={'contain'}
          style={{height: '50%', width: '90%'}}
        />
        <Text style={styles.text}>{message}</Text>
        <ActivityIndicator size={'large'} color={colors.secondary} />
        <Text style={[styles.text, {color: colors.primary}]}>{`${parseInt(
          progressPercentage,
        )} %`}</Text>
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
    height: '55%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    color: colors.black,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
    width: '70%',
  },
});
