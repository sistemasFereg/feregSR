import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Share,
  Modal,
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';
import CustomHeader from '../../../components/header';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ProviderProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      provider: this.props.provider,
      modalVisible: false
    };
  }

  async openShareScreen() {
    if(this.state.provider.qrCode) {
      let options = {
        title: 'Share Title',
        message: 'Por favor descarga tu código QR, del siguiente enlace: ',
        url: this.state.provider.qrCode,
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
      <SafeAreaView style={styles.container}>
        <CustomHeader title={`${this.state.provider.name} ${this.state.provider.lastName}`}/>
        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
          <View style={styles.imageFrame}>
            {
              this.state.provider.photo
              ? <Image style={styles.image} source={{uri: `${this.state.provider.photo}`}} />
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
                source={this.state.provider.photo ? {uri: this.state.provider.photo} : require('../../../assets/images/user.png')}
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
            <Text style={styles.dataText}>Marca: </Text>
            <Text style={styles.dataInfo}>{this.state.provider.brand}</Text>
          </View>
          <View style={styles.divider}/>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Número de proveedor: </Text>
            <Text style={styles.dataInfo}>{this.state.provider.providerNumber}</Text>
          </View>
          <View style={styles.divider}/>
          {
            this.state.provider.qrCode
            ? <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                <TouchableOpacity onPress={() => this.openShareScreen()}>
                  <View style={styles.code}>
                    <Image
                      style={styles.codeContainer}
                      source={{uri: this.state.provider.qrCode}}
                    />
                  </View>
                </TouchableOpacity>
              </ViewShot>
            : null
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
  codeContainer: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    margin: 5,
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
  },
});


export default ProviderProfile;