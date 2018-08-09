/**
 * Name : < SIVANRAJ A/L VASU >
 * Reg. No : < 1507022>
 */

import React, {Component} from 'react';
import {
    Text, ScrollView, StyleSheet, DatePickerAndroid, TouchableWithoutFeedback, View,TextInput,
} from 'react-native';
import {
    InputWithLabel,
    PickerWithLabel,
    AppButton,
  } from './UI';

let SQLite = require('react-native-sqlite-storage');
let typesAvailable = ['Asian','Western'];


export default class CreateScreen extends Component{
    static navigationOptions = {
        title: 'Add Restaurant',
      };
    constructor(props){
        super(props)

        this.state = {
            name: '',
            location: '',
            type: '',
        }

        this._insert = this._insert.bind(this);

        this.db = SQLite.openDatabase({name: 'fnb', createFromLocation : '~fnb.sqlite'}, this.openDb, this.errorDb);
    }

    openDb() {
        console.log('Database opened');
    }

    errorDb(err) {
        console.log('SQL Error: ' + err);
    }

    _insert() {
        this.db.transaction((tx) => {
          tx.executeSql('INSERT INTO restaurants(name,location,type) VALUES(?,?,?)', [
            this.state.name,
            this.state.location,
            this.state.type,
          ]);
        });

        this.props.navigation.getParam('refresh')();
        this.props.navigation.goBack();
      }

    render(){
        return(
            <ScrollView style={styles.container}>
                <InputWithLabel style={styles.input}
                    label={'Name'}
                    value={this.state.name}
                    onChangeText={(name) => {this.setState({name})}}
                    orientation={'vertical'}
                />

                <InputWithLabel style={styles.input}
                    label={'Location'}
                    value={this.state.location}
                    onChangeText={(location) => {this.setState({location})}}
                    orientation={'vertical'}
                />

                <PickerWithLabel style={styles.picker}
                    label={'Type'}
                    items={typesAvailable}
                    mode={'dialog'}
                    value={this.state.type}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({type: itemValue})
                    }}
                    orientation={'vertical'}
                    textStyle={{fontSize: 24}}
                />

                <AppButton style={styles.button}
                    title={'Save'}
                    theme={'primary'}
                    onPress={this._insert}
                />

      </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#737373',
    },
    input: {
      fontSize: 25,
      fontWeight: '500',
      color: '#000099',
      marginTop: 10,
      marginBottom: 10,
    },
    picker: {
      color: '#ff1a8c',
      marginTop: 10,
      marginBottom: 10,
    },
    button: {
      marginTop: 10,
      marginBottom: 10,
    },
  });
