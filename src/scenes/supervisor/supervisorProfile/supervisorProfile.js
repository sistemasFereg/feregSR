import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import CustomHeader from '../../../components/header';
import Ionicons from 'react-native-vector-icons/Ionicons';

class SupervisorProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      supervisor: this.props.supervisor,
      modalVisible: false,
      error: false
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={`${this.state.supervisor.name} ${this.state.supervisor.lastName}`}/>
        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
          <View style={styles.imageFrame}>
            {
              this.state.supervisor.photo
              ? <Image style={styles.image} source={{uri: `${this.state.supervisor.photo}`}} />
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
                source={this.state.supervisor.photo ? {uri: this.state.supervisor.photo} : require('../../../assets/images/user.png')}
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
            <Text style={styles.dataText}>Telefono: </Text>
            <Text style={styles.dataInfo}>{this.state.supervisor.phone}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Correo: </Text>
            <Text style={styles.dataInfo}>{this.state.supervisor.email}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Numero: </Text>
            <Text style={styles.dataInfo}>{this.state.supervisor.superNum}</Text>
          </View>
          <View style={styles.divider}/>
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
  codeContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 16
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

export default SupervisorProfile;