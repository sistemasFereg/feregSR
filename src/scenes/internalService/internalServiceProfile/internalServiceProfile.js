import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Share,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';
import CustomHeader from '../../../components/header';
import Ionicons from 'react-native-vector-icons/Ionicons';

class InternalServiceProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      internalService: this.props.internalService,
      modalVisible: false
    };
  }

  componentDidMount() {
    console.log(this.props.internalService)
  }

  async openShareScreen() {
    if(this.state.internalService.internalServiceNumber) {
      let options = {
        title: 'Share Title',
        message: 'Por favor descarga tu código QR, del siguiente enlace: ',
        url: this.state.resident.qrCode,
        type: 'image/jpeg',
      };
      Share.share(options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <CustomHeader title={`${this.state.internalService.name} ${this.state.internalService.lastName}`}/>
        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
          <View style={styles.imageFrame}>
            {
              this.state.internalService.photo
              ? <Image style={styles.image} source={{uri: `${this.state.internalService.photo}`}} />
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
                source={this.state.internalService.photo ? {uri: this.state.internalService.photo} : require('../../../assets/images/user.png')}
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
            <Text style={styles.dataText}>Número de Personal: </Text>
            <Text style={styles.dataInfo}>{this.state.internalService.internalServiceNumber}</Text>
          </View>
          <View style={styles.divider}/>
          {
            this.props.user.userType == 'admin'
            ? <View style={styles.dataContainer}>
                <Text style={styles.dataText}>Tipo: </Text>
                <Text style={styles.dataInfo}>{this.state.internalService.type}</Text>
              </View>
            : null
          }
          {
            this.props.user.userType == 'admin'
            ? <View style={styles.divider}/>
            : null
          }
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Día</Text>
              <Text style={styles.rowTitle}>Entrada</Text>
              <Text style={styles.rowTitle}>Salida</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>Lunes</Text>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.mondayInit}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.mondayEnd}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>Martes</Text>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.tuesdayInit}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.tuesdayEnd}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>Miercoles</Text>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.wednesdayInit}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.wednesdayEnd}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>Jueves</Text>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.thursdayInit}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.thursdayEnd}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>Viernes</Text>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.fridayInit}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.fridayEnd}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>Sabado</Text>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.saturdayInit}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.saturdayEnd}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>Domingo</Text>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.sundayInit}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.dateText}>{this.state.internalService.sundayEnd}</Text>
              </View>
            </View>
          </View>
          {
            this.state.internalService.qrCode
            ? <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                <TouchableOpacity onPress={() => this.openShareScreen()}>
                  <View style={styles.code}>
                    <Image
                      style={styles.codeContainer}
                      source={{uri: this.state.internalService.qrCode}}
                    />
                  </View>
                </TouchableOpacity>
              </ViewShot>
            : null
          }
        </View>
      </ScrollView>
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
    alignSelf: 'center',
    width: 200,
    height: 200,
    margin: 5,
  },
  table: {
    width: '100%'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  rowTitle: {
    backgroundColor: COLORS.darkPrimary,
    width: '33%',
    textAlign: 'center',
    borderColor: COLORS.darkPrimary,
    borderWidth: 1,
    padding: 5,
    color: COLORS.white,
  },
  rowText: {
    width: '33%',
    textAlign: 'center',
    borderColor: COLORS.darkPrimary,
    borderWidth: 1,
    padding: 5,
    color: COLORS.white,
  },
  dateText: {
    alignSelf: 'center',
    color: COLORS.white,
  },
  code: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    width: 210,
    height: 210,
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


export default InternalServiceProfile;