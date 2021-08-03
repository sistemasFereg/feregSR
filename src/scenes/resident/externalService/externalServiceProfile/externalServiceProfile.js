import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Share
} from 'react-native';
import { COLORS } from '../../../../assets/styles/variables';
import CustomHeader from '../../../../components/header';
import ViewShot from "react-native-view-shot";

class ExternalServiceProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      service: this.props.service,
      error: false
    };
  }

  async openShareScreen() {
    if(this.state.service.qrCode) {
      let options = {
        title: 'Share Title',
        message: 'Por favor descarga tu código QR, del siguiente enlace: ',
        url: this.state.service.qrCode,
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
        <CustomHeader title={this.state.service.type}/>
        <ScrollView>
          <View style={styles.playerInfo}>
            <View>
              <Text style={styles.midTitle}>Datos de entrega </Text>
            </View>
            <View style={styles.divider}/>
            <Text style={styles.dataInfo}>Nombre: {this.state.service.name}</Text>
            <View style={styles.divider}/>
            <Text style={styles.dataInfo}>Apellidos: {this.state.service.lastName}</Text>
            <View style={styles.divider}/>
            <Text style={styles.dataInfo}>Numero de casa: {this.state.service.houseNum}</Text>
            <View style={styles.divider}/>
            <View>
              <Text style={styles.midTitle}>Datos de vehiculo </Text>
            </View>
            <View style={styles.divider}/>
            <Text style={styles.dataInfo}>Placas: {this.state.service.plates}</Text>
            <View style={styles.divider}/>
            <Text style={styles.dataInfo}>Vehiculo: {this.state.service.brand}</Text>
            <View style={styles.divider}/>
            <Text style={styles.dataInfo}>Color: {this.state.service.color}</Text>
            <View style={styles.divider}/>
            <View>
              <Text style={styles.midTitle}>Fechas </Text>
            </View>
            <View style={styles.divider}/>
            <Text style={styles.dataInfo}>Fecha entrada: {this.state.service.initDate}</Text>
            <View style={styles.divider}/>
            <Text style={styles.dataInfo}>Fecha terminacion: {this.state.service.endDate}</Text>
            <View style={styles.divider}/>
            <Text style={styles.dataInfo}>Fecha limite de ingreso: {this.state.service.limitDate}</Text>
            <View style={styles.divider}/>
          </View>
          {
            this.state.service.qrCode
            ? <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                <TouchableOpacity onPress={() => this.openShareScreen()}>
                  <View style={styles.code}>
                    <Image
                      style={styles.codeContainer}
                      source={{uri: this.state.service.qrCode}}
                    />
                  </View>
                </TouchableOpacity>
              </ViewShot>
            : null
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    height: '100%'
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
    paddingLeft: '10%',
    justifyContent: 'center'
   
  },
  dataText: {
    color: COLORS.gray,
    fontSize: 16,
  },
  dataInfo: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
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
  midTitle: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    backgroundColor: COLORS.darkPrimary,
  },
});

export default ExternalServiceProfile ;