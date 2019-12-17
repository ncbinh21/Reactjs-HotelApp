import React, {Component} from 'react';
import './LoginPopup.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Message from '../global/Message.js';
import { setLoginHomepage } from '../../reducers';
import { connect } from 'react-redux';

var md5Hash = require('md5-hash');

class LoginPopup extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            styleMessage: null,
            message: null
        }
        this.urlLoginPost = '/loginPost';
    }
    login = async (event) => {
        var _this = this;
        event.preventDefault();
        var data = {
            username: event.currentTarget.username.value,
            password: md5Hash.default(event.currentTarget.password.value)
        }
        await axios.post(this.urlLoginPost, data,{
            headers: { 'Content-Type' : 'application/json'}
        })
        .then(response => {
            this.setState({
                styleMessage: response.status,
                message: response.data.message
            });
            this.props.setLoginHomepage({ isLogin: true })
            _this.props.closePopup();
        })
        .catch(error => {
            this.setState({
                styleMessage: 500,
                message: 'Error happen when login'
            })
        });
    }

    render() {
        return(
            <div>
                <div className='popup'>  
                    <div className='popup_inner'> 
                        <div className='card-body'>
                            <div>
                                <h1>{this.props.text}</h1>
                                <Link to='#' onClick={this.props.closePopup} className='close-popup'></Link>
                            </div>
                            {(this.state.message) ? 
                            <Message
                                styleMessage = {this.state.styleMessage}
                                message = {this.state.message}
                            />
                            : null
                            }
                            <form className='form' onSubmit={this.login}>
                                <div className='form-group'>
                                    <label>Username</label>
                                    <input type='text' className='form-control form-control-lg rounded-0' name='username' id='username'/>
                                    <div className='invalid-feedback'>Oops, you missed this one.</div>
                                </div>
                                <div className='form-group'>
                                    <label>Password</label>
                                    <input type='password' className='form-control form-control-lg rounded-0' id='password' name='password'/>
                                    <div className='invalid-feedback'>Enter your password too!</div>
                                </div>
                                <button type='submit' className='btn btn-success btn-lg float-right' id='btnLogin'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}
const mapStateToProps = state => ({
    login: state.login,
});

const mapDispatchToProps = {
    setLoginHomepage
};
export default connect(mapStateToProps,mapDispatchToProps)(LoginPopup);