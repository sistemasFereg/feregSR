import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/styles/variables';

export default StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.darkGray,
    zIndex: 1000
  },
  imageContainer: {
    height: 180,
    width: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 180,
    width: 180,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 'auto'
  }
});
