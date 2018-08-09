/**
 * Name : < SIVANRAJ A/L VASU >
 * Reg. No : < 1507022>
 */
 
import React, {Component} from 'react';
import {
    Text, View, ScrollView, StyleSheet,
} from 'react-native';
import {InputWithLabel} from './UI';



let SQLite = require('react-native-sqlite-storage');

export default class ViewScreen extends Component{

    static navigationOptions = ({navigation}) => {
        return {
          title: navigation.getParam('headerTitle')
        };
      };

      constructor(props) {
        super(props)

        this.state = {
          restaurantId: this.props.navigation.getParam('id'),
          restaurant: null,
        };

        this._query = this._query.bind(this);

        this.db = SQLite.openDatabase({name: 'fnb', createFromLocation : '~fnb.sqlite'}, this.openDb, this.errorDb);
      }

      componentDidMount() {
        this._query();
      }


      _query() {
        this.db.transaction((tx) => {
          tx.executeSql('SELECT * FROM restaurants WHERE id = ?', [this.state.restaurantId], (tx, results) => {
            if(results.rows.length) {
              this.setState({
                restaurant: results.rows.item(0),
              })
            }
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
        let restaurant = this.state.restaurant;
        {console.log(restaurant)}
        return(
            <View style={styles.container}>
                <ScrollView>
                    <InputWithLabel style={styles.output}
                        label={'Name'}
                        value={restaurant ? restaurant.name : ''}
                        orientation={'vertical'}
                        editable={false}
                    />
                    <InputWithLabel style={styles.output}
                        label={'Location'}
                        value={restaurant ? restaurant.location : ''}
                        orientation={'vertical'}
                        editable={false}
                    />

                    <InputWithLabel style={styles.output}
                        label={'Type'}
                        value={restaurant ? restaurant.type : ''}
                        orientation={'vertical'}
                        editable={false}
                    />

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#737373',

    },
    output: {
      fontSize: 30,
      color: '#000099',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderColor: '#660066',
    },
  });
