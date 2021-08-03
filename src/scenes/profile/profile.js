import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Modal,
  TouchableOpacity
} from 'react-native';
import { COLORS } from '../../assets/styles/variables';
import CustomHeader from '../../components/header/index';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Profile extends Component {


  constructor(props) {
    super(props);
    this.state = {
     // userType: ''
     modalVisible: false
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
       <CustomHeader title={`${this.props.user.name} ${this.props.user.lastName}`}/>
       <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
          <View style={styles.imageFrame}>
            {
              this.props.user.photo
              ? <Image style={styles.image} source={{uri: `${this.props.user.photo}`}} />
              : <Ionicons name="person-outline" color={COLORS.darkPrimary} size={100} style={styles.icon}/>
            }
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.imageFrameModal}>
              <Image
                style={styles.imageModal}
                source={this.props.user.photo ? {uri: this.props.user.photo} : require('../../assets/images/user.png')}
              />
            </View>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: COLORS.accent }}
              onPress={() => {
                this.setState({ modalVisible: false})
              }}>
              <Text style={styles.close}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>E-mail </Text>
            <Text style={styles.dataInfo}>{`${this.props.user.email}`}</Text>
          </View>
          <View style={styles.divider}/>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Telefono: </Text>
            <Text style={styles.dataInfo}>{`${this.props.user.phone}`}</Text>
          </View>
          <View style={styles.divider}/>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Tipo de usuario: </Text>
            <Text style={styles.dataInfo}>{`${this.props.user.userType}`}</Text>
          </View>
          <View style={styles.divider}/>
          {
            this.props.user.userType === 'resident'
            ?<View style={styles.dataContainer}>
            <Text style={styles.dataText}>Numero Residente: </Text>
            <Text style={styles.dataInfo}>{`${this.props.user.residentNum}`}</Text>
            </View>
            :null
          }
          {
            this.props.user.userType === 'master'
            ?<View style={styles.dataContainer}>
            <Text style={styles.dataText}>Master num: </Text>
            <Text style={styles.dataInfo}>{`${this.props.user.serviceNum}`}</Text>
            </View>
            :null
          }
          {
            this.props.user.userType === 'supervisor'
            ?<View style={styles.dataContainer}>
            <Text style={styles.dataText}>Numero Supervisor</Text>
            <Text style={styles.dataInfo}>{`${this.props.user.superNum}`}</Text>
            </View>
            :null
          }
          {
            this.props.user.userType === 'guard'
            ?<View style={styles.dataContainer}>
            <Text style={styles.dataText}>Numero Guardia: </Text>
            <Text style={styles.dataInfo}>{`${this.props.user.guardNum}`}</Text>
            </View>
            :null
          }
           {
            this.props.user.userType === 'manager'
            ?<View style={styles.dataContainer}>
            <Text style={styles.dataText}>Numero Guardia: </Text>
            <Text style={styles.dataInfo}>{`${this.props.user.managerNum}`}</Text>
            </View>
            :null
          }
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
  imageFrame: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  userName: {
    marginTop: 5,
    color: COLORS.darkPrimary,
    textAlign: 'center',
    fontSize: 20
  },
  playerInfo: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16
  },
  dataContainer: {
    flexDirection: 'row',
    paddingLeft: '10%'
  },
  dataText: {
    color: COLORS.gray,
    fontSize: 15
  },
  dataInfo: {
    fontSize: 16,
    color: COLORS.white
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 10
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '50%',
  },
  imageFrameModal: {
    marginBottom: 16,
  },
  imageModal: {
    height: 300,
    width: 300
  },
  close: {
    color: COLORS.primary
  }
});


export default Profile;