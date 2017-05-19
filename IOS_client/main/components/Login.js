'use strict';
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { firebaseApp } from './config/config.js';
import axios from 'axios';

const Form = t.form.Form;

const Person = t.struct({
  email: t.String,
  githubUsername: t.String,
  password: t.String,
  rememberMe: t.Boolean
});

const options = {};


class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: {
        email: '',
        githubUsername: '',
        password: ''
      }
    }
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(value) {
    this.setState({value});
  }

  login() {
    let value = this.refs.form.getValue();
    if (value) {
      firebaseApp.auth().signInWithEmailAndPassword(this.state.value.email, this.state.value.password)
      .then(response => {
        console.log('User authenticated!');
        // Get GitHub profile with the entered GitHub username.
        const config = {
          headers: {'githubusername': this.state.value.githubUsername}
        };
        // const data = {
        //   ghun: this.state.value.githubUsername
        // }
        axios.get('http://localhost:3000/github', config)
        .then(res => {
          console.log('GitHub profile obtained!');
        })
        .catch(error => {
          console.log('Error obtaining GitHub profile.');
        });
      })
      .catch(error => {
        console.error('Unable to authenticate.', error.message, error.code);
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={Person}
          value={this.state.value}
          onChange={this.onChange}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.login} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#6495ED',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

function bindActions(dispatch) {
    return {
        login: () => dispatch({type:'LOGIN'}),
    }
}
const mapStateToProps = state => ({})

export default connect(mapStateToProps, bindActions)(Login)