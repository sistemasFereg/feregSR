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

class VisitorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitorList: [],
      showLoader: false,
      noData: false,
      errorDelete: false,
      error: false,
    };
  }

  async componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener('focus', () => {this.componentDidMount();});
    this.setState({ showLoader: true });
    const visitorArray = [];
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("visitor").orderBy('createDate').get();
      snapshot.forEach((doc) => {
        visitorArray.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        };
      });
      this.setState({ visitorList: visitorArray });
      if(visitorArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
  }
  
  showDialog (visitor) {
    //console.log('Guard: ', guard)
    this.setState({showDialog: true});
  };

  handleCancel ()  {
    this.setState({showDialog: false})
  };

  handleDelete ()  {
    this.deleteVisitor()
  };

  deleteVisitor() {
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('visitor').doc(visitorId).delete()
      .then((res) => {
        this.componentDidMount();
      })
      .catch((err) => {
        this.setState({ errorDelete: true });
        console.error("Error: ", err);
      });
  }

  render() {
    return (
      <SafeAreaView>
        <CustomHeader title={'Visitantes'}/>
        <ScrollView style={styles.container}>
          <View style={styles.addContainer}>
            <Text style={styles.addText}>Agregar Visitante: </Text>
            <TouchableOpacity
              style={styles.addButton} 
              onPress={() => this.props.navigation.navigate('AddVisitor', { condominium: this.props.route.params.condominium })}
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
            this.state.visitorList.map((visitor, i) => (
              <Card style={styles.card} key={i}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('VisitorProfile', { visitor: visitor, condominium: this.props.route.params.condominium})}>
                  <View style={styles.cardContent}>
                    <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                    <View style={styles.cardText}>
                      <View style={styles.info}>
                        <Text style={styles.title}>Visitor: </Text>
                        <Text style={styles.name}>{visitor.name} {visitor.lastName}</Text>
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.title}>Casa: </Text>
                        <Text style={styles.name}>{visitor.destination}</Text>
                      </View>
                      {/* <View style={styles.info}>
                        <Text style={styles.title}>Número de proveedor: </Text>
                        <Text style={styles.name}>{visitor.providerNumber}</Text>
                      </View> */}
                      {
                        this.props.route.params.userType  === 'admin' || this.props.route.params.userType === 'master'
                        ? <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                              style={styles.buttonIcon} 
                              onPress={() => this.props.navigation.navigate('EditVisitor', { visitor: visitor, condominium: this.props.route.params.condominium })}
                            >
                              <Ionicons name="md-create" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.buttonIcon} 
                              onPress={()=>this.showDialog(visitor.visitorNumber)}
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
                Esta seguro que desea eliminar a este proveedor
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

export default VisitorList;
