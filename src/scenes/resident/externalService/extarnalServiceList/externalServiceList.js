import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { COLORS } from '../../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from '../../../../config/firebase';
import Dialog from "react-native-dialog";
import CustomHeader from '../../../../components/header/index';

class ExternalServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      externalList: [],
      showLoader: false,
      noData: false,
      errorDelete: false,
      error: false,
      service: '',
      serviceNum: ''
    };
  }

  async componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener('focus', () => {this.componentDidMount();});
    this.setState({ showLoader: true });
    const serviceArray = [];
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("service").orderBy('createDate').get();
      snapshot.forEach((doc) => {
        serviceArray.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        };
      });
      this.setState({ externalList: serviceArray });
      if(serviceArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
  }

  showDialog (serviceNum) {
    this.setState({ showDialog: true });
    this.setState({ serviceNum: serviceNum });
  };

  handleCancel ()  {
    this.setState({showDialog: false})
  };

  handleDelete ()  {
    this.deleteService()
  };

  deleteService() {
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('service').doc(`${this.state.serviceNum}`).delete()
      .then((res) => {
        this.componentDidMount();
        this.setState({showDialog:false});
      })
      .catch((err) => {
        this.setState({ errorDelete: true });
        console.error("Error: ", err);
      });
  }

  render() {
    return (
        <SafeAreaView>
        <CustomHeader title={'Servicio externo'}/>
        <ScrollView style={styles.container}>
          {
            this.props.userType === 'resident'  || this.props.userType === 'master'
            ?<View style={styles.addContainer}>
            <Text style={styles.addText}>Solicitar servicio: </Text>
            <TouchableOpacity
              style={styles.addButton} 
              onPress={() => this.props.navigation.navigate('ExternalService', { condominium: this.props.route.params.condominium })}
            >
              <Ionicons name="md-add-circle" color={COLORS.darkPrimary} size={30} style={styles.icon}/>
            </TouchableOpacity>
          </View>
            :null
          }
          
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
            this.state.externalList.map((service, i) => (
              <Card style={styles.card} key={i}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ExternalServiceProfile', { service: service })}>
                  <View style={styles.cardContent}>
                    <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                    <View style={styles.cardText}>
                      <View style={styles.info}>
                        <Text style={styles.title}>Nombre: </Text>
                        <Text style={styles.name}>{service.name}</Text>
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.title}>Servicio: </Text>
                        <Text style={styles.name}>{service.type}</Text>
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.title}>Vehiculo: </Text>
                        <Text style={styles.name}>{service.brand}</Text>
                      </View>

                      {
                         this.props.userType === 'resident'  || this.props.userType === 'master'
                        ?<View style={styles.buttonsContainer}>
                        <TouchableOpacity
                          style={styles.buttonIcon} 
                          onPress={() => this.props.navigation.navigate('ExternalServiceEdit', { externalService: service, condominium: this.props.route.params.condominium })}
                        >
                          <Ionicons name="md-create" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.buttonIcon} 
                          onPress={() => this.showDialog(service.serviceNum)}
                        >
                          <Ionicons name="md-trash" color={COLORS.accent} size={20} style={styles.icon}/>
                        </TouchableOpacity>
                      </View>
                      :null
                      }
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
                Esta seguro que desea eliminar este servicio.
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
    paddingTop: 10,
    backgroundColor: COLORS.darkGray,
    height: '100%'
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
    marginLeft: 16,
  },
  name: {
    marginLeft: 8,
    color: COLORS.white,
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
  noData: {
    textAlign: 'center',
    color: COLORS.darkPrimary,
     marginTop: 12
   }
});

export default ExternalServiceList;
