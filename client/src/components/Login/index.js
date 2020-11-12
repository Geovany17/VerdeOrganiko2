/*
 *
 * Login
 *
 */

import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { Grid, Header, Image, Form, Segment, Message } from "semantic-ui-react";
import { connect } from 'react-redux';
import actions from '../../actions';
import Input from '../Input';
import { Button } from 'semantic-ui-react';
import LoadingIndicator from '../LoadingIndicator';
import SignupProvider from '../SignupProvider';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    authenticated: false
  }
  handelinputchange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({
      [name]: value
    })
  }
  render() {
    const {
      authenticated,
      loginFormData,
      loginChange,
      login,
      formErrors,
      isLoading,
      isSubmitting
    } = this.props;

    if (this.state.authenticated) return <Redirect to='/' />;

    const registerLink = () => {
      this.props.history.push('/register');
    };

    const handleSubmit = event => {
      event.preventDefault();
      //login();
      axios.post('/api/login', this.state)
        .then(res => {
          console.log(res)
          this.setState({ authenticated: true })
        });
    };

    return (
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/logo.png" /> Log-in to your account
            Helloooo
      </Header>
          <Form size="large" onSubmit={handleSubmit} noValidate>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                type={'text'}
                error={formErrors['email']}
                label={'Email Address'}
                name={'email'}
                value={this.state.email}
                //onInputChange={(name, value) => {
                //  loginChange(name, value);
                //}}
                onChange={this.handelinputchange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"


                type={'password'}
                error={formErrors['password']}
                label={'Password'}
                name={'password'}
                placeholder={'Please Enter Your Password'}
                value={this.state.password}
                //onInputChange={(name, value) => {
                //loginChange(name, value);
                // }}
                onChange={this.handelinputchange}

              />


              <Button
                fluid size="large"
                type='submit'
                variant='primary'
                text='signin'
                disabled={isSubmitting}
                onClick={handleSubmit}
              >Sign in </Button>
              <Button
                text='Create an account'
                variant='link'
                className='ml-md-3'
                onClick={registerLink}
              >Create an Account</Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="/sign-up">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>

    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    loginFormData: state.login.loginFormData,
    formErrors: state.login.formErrors,
    isLoading: state.login.isLoading,
    isSubmitting: state.login.isSubmitting
  };
};

export default connect(mapStateToProps, actions)(Login);
