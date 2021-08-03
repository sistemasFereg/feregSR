import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import CustomHeader from '../../../components/header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from '../../../config/firebase';

class GuardProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guard: '',
      error: false,
      modalVisible: false,
      userType: ''
    };
  }
  async componentDidMount() {
    this.setState({ userType: this.props.userType});
    var snapshot = await firebase.firestore().collection('user').where('guardNum', '==',this.props.guard.guardNum).get();
    //this.setState({guard: snapshot.data()});
    snapshot.forEach((doc) => {
      this.setState({ guard: doc.data()})
      console.log(this.props);
    });
  
      
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={`${this.state.guard.name} ${this.state.guard.lastName}`}/>
        <ScrollView>
        <Text style={styles.midTitle}>Datos colaborador</Text>
        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
          <View style={styles.imageFrame}>
            {
              this.state.guard.photo
              ? <Image style={styles.image} source={{uri: `${this.state.guard.photo}`}} />
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
                source={this.state.guard.photo ? {uri: this.state.guard.photo} : require('../../../assets/images/user.png')}
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
            <Text style={styles.dataText}>Fecha de inicio: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.initDate}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Nombre: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.name}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Apellidos: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.lastName}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Email: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.email}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>CURP: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.curp}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Numero de seguro: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.nss}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>RFC: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.rfc}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Folio: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.guardNum}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Antiguedad: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.antiguedad}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Estado civil: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.eCivil}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Escolaridad: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.escolaridad}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Lugar de nacimiento: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.nacimiento}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Fecha de nacimiento: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.naciDate}</Text>
          </View>
          <View style={styles.divider}/>
        </View>

        {
          this.props.route.params.userType === 'master' || this.props.route.params.userType === 'manager' || this.props.route.params.userType === 'RH'
          ? <View>
          <Text style={styles.midTitle}>Domicilio particular</Text>
  
          <View style={styles.playerInfo}>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Calle: </Text>
              <Text style={styles.dataInfo}>{this.state.guard.calle}</Text>
            </View>
            <View style={styles.divider}/>
          </View>
          <View style={styles.playerInfo}>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Colonia: </Text>
              <Text style={styles.dataInfo}>{this.state.guard.colonia}</Text>
            </View>
            <View style={styles.divider}/>
          </View>
          <View style={styles.playerInfo}>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Numero interior: </Text>
              <Text style={styles.dataInfo}>{this.state.guard.numInterior}</Text>
            </View>
            <View style={styles.divider}/>
          </View>
          <View style={styles.playerInfo}>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Ciudad: </Text>
              <Text style={styles.dataInfo}>{this.state.guard.ciudad}</Text>
            </View>
            <View style={styles.divider}/>
          </View>
          <View style={styles.playerInfo}>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Codigo postal: </Text>
              <Text style={styles.dataInfo}>{this.state.guard.postal}</Text>
            </View>
            <View style={styles.divider}/>
          </View>
          <View style={styles.playerInfo}>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Zona: </Text>
              <Text style={styles.dataInfo}>{this.state.guard.zona}</Text>
            </View>
            <View style={styles.divider}/>
          </View>
          <View style={styles.playerInfo}>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Servicio: </Text>
              <Text style={styles.dataInfo}>{this.state.guard.servicio}</Text>
            </View>
            <View style={styles.divider}/>
          </View>
          <View style={styles.playerInfo}>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Supervisor: </Text>
              <Text style={styles.dataInfo}>{this.state.guard.supervi}</Text>
            </View>
            <View style={styles.divider}/>
          </View>
          <View style={styles.playerInfo}>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Turno: </Text>
              <Text style={styles.dataInfo}>{this.state.guard.turno}</Text>
            </View>
            <View style={styles.divider}/>
          </View> 
          </View>
          :null

        }

        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Fecha de asignacion: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.asigDate}</Text>
          </View>
          <View style={styles.divider}/>
        </View>

        <Text style={styles.midTitle}>Evaluaciones Psicometriscas, Antidoping, Juridica y Social</Text>

        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Fecha de prueba: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.pruebaDate}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Prueba: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.prueba}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Resultados: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.resultaPrueba}</Text>
          </View>
          <View style={styles.divider}/>
        </View>

        <Text style={styles.midTitle}>Capasitaciones</Text>

        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Curso: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.curso}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Modulo: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.modulo}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Resultados: </Text>
            <Text style={styles.dataInfo}>{this.state.guard.resultados}</Text>
          </View>
          <View style={styles.divider}/>
        </View>

        </ScrollView>
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

export default GuardProfile;