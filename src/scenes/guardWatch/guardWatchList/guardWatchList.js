import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { COLORS } from '../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from '../../../config/firebase';
import Dialog from "react-native-dialog";
import CustomHeader from '../../../components/header';

class GuardWatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guardList: [],
      userName: '',
      fullDate: '',
      showLoader: false,
      showDialog: false,
      noData: false,
      errorDelete: false,
      error: false,
    };
  }

  async componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener('focus', () => {this.componentDidMount();});
    this.setState({ showLoader: true });
    const guardsArray = [];
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("guardWatch").orderBy('dateInit').get();
    snapshot.forEach((doc) => {
      guardsArray.push(doc.data());
      if(doc) {
        this.setState({ showLoader: false });
      };
    });
    this.setState({ guardList: guardsArray });
    if(guardsArray.length === 0) {
      this.setState({ noData: true });
      this.setState({ showLoader: false });
    }
    else {
      this.setState({ noData: false });
    }
  }

  showDialog (guard) {
    this.setState({showDialog:true});
    let fullDate = `${guard.name} - ${guard.dateInit}`;
    this.setState({ fullDate: fullDate });
  };

  handleCancel ()  {
    this.setState({showDialog:false})
  };

  handleDelete ()  {
    this.deleteGuard()
  };

  deleteGuard() {
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("guardWatch").doc(this.state.fullDate).delete()
      .then((res) => {
        this.componentDidMount();
        this.setState({showDialog:false});
      })
      .catch((err) => {
        this.setState({ errorDelete: true });
        console.error("Error: ", err);
      });
  }

  goToDetail(guard) {
    if(this.props.route.params.userType === 'admin' || this.props.route.params.userType === 'master' || this.props.route.params.userType === 'supervisor') {
      this.props.navigation.navigate('GuardWatchDetail', { guard: guard, condominium: this.props.route.params.condominium})
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={"Rondines"}/>
        <ScrollView style={styles.container}>
          {
            this.props.route.params.userType === 'guard' || this.props.route.params.userType === 'master'
            ? <View style={styles.addContainer}>
                <Text style={styles.addText}>Agregar Rondín: </Text>
                <TouchableOpacity
                  style={styles.addButton} 
                  onPress={() => this.props.navigation.navigate('GuardWatchCreate', {condominium: this.props.route.params.condominium})}
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
            this.state.guardList.map((guard, i) => (
              <Card style={styles.card} key={i}>
                <TouchableOpacity style={styles.button} onPress={() => this.goToDetail(guard)}>
                  <View style={styles.cardContent}>
                    <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                    <View style={styles.cardText}>
                      <View style={styles.info}>
                        <Text style={styles.title}>Guardia: </Text>
                        <Text style={styles.name}>{guard.name} {guard.lastName}</Text>
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.title}>Fecha inicio: </Text>
                        <Text style={styles.name}>{guard.dateInit}</Text>
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.title}>Fecha fin: </Text>
                        {
                          guard.isFinish === false
                          ? <Text style={styles.name}>Rondín en progreso</Text>
                          : <Text style={styles.name}>{guard.dateEnd}</Text>
                        }
                      </View>
                      {
                        this.props.route.params.userType === 'master'
                        ? <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                              style={styles.buttonIcon} 
                              onPress={() => this.props.navigation.navigate('GuardWatchEdit', { guard: guard , condominium: this.props.route.params.condominium})}
                            >
                              <Ionicons name="md-create" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.buttonIcon} 
                              onPress={()=>this.showDialog(guard)}
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
            ))
          }
          <View>
          <Dialog.Container visible={this.state.showDialog}>
           <Dialog.Title style={styles.dialogDescribre}>Fereg SR</Dialog.Title>
             <Dialog.Description style={styles.dialogDescribre}>
                Esta seguro que desea eliminar este rondin.
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
    paddingTop: 10,
    backgroundColor: COLORS.darkGray,
    flex: 1
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
    backgroundColor: COLORS.darkGray,
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

export default GuardWatchList;
