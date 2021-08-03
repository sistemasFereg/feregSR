import React from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  Easing, 
  Text,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../../assets/styles/variables';

/**
  * Get's data sended from profile form
  * @param {string} color: color for the input border
  * @param {function} onChangeText: on change text function
  * @param {string} placeholder: input's place holder
  * @param {boolean} isValid: Flag to know if the input select is valid
  * @param {boolean} lowercase: Input text is transform to lowercase
  * @param {boolean} nonSpace: Input text removes the blank spaces from input
*/
class CustomDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }

  componentDidMount() {
    if(this.props.value){
      this.setState({ date: this.props.value})
    }
    Animated.timing(new Animated.Value(0), {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }

  onChangeDate(value) {
    this.props.getDate(value, this.props.day);
  }

  showDatePicker = (type) => {
    if(type == 'initDate') {
      this.setState({showInitPicker: true});
    }
   
  };

  hideDatePicker = () => {
    this.setState({showInitPicker: false});
  };

  handleConfirm = (date, type) => {
    this.onChangeDate(date);
    this.setState({date: date});
    this.hideDatePicker();
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.dateText}>{this.state.date ? this.state.date : '--'}</Text>
        <TouchableOpacity
              onPress={() => this.showDatePicker('initDate')}
              style={styles.optionButtonIcon}
            >
              <AntDesign
              name="calendar"
              size={24}
              color={COLORS.white}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              style={
                {
                  color: COLORS.darkGray,
                  backgroundColor: COLORS.darkGray,
                }
              }
              date = {new Date()}
              confirmTextIOS='Confirmar'
              isVisible={this.state.showInitPicker}
              mode='time'
              format='HH:mm'
              onConfirm={(date) => this.handleConfirm(moment(date).format('HH:mm'))}
              onCancel={() => this.hideDatePicker()}
            />
       
       
        {/* <DatePicker
          style={styles.optionButtonIcon}
          date={this.state.today}
          mode="time"
          placeholder="Selecciona la fecha"
          format="HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          hideText
          iconComponent={(
            <AntDesign
              name="calendar"
              size={24}
              color={COLORS.darkPrimary}
            />
          )}
          onPress={
            Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.animatedValue } } }],
              { useNativeDriver: true }
            )
          }
          onDateChange={(date) => {
            this.setState({ date: moment().format(date) });
            this.onChangeDate(moment().format(date));
          }}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkGray
  },
  dateText: {
    textAlign: 'right',
    color: COLORS.white,
    marginTop: -2,
  },
  optionButtonIcon: {
    position: 'absolute',
    marginTop: -5,
    marginLeft: '70%'
  }
});

export default CustomDatePicker;
