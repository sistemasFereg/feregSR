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
import { COLORS } from '../../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from '../../../../config/firebase';
import Dialog from "react-native-dialog";
import CustomHeader from '../../../../components/header';

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkList: [],
      userType: '',
      showDialog: false,
      error: false,
      name: '',
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
    const checkArray = [];
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('check').orderBy('initDate').get();
      snapshot.forEach((doc) => {
        let data = {
          id: doc.id,
          data: doc.data()
        }
        checkArray.push(data);
        if(doc) {
          this.setState({ showLoader: false });
        }
      });
      this.setState({ checkList: checkArray });
      if(checkArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
  }
  
  showDialog (check) {
    this.setState({ showDialog: true });
    this.setState({ name: check.id });
  };

  handleCancel ()  {
    this.setState({showDialog: false})
  };

  handleDelete ()  {
    this.deleteCheck()
  };

  deleteCheck() {
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('check').doc(this.state.name).delete()
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
        <CustomHeader title={'Lista de tareas'}/>
        <ScrollView style={styles.container}>
          {
            this.state.userType == 'master'
            ?  <View style={styles.addContainer}>
                  <Text style={styles.addText}>Agregar Tarea: </Text>
                  <TouchableOpacity
                    style={styles.addButton} 
                    onPress={() => this.props.navigation.navigate('CheckCreate', { condominium: this.props.route.params.condominium })}
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
            this.state.checkList.map((check, i) => (
              <View key={i}>
                <Card style={styles.card}>
                  <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CheckProfile', { check: check })}>
                    <View style={styles.cardContent}>
                      <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                      <View style={styles.cardText}>
                        <View style={styles.info}>
                          <Text style={styles.title}>Nombre: </Text>
                          <Text style={styles.name}>{check.data.name}</Text>
                        </View>
                        <View style={styles.info}>
                          <Text style={styles.title}>Fecha: </Text>
                          <Text style={styles.name}>{check.data.initDate}</Text>
                        </View>
                        {
                          this.state.userType == 'master'
                          ? <View style={styles.buttonsContainer}>
                              <TouchableOpacity
                                style={styles.buttonIcon} 
                                onPress={() => this.props.navigation.navigate('CheckEdit', { check: check, condominium: this.props.route.params.condominium })}
                              >
                                <Ionicons name="md-create" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.buttonIcon} 
                                onPress={()=>this.showDialog(check)}
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
                  ¿Esta seguro que desea eliminar esta tarea?.
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

export default CheckList;
