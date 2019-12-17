import React, {Component} from 'react';
import axios from 'axios';
import './Login.css';
import { setLoginHomepage } from '../../reducers';
import { connect } from 'react-redux';


var md5Hash = require('md5-hash');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            data: null
        }
        this.urlLoginPost = '/loginPost';
        this.urlCheckLogin = '/checkLogin';

        // this.login = this.login.bind(this);
    }

    login = async (event) => {
        event.preventDefault();
        var data = {
            username: event.currentTarget.username.value,
            password: md5Hash.default(event.currentTarget.password.value)
        }
        await axios.post(this.urlLoginPost, data,{
            headers: { 'Content-Type' : 'application/json'}
        })
        .then(response => {
            if(response.status === 200) {
                // this.props.setLoginHomepage({ isLogin: true })
                this.props.history.push('/admin/list-room');
            }
        })
        .catch(error => {
            this.props.history.push('/admin');
            this.setState({error})});
    }

    componentDidMount = async () => {
        await axios.get(this.urlCheckLogin, {
            headers: {'Content-Type':'application/json'},
        })
        .then(response => {
            if(response.status === 200) {
                this.props.history.push('/admin/list-room');
            }
        })
        .catch(error => this.setState({error}));
    }

    render () {
        return(
            <div className='form_login'>
                <h1>Login Page</h1>
                <form onSubmit={this.login} className='was-validated'>
                <div className='form-group col-md-4'>
                    <div className='input-group'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Username</span>
                        </div>
                        <input type='text' className='form-control' id='username' placeholder='Enter username' name='username' required/>
                        <div className='valid-feedback'>Valid.</div>
                        <div className='invalid-feedback'>Please fill out this field.</div>
                    </div>
                </div>
                <div className='form-group input-group col-md-4'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Password</span>
                    </div>
                    <input type='password' className='form-control' id='password' placeholder='Enter password' name='password' required/>
                    <div className='valid-feedback'>Valid.</div>
                    <div className='invalid-feedback'>Please fill out this field.</div>
                </div>
                <div className='col-md-4'>
                    <button type='submit' className='btn btn-primary'>Login</button>
                </div>
                </form>
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


export default connect(mapStateToProps, mapDispatchToProps)(Login)   
