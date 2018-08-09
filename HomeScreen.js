/**
 * Name : < SIVANRAJ A/L VASU >
 * Reg. No : < 1507022>
 */

import React, {Component} from 'react';
import {
    Text, FlatList, View, StyleSheet, TouchableHighlight,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

const actions = [{
  text: 'Add',
  icon: require('./images/baseline_add_white_18dp.png'),
  name: 'add',
  position: 1
}];
console.disableYellowBox = true; //to avoid the warning
let SQLite = require('react-native-sqlite-storage'); // to load the sqlite file

export default class HomeScreen extends Component{

    static navigationOptions = {
        title: 'Restaurant List',
    }

    constructor(props) {
        super(props)

        this.state = {
          restaurants: [],
        };

        this._query = this._query.bind(this);

        this.db = SQLite.openDatabase({
          name: 'fnb',
          createFromLocation : '~fnb.sqlite'
        }, this.openDb, this.errorDb);
      }

      componentDidMount() {
        this._query();
      }

      _query() {
        this.db.transaction((tx) => {
          tx.executeSql('SELECT * FROM restaurants ORDER BY name DESC', [], (tx, results) => { 
            this.setState({
              restaurants: results.rows.raw(),
            })
          })
        });
      }

      openDb() {
          console.log('Database opened');
      }

      errorDb(err) {
          console.log('SQL Error: ' + err);
      }

    render(){
        return(
            <View style={styles.container}>

            <FlatList
                data={ this.state.restaurants }
                extraData={this.state}
                showsVerticalScrollIndicator={ true }
                renderItem={({item}) =>
                    <TouchableHighlight
                    underlayColor={'#cccccc'}
                    onPress={ () => {
                        this.props.navigation.navigate('View', {
                        id: item.id,
                        headerTitle: item.title,
                        refresh: this._query,
                        })
                    }}
                    >
                    <View style={styles.item}>
                        <Text style={styles.itemName}>{ item.name }</Text>
                        <Text style={styles.itemType}>Location : { item.location }</Text>
                    </View>
                    </TouchableHighlight>
                }
                keyExtractor={(item) => {item.id.toString()}}
            />


            <FloatingAction
            actions={actions}
            overrideWithAction={true}
            color={'#a80000'}
            onPressItem={
                () => {
                    this.props.navigation.navigate('Create', {
                    refresh: this._query,
                    })
                }
          }
        />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#3366cc',
    },
    item: {
      justifyContent: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 25,
      paddingRight: 25,
      borderBottomWidth: 1,
      borderColor: '#660066',
    },
    itemName: {
      fontSize: 30,
      fontWeight: '500',
      color: '#000',

    },

    itemType: {
      fontSize: 17,
      color: 'black',
      fontWeight: '500',
    },


  });
