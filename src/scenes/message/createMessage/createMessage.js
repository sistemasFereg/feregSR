import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Alert
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import CustomHeader from '../../../components/header';
import firebase from '../../../config/firebase';
import moment from 'moment';

class CreateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      guardName: '',
      comment: '',
      error: false,
      errorData: false,
      disable: false,
      createDate: null
    };
  }

  validate() {
    const {type, guardName, comment} = this.state;
    if(type.trim().length == 0){
      this.typeInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    } 
    if(guardName.trim().length == 0){
      this.nameInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(comment.trim().length == 0){
      this.commentInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(type.trim().length != 0 && guardName.trim().length != 0 && comment.trim().length != 0) {
      this.CreateSuggestion();
    }
    else
    {
      this.setState({ errorData: true});
    }
  }

  CreateSuggestion() {
    let createDate= moment().format('DD-MM-YYYY - HH:mm');
    this.setState({ showCode: true });
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('suggestion').doc().set({
      guardName: this.state.guardName,
      type: this.state.type,
      comment: this.state.comment,
      createDate: createDate
    }).then((res) => {
      this.setState({
        type: '',
        guardName: '',
        comment: '',
      });
      Alert.alert("Fereg SR","Sugerencia Creada");
    //falta checar esto
    })
    .catch((err) => {
      console.error("Error found: ", err);
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={'Crear Sugerencia'}/>
        <ScrollView style={styles.scroll}>
          <View style={styles.inputView} ref={r=>this.typeInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Tipo" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({ type: text })}
              value={this.state.type}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.nameInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Nombre del guardia" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({ guardName: text })}
              value={this.state.guardName}
            />
          </View>
          <View style={styles.commentView} ref={r=>this.commentInput=r}>
            <TextInput  
              style={styles.commentText}
              placeholder="Comentario (Lim. 150)" 
              placeholderTextColor={COLORS.black}
              multiline = {true}
              numberOfLines = {4}
              maxLength = {150}
              onChangeText={text => this.setState({ comment: text })}
              value={this.state.comment}
            />
          </View>
          {
            this.state.error
            ? <Text style={styles.error}>Error al guardar la información</Text>
            : null
          }
          {
            this.state.errorData
            ? <Text style={styles.error}>Por favor ingresa los datos</Text>
            : null
          }
          <TouchableOpacity 
            style={styles.btnCreate}
            onPress={() => this.validate()}
          >
            <Text style={styles.createText}>Crear</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.darkGray
  },
  title: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkPrimary,
  },
  inputView: {
    width: "80%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    alignSelf: 'center',
    padding: 20
  },
  commentView: {
    width: "80%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    height: 150,
    marginBottom: 20,
    justifyContent: "center",
    alignSelf: 'center',
    padding: 20
  },
  inputText: {
    height: 50,
    color: COLORS.black
  },
  commentText: {
    height: 150,
    color: COLORS.black
  },
  switch: {
    alignSelf: 'center',
    marginBottom: 16,
    flexDirection: 'row'
  },
  car: {
    marginTop: 5
  },
  btnCreate: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  createText: {
    color: COLORS.primary,
  },
  date: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkPrimary,
  },
  dateContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  optionButtonIcon: {
    width: 42,
    marginHorizontal: 4,
    marginTop: -5
  },
  error: {
    textAlign: 'center',
    color: COLORS.error,
    marginTop: 8
  },
  codeContainer: {
    alignSelf: 'center',
    marginTop: 16
  },
  scroll: {
    paddingTop: 16
  }
});

export default CreateMessage;
