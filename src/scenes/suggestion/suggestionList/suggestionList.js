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
import CustomHeader from '../../../components/header/index';

class SuggestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      showLoader: false,
      noData: false,
      errorDelete: false,
      error: false,
      message: ''
    };
  }

  async componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener('focus', () => {this.componentDidMount();});
    this.setState({ showLoader: true });
    const messagesArray = [];
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("suggestion").get();
      snapshot.forEach((doc) => {
        let data = {
          id: doc.id,
          data: doc.data()
        }
        messagesArray.push(data);
        if(doc) {
          this.setState({ showLoader: false });
        };
      });
      this.setState({ messageList: messagesArray });
      if(messagesArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
  }

  showDialog (message) {
    this.setState({ showDialog: true });
    this.setState({ message: message.id });
    console.log(this.state.messageList);
  };

  handleCancel ()  {
    this.setState({showDialog: false})
  };

  handleDelete ()  {
    this.deleteMessage()
  };

  deleteMessage() {
   // console.log(this.state.message);
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('suggestion').doc(this.state.message).delete()
      .then((res) => {
        this.componentDidMount();
        this.setState({showDialog: false})
      })
      .catch((err) => {
        this.setState({ errorDelete: true });
        console.error("Error: ", err);
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <CustomHeader title={"Sugerencias"}/>
         <ScrollView style={styles.container}>
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
            this.state.messageList.map((message, i) => (
              <Card style={styles.card} key={i}>
                <TouchableOpacity style={styles.button}>
                  <View style={styles.cardContent}>
                    <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                    <View style={styles.cardText}>
                      <View style={styles.info}>
                        <Text style={styles.title}>Tipo: </Text>
                        <Text style={styles.name}>{message.data.type}</Text>
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.title}>Comentario: </Text>
                      </View>
                      <View style={styles.commentContainer}>
                        <Text style={styles.comment}>{message.data.comment}</Text>
                      </View>
                      <View style={styles.buttonsContainer}>
                        {/* <TouchableOpacity
                          style={styles.buttonIcon} 
                          onPress={() => this.props.navigation.navigate('EditMessage', { message: message, condominium: this.props.route.params.condominium })}
                        >
                          <Ionicons name="md-create" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                          style={styles.buttonIcon} 
                          onPress={() => this.showDialog(message)}
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
                Esta seguro que desea eliminar a este mensaje.
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
  mainContainer: {
    backgroundColor: COLORS.darkGray,
    flex: 1
  },
  container: {
    paddingTop: 10,
    backgroundColor: COLORS.darkGray,
    height: '100%',
    paddingBottom: 16
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
    flex: 1
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
  commentContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 5,
    paddingRight: 5
  },
  comment: {
    marginLeft: 18,
    color: COLORS.white,
    marginEnd: 18
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

export default SuggestionList;
