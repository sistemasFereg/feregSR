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

class IncidentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidentList: [],
      showLoader: false,
      showDialog: false,
      noData: false,
      errorDelete: false,
      error: false,
      incidentNumber: ''
    };
  }

  async componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener('focus', () => {this.componentDidMount();});
    this.setState({ showLoader: true });
    const incidentArray = [];
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.condominium.name}`).collection("incident").orderBy('createDate').get();
      snapshot.forEach((doc) => {
        incidentArray.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        };
      });
      this.setState({ incidentList: incidentArray });
      //console.log(incidentArray)
      if(incidentArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
  }

  showDialog (incidentNumber) {
    // console.log(incidentNumber,'este ocupo')
    this.setState({showDialog: true});
    this.setState({ incidentNumber: incidentNumber });
  };

  handleCancel ()  {
    this.setState({showDialog:false})
  };

  handleDelete ()  {
    this.deleteIncident()
  };

  deleteIncident() {
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('incident').doc(`${this.state.incidentNumber}`).delete()
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
      <SafeAreaView style={styles.mainContainer}>
        <CustomHeader title={"Incidentes"}/>
        <ScrollView style={styles.container}>
          <View style={styles.addContainer}>
            <Text style={styles.addText}>Agregar Incidente: </Text>
            <TouchableOpacity
              style={styles.addButton} 
              onPress={() => this.props.navigation.navigate('IncidentCreate', { condominium: this.props.route.params.condominium })}
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
            this.state.incidentList.map((incident, i) => (
              <Card style={styles.card} key={i}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('IncidentProfile', { incident: incident })}>
                  <View style={styles.cardContent}>
                    <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                    <View style={styles.cardText}>
                      <View style={styles.info}>
                        <Text style={styles.title}>Título: </Text>
                        <Text style={styles.name}>{incident.title}</Text>
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.title}>Fecha: </Text>
                        <Text style={styles.name}>{incident.date}</Text>
                      </View>
                      {/* <View style={styles.info}>
                        <Text style={styles.title}>Comentario: </Text>
                        <Text style={styles.name}>{incident.data.comment}</Text>
                      </View> */}
                      {
                        this.props.route.params.userType === 'admin'  || this.props.route.params.userType=== 'master'
                         ?<View style={styles.buttonsContainer}>
                          {/* <TouchableOpacity
                            style={styles.buttonIcon} 
                            onPress={() => this.props.navigation.navigate('EditIncident', { incident: incident, condominium: this.props.route.params.condominium })}
                          >
                            <Ionicons name="md-create" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                          </TouchableOpacity> */}
                            
                            <TouchableOpacity
                              style={styles.buttonIcon} 
                              onPress={()=>this.showDialog(incident.incidentNumber)}
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
        </ScrollView>
        <View>
          <Dialog.Container visible={this.state.showDialog}>
           <Dialog.Title style={styles.dialogDescribre}>Fereg SR</Dialog.Title>
             <Dialog.Description style={styles.dialogDescribre}>
                Esta seguro que desea eliminar a este incidente.
              </Dialog.Description>
            <Dialog.Button label="Cancelar" color={COLORS.accent} onPress={()=>this.handleCancel()} />
           <Dialog.Button label="Confirmar" color={COLORS.darkPrimary} onPress={()=>{this.handleDelete()}} />
          </Dialog.Container>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 45,
    backgroundColor: COLORS.darkGray,
  },
  container: {
    height: '100%',
    backgroundColor: COLORS.darkGray,
    paddingTop: 10,
    
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

export default IncidentList;
