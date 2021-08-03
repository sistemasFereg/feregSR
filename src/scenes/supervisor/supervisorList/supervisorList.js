import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { COLORS } from '../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from '../../../config/firebase';
import Dialog from "react-native-dialog";
import CustomHeader from '../../../components/header';

class SupervisorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supervisorList: [],
      userType: '',
      showDialog: false,
      showInputDialog: false,
      superNum: '',
      supervisor: null,
      condominium: '',
      showLoader: false,
      noData: false,
      errorDelete: false,
      error: false,
    };
  }

  async componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener('focus', () => {this.componentDidMount();});
    this.setState({ showLoader: true });
    this.setState({ userType: this.props.userType})
    const supervisorsArray = [];
    var snapshot = await firebase.firestore().collection('user').where('userType', '==','supervisor').get();
    snapshot.forEach((doc) => {
      supervisorsArray.push(doc.data());
      if(doc) {
        this.setState({ showLoader: false });
      }
    });
    this.setState({ supervisorList: supervisorsArray });
    if(supervisorsArray.length === 0) {
      this.setState({ noData: true });
      this.setState({ showLoader: false });
    }
    else {
      this.setState({ noData: false });
    }
  }
  
  showDialog (supervisor) {
    this.setState({ showDialog: true });
    this.setState({ superNum: supervisor.email });
  };

  handleCancel ()  {
    this.setState({showDialog: false});
    this.setState({showInputDialog: false});
  };

  handleDelete ()  {
    this.deleteSupervisor();
  };

  showInputDialog (supervisor) {
    this.setState({ showInputDialog: true });
    this.setState({ supervisor: supervisor });
  };

  handleAsign ()  {
    this.asignSupervisor()
  };

  asignSupervisor() {
    firebase.firestore().collection("condominium").doc(`${this.state.condominium}`).collection('supervisor').doc(`${this.state.supervisor.superNum}`).set({
      name: this.state.supervisor.name,
      lastName: this.state.supervisor.lastName,
      userType: this.state.supervisor.userType,
      superNum: this.state.supervisor.superNum,
      email: this.state.supervisor.email,
      condominium: this.state.condominium
    }).then((res) => {
      Alert.alert("Fereg SR","Supervisor asignado exitosamente");
      this.handleCancel();
      this.setState({ error: false});
    })
    .catch((err) => {
      console.error("Error found: ", err);
      this.setState({ error: true});
    });
  }

  deleteSupervisor() {
    firebase.firestore().collection('user').doc(this.state.superNum).delete()
      .then((res) => {
        this.componentDidMount();
        this.setState({showDialog:false})
      })
      .catch((err) => {
        this.setState({ errorDelete: true });
        console.error("Error: ", err);
      });
  }

  render() {
    return (
      <SafeAreaView>
        <CustomHeader title={'Supervisores'}/>
        <ScrollView style={styles.container}>
          {
            this.state.userType == 'master'
            ? <View style={styles.addContainer}>
                <Text style={styles.addText}>Agregar Supervisor: </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('CreateSupervisor')}
                >
                  <Ionicons name="md-add-circle" color={COLORS.darkPrimary} size={30} style={styles.icon}/>
                </TouchableOpacity>
              </View>
            : null
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
            this.state.error
            ? <Text style={styles.noData}>Error al guardar la información</Text>
            : null
          }
          {
            this.state.supervisorList.map((supervisor, i) => (
              <View key={i}>
                <Card style={styles.card}>
                  <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('supervisorProfile', { supervisor: supervisor })}>
                    <View style={styles.cardContent}>
                      <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                      <View style={styles.cardText}>
                        <View style={styles.info}>
                          <Text style={styles.title}>Supervisor: </Text>
                          <Text style={styles.name}>{supervisor.name} {supervisor.lastName}</Text>
                        </View>
                        {
                          this.state.userType == 'master'
                          ? <View style={styles.buttonsContainer}>
                              <TouchableOpacity
                                style={styles.buttonIcon} 
                                onPress={()=>this.showInputDialog(supervisor)}
                              >
                                <Ionicons name="md-add-circle" color={COLORS.accent} size={20} style={styles.icon}/>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.buttonIcon} 
                                onPress={() => this.props.navigation.navigate('EditSupervisor', { supervisor: supervisor})}
                              >
                                <Ionicons name="md-create" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.buttonIcon} 
                                onPress={()=>this.showDialog(supervisor)}
                              >
                                <Ionicons name="md-trash" color={COLORS.accent} size={20} style={styles.icon}/>
                              </TouchableOpacity>
                            </View>
                          : null
                        }
                      </View>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
            ))
          }
          <View>
            <Dialog.Container visible={this.state.showDialog}>
              <Dialog.Title style={styles.dialogDescribre}>Fereg SR</Dialog.Title>
              <Dialog.Description style={styles.dialogDescribre}>
                Esta seguro que desea eliminar a este supervisor.
              </Dialog.Description>
              <Dialog.Button label="Cancelar" color={COLORS.accent} onPress={()=>this.handleCancel()} />
              <Dialog.Button label="Confirmar" color={COLORS.darkPrimary} onPress={()=>{this.handleDelete()}} />
            </Dialog.Container>
          </View>
          <View>
            <Dialog.Container visible={this.state.showInputDialog}>
              <Dialog.Title style={styles.dialogDescribre}>Fereg SR</Dialog.Title>
              <Dialog.Description style={styles.dialogDescribre}>
                Ingresa el condominio donde asignaras al supervisor.
              </Dialog.Description>
              <Dialog.Input 
                label='Condominio' 
                onChangeText={(value) => this.setState({ condominium: value })}
              />
              <Dialog.Button label="Cancelar" color={COLORS.accent} onPress={()=>this.handleCancel()} />
              <Dialog.Button label="Confirmar" color={COLORS.darkPrimary} onPress={() => this.handleAsign()} />
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
    color: COLORS.white,
  },
  description: {
    marginLeft: 16
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginLeft: '65%'
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

export default SupervisorList;
