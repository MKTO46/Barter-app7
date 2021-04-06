import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {Card} from 'react-native-elements'
export default class RecieverDetailsScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      recieverId: this.props.navigation.getParam('details')['user_id'],
      requestId: this.props.navigation.getParam('details')['request_id'],
      bookName: this.props.navigation.getParam('details')['book_name'],
      reason_for_requesting: this.props.navigation.getParam('details')[
        'reason_to_request'
      ],
      recieverName: '',
      recieverContact: '',
      recieverAddress: '',
      revieverRequestDocId: '',
    };
  }
  getRecieverDetails() {
    db.collection('users')
      .where('email_id', '==', this.state.recieverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverName: doc.data().first_name,
            recieverContact: doc.data().contact,
            recieverAddress: doc.data().address,
          });
        });
      });

    db.collection('requested_books')
      .where('request_id', '==', this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({ recieverRequestDocId: doc.id });
        });
      });
  }
  updateBookStatus=()=>{
  db.collection('all_donations').add({
    book_name           : this.state.bookName,
    request_id          : this.state.requestId,
    requested_by        : this.state.recieverName,
    donor_id            : this.state.userId,
    request_status      :  "Donor Interested"
  })
}

componentDidMount(){
  this.getRecieverDetails()
}
  render() {
    return( <View><View style={{flex:0.3}}>
          <Card
              title={"Book Information"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Reciever Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
            </Card>
          </Card>
        </View>
        <TouchableOpacity onPress={this.updateBookStatus}><Text>I want to donate</Text>
        </TouchableOpacity>
        </View> )
  }
}
