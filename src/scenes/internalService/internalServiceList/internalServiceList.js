import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView 
} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { COLORS } from '../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from '../../../config/firebase';
import Dialog from "react-native-dialog";
import CustomHeader from '../../../components/header';

class InternalServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internalServiceList: [],
      internalServiceNumber: '',

    };
  }

  async componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener('focus', () => {this.componentDidMount();});
    this.setState({ showLoader: true });
    
    if(this.props.user.userType === 'admin'){
      const personalArray = [];
      // No se pueden ordenar cuando se usa el == para obtener los datos
      var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("personal").where('isCondominium', '==', true).get();
      snapshot.forEach((doc) => {
        personalArray.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        };
      });
      this.setState({ internalServiceList: personalArray });
      if(personalArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
    }
    else {
      const personalArray = [];
      var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("personal").where('isCondominium', '==', false).get();
      snapshot.forEach((doc) => {
        personalArray.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        };
      });
      this.setState({ internalServiceList: personalArray });
      
      if(personalArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
    }
  }

  showDialog (serviceNum) {
    this.setState({showDialog: true});
    this.setState({ internalServiceNumber: serviceNum });
  };

  handleCancel ()  {
    this.setState({showDialog: false})
  };

  handleDelete ()  {
    this.deleteInternalService()
  };

  deleteInternalService() {
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('personal').doc(`${this.state.internalServiceNumber}`).delete()
      .then((res) => {
        
        this.componentDidMount();
        this.setState({showDialog: false});
      })
      .catch((err) => {
        console.error("Error: ", err);
        this.setState({ errorDelete: true });
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={"Personal de Servicio"}/>
        <ScrollView>
          <View style={styles.addContainer}>
            <Text style={styles.addText}>Agregar Personal: </Text>
            <TouchableOpacity
              style={styles.addButton} 
              onPress={() => this.props.navigation.navigate('InternalServiceCreate', { condominium: this.props.route.params.condominium })}
            >
              <Ionicons name="md-add-circle" color={COLORS.darkPrimary} size={30} style={styles.icon}/>
            </TouchableOpacity>
          </View>
          {
            this.state.showLoader
            ? <View style={styles.loaderContainer}>
                <ActivityIndicator false size="small" color={COLORS.darkPrimary} />
              </View>
            : null
          }
          {
            this.state.noData
            ? <Text style={styles.noData}>Aún no hay información</Text>
            : null
          }
          {
            this.state.errorDelete
            ? <Text style={styles.noData}>Error al eliminar la información</Text>
            : null
          }
          {
            this.state.internalServiceList.map((service, i) => (
              <Card style={styles.card} key={i}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('InternalServiceProfile', { internalService: service })}>
                  <View style={styles.cardContent}>
                    <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                    <View style={styles.cardText}>
                      <View style={styles.info}>
                        <Text style={styles.title}>Persona: </Text>
                        <Text style={styles.name}>{service.name} {service.lastName}</Text>
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.title}>Número de personal: </Text>
                        <Text style={styles.name}>{service.internalServiceNumber}</Text>
                      </View>
                      {
                        this.props.user.userType === 'admin' && service.type
                        ? <View style={styles.info}>
                            <Text style={styles.title}>Tipo: </Text>
                            <Text style={styles.name}>{service.type}</Text>
                          </View>
                        : null
                      }
                      <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                          style={styles.buttonIcon} 
                          onPress={() => this.props.navigation.navigate('InternalServiceEdit', { internalService: service, condominium: this.props.route.params.condominium })}
                        >
                          <Ionicons name="md-create" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.buttonIcon} 
                          onPress={()=>this.showDialog(service.internalServiceNumber)}
                        >
                          <Ionicons name="md-trash" color={COLORS.accent} size={20} style={styles.icon}/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            ))
          }
          <View>
          <Dialog.Container visible={this.state.showDialog}>
           <Dialog.Title style={styles.dialogDescribre}>Fereg SR</Dialog.Title>
             <Dialog.Description style={styles.dialogDescribre}>
                Esta seguro que desea eliminar al personal.
              </Dialog.Description>
            <Dialog.Button label="Cancelar" color={COLORS.accent} onPress={()=>this.handleCancel()} />
           <Dialog.Button label="Confirmar" color={COLORS.darkPrimary} onPress={()=>{this.handleDelete()}} />
          </Dialog.Container>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.darkGray,
    paddingTop: 10
  },
  header: {
    textAlign: 'center',
    color: COLORS.darkPrimary,
    fontSize: 20
  },
  card: {
    width: '95%',
    padding: 10, 
    margin: 10,
    backgroundColor: COLORS.darkGray
  },
  cardContent: {
    flexDirection: 'row',
  },
  icon: {
    color: COLORS.darkPrimary,
    marginTop: 5
  },
  cardText: {
    flexDirection: 'column',
  },
  info: {
    flexDirection: 'row',
    marginBottom: 5
  },
  title: {
    color: COLORS.darkPrimary,
    marginLeft: 16
  },
  name: {
    marginLeft: 8,
    color: COLORS.white
  },
  description: {
    marginLeft: 16
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginLeft: '70%'
  },
  buttonIcon: {
    marginLeft: 10
  },
  addContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginEnd: 20
  },
  addText: {
    color: COLORS.darkPrimary,
    marginTop: 12
  },
  dialogDescribre: {
    textAlign: 'center'
  },
  noData: {
    textAlign: 'center',
    color: COLORS.darkPrimary,
    marginTop: 12
  }
});

export default InternalServiceList;
