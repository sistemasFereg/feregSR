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
import CustomHeader from '../../../components/header';
import Dialog from "react-native-dialog";

class UnadmittedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unadmittedList: [],
      showLoader: false,
      noData: false,
      errorDelete: false,
      error: false,
      unadmittedId: '',
    };
  }

  async componentDidMount() {
    console.log(this.props)
    this.didFocusSubscription = this.props.navigation.addListener('focus', () => {this.componentDidMount();});
    this.setState({ showLoader: true });
    const unadmittedArray = [];
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("unadmitted").orderBy('name').get();
      snapshot.forEach((doc) => {
        let data = {
          id: doc.id,
          data: doc.data()
        }
        unadmittedArray.push(data);
        if(doc) {
          this.setState({ showLoader: false });
        };
      });
      this.setState({ unadmittedList: unadmittedArray });
      if(unadmittedArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
  }

  showDialog (unadmitted) {
    this.setState({ unadmittedId: unadmitted.id});
    this.setState({ showDialog: true });
    //console.log(this.state.unadmittedList);
    console.log(unadmitted.id,'este');
  };

  handleCancel ()  {
    this.setState({showDialog: false})
  };

  handleDelete ()  {
    this.deleteUnadmitted();
  };

  deleteUnadmitted() {
    console.log(this.state.unadmittedId,'este id');
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('unadmitted').doc(`${this.state.unadmittedId}`).delete()
      .then((res) => {
        this.setState({showDialog: false})
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
        <CustomHeader title={'Personas no admitidas'}/>
        <ScrollView style={styles.container}>
          {
            this.props.route.params.userType === 'admin'  || this.props.route.params.userType === 'master'
            ?<View style={styles.addContainer}>
            <Text style={styles.addText}>Agregar persona no admitida: </Text>
            <TouchableOpacity
              style={styles.addButton} 
              onPress={() => this.props.navigation.navigate('UnadmittedCreate', { condominium: this.props.route.params.condominium })}
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
            this.state.unadmittedList.map((unadmitted, i) => (
              <Card style={styles.card} key={i}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('UnadmittedProfile', { unadmitted: unadmitted })}>
                  <View style={styles.cardContent}>
                    <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                    <View style={styles.cardText}>
                      <View style={styles.info}>
                        <Text style={styles.title}>Nombre: </Text>
                        <Text style={styles.name}>{unadmitted.data.name}</Text>
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.title}>Descripción: </Text>
                        <Text style={styles.name}>{unadmitted.data.comment}</Text>
                      </View>
                      {/* <View style={styles.info}>
                        <Text style={styles.title}>Comentario: </Text>
                        <Text style={styles.name}>{incident.data.comment}</Text>
                      </View> */}

                      {
                         this.props.route.params.userType === 'admin'  || this.props.route.params.userType === 'master'
                        ?<View style={styles.buttonsContainer}>
                        <TouchableOpacity
                          style={styles.buttonIcon} 
                          onPress={() => this.props.navigation.navigate('EditUnadmitted', { unadmitted: unadmitted, condominium: this.props.route.params.condominium })}
                        >
                          <Ionicons name="md-create" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.buttonIcon} 
                          onPress={() => this.showDialog(unadmitted)}
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
    height:'100%',
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
  noData: {
    textAlign: 'center',
    color: COLORS.darkPrimary,
     marginTop: 12
   }
});

export default UnadmittedList;
