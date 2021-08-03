import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView, 
  Alert
} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { COLORS } from '../../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from '../../../../config/firebase';
import Dialog from "react-native-dialog";
import CustomHeader from '../../../../components/header/index';

class ResidentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      residentList: [],
      residentNum: '',
      disableResident: false,
      showLoader: false,
      noData: false,
      errorDelete: false,
      error: false,
    };
  }

  async componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener('focus', () => {this.componentDidMount();});
    this.setState({ showLoader: true });
    const residentsArray = [];
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("resident").orderBy('name').get();
      snapshot.forEach((doc) => {
        residentsArray.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        };
      });
      this.setState({ residentList: residentsArray });
      if(residentsArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
  }

  showDialog (residentNum) {
    this.setState({ showDialog: true });
    this.setState({ residentNum: residentNum });
  };

  handleCancel ()  {
    this.setState({showDialog: false})
  };

  handleDelete ()  {
    this.deleteResident()
  };

  deleteResident() {
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('resident').doc(this.state.residentNum).delete()
      .then((res) => {
        this.componentDidMount();
        this.setState({showDialog: false});
      })
      .catch((err) => {
        this.setState({ errorDelete: true });
        console.error("Error: ", err);
      });
  }

  disableResident(resident) {
    //console.log(resident);
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('resident').doc(resident.residentNum).update({
      //disableResident: true,
      disableResident: !resident.disableResident
    }).then((res) => {
      if(!resident.disableResident) {
        Alert.alert("Fereg SR","El residente a sido Bloquedao"); 
      }
      else{
        Alert.alert("Fereg SR","Residente desloqueado"); 
      } 
      this.disableUser(resident);
      this.componentDidMount();
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }

  disableUser(resident) {
    //console.log(resident);
    firebase.firestore().collection('user').doc(resident.email).update({
      //disableResident: true,
      disableResident: !resident.disableResident
    }).then((res) => {
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={"Residentes"}/>
        <ScrollView >
          <View style={styles.addContainer}>
            <Text style={styles.addText}>Agregar Residente: </Text>
            <TouchableOpacity
              style={styles.addButton} 
              onPress={() => this.props.navigation.navigate('AddResident', { condominium: this.props.route.params.condominium })}
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
            this.state.residentList.map((resident,i) => (
              <View key={i}>
                {
                  resident.disableResident 
                  ? <Card style={styles.card} key={resident.residentNumber}>
                  <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ResidentProfile', { resident: resident })}>
                    <View style={styles.cardContentDisable}>
                      <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                      <View style={styles.cardText}>
                        <View style={styles.info}>
                          <Text style={styles.title}>Residente: </Text>
                          <Text style={styles.name}>{resident.name} {resident.lastName}</Text>
                        </View>
                        <View style={styles.info}>
                          <Text style={styles.title}>Casa número: </Text>
                          <Text style={styles.name}>{resident.houseNumber}</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.buttonIcon} 
                            onPress={() => this.disableResident(resident)}
                          >
                            <Ionicons name="eye" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.buttonIcon} 
                            onPress={() => this.props.navigation.navigate('EditResident', { resident: resident, condominium: this.props.route.params.condominium })}
                          >
                            <Ionicons name="md-create" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.buttonIcon} 
                            onPress={() => this.showDialog(resident.residentNum)}
                          >
                            <Ionicons name="md-trash" color={COLORS.accent} size={20} style={styles.icon}/>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Card>
                :<Card style={styles.card} key={resident.residentNumber}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ResidentProfile', { resident: resident })}>
                  <View style={styles.cardContent}>
                    <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                    <View style={styles.cardText}>
                      <View style={styles.info}>
                        <Text style={styles.title}>Residente: </Text>
                        <Text style={styles.name}>{resident.name} {resident.lastName}</Text>
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.title}>Casa número: </Text>
                        <Text style={styles.name}>{resident.houseNumber}</Text>
                      </View>
                      <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                          style={styles.buttonIcon} 
                          onPress={() => this.disableResident(resident)}
                          >
                            <Ionicons name="eye-off" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.buttonIcon} 
                          onPress={() => this.props.navigation.navigate('EditResident', { resident: resident, condominium: this.props.route.params.condominium })}
                        >
                          <Ionicons name="md-create" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.buttonIcon} 
                          onPress={() => this.showDialog(resident.residentNum)}
                        >
                          <Ionicons name="md-trash" color={COLORS.accent} size={20} style={styles.icon}/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
                }
              </View>
              
            ))
          }
          <View>
          <Dialog.Container visible={this.state.showDialog}>
           <Dialog.Title style={styles.dialogDescribre}>Fereg SR</Dialog.Title>
             <Dialog.Description style={styles.dialogDescribre}>
                Esta seguro que desea eliminar a este guardia.
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
  cardContentDisable: {
    flexDirection: 'row',
    borderColor: COLORS.accent,
    borderWidth:1,
    padding: 10, 
  },
  card: {
    width: '95%',
    padding: 10, 
    margin: 10,
    backgroundColor: COLORS.darkGray
  },
  cardContent: {
    flexDirection: 'row',
    padding: 10, 
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
    marginLeft: '60%'
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

export default ResidentList;
