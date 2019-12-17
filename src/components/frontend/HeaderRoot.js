import React, {Component} from 'react';
import LoginPopup from './LoginPopup.js';
import {Link} from 'react-router-dom';
// import { setLoginHomepage } from '../../redux/actions/hotelAction';
import { setLoginHomepage } from '../../reducers';
import { connect } from 'react-redux';
import axios from 'axios';
import './HeaderRoot.css';

class HeaderRoot extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            showPopup: null
        }
        this.urlCheckLogin = '/checkLogin';
    }

    componentDidMount = async() => {
        var _this = this;
        await axios.get(this.urlCheckLogin, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response){
            _this.props.setLoginHomepage({ isLogin: true });
        }) 
        .catch(
            error => {
                _this.props.setLoginHomepage({ isLogin: false });
                console.log('Error: ' + error);
            }
        )
    }

    togglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup 
        })
    }

    logout = async() => {
        var _this = this;
        await axios.post('/logoutPost', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response){
            _this.props.setLoginHomepage({ isLogin: false });
        })
        .catch(
            error => {
                console.log('Error: ' + error);
            }
        )
    }

    render() {
        return(  
            <div>
                <div className='container-root'>
                    <div className='container'>
                        <div>
                            <Link to='/' ><img style={{ width: '10%',  }} alt='Logo' src={process.env.PUBLIC_URL + '/uploads/images/logo.jpg'} /></Link>
                            {(this.props.login.isLogin === true) ?
                            <div className='box-dropdown'>
                                <div className='dropdown'>
                                    <button className='dropbtn'>My Account</button>
                                    <div className='dropdown-content'>
                                    <Link className='link' to='my-account'>My Account</Link>
                                    <Link className='link' to='#'  onClick={this.logout}>Logout</Link>
                                    </div>
                                </div>
                            </div>
                            : 
                            <div style={{ float: 'right', marginTop: '25px' }}>
                                <Link to='#' onClick={this.togglePopup}>Login</Link>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                {/* Banner */}
                <div>
                    <img style={{ width: '100%' }} alt='Banner' src={process.env.PUBLIC_URL + '/uploads/images/banner.jpg'} />
                </div>

                {this.state.showPopup ? 
                <LoginPopup 
                    text = 'Login'
                    closePopup = {this.togglePopup.bind(this)}
                />
                : null
                }
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

export default connect(mapStateToProps,mapDispatchToProps)(HeaderRoot);