import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { setLoginHomepage } from '../../reducers';
import { connect } from 'react-redux';

class Header extends Component {
    constructor(props) {
        super(props);
        this.urlLogout = '/logoutPost'; 
    }

    logout = async() => {
        await axios.post(this.urlLogout, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(
            () => {
                window.location.reload();
            }
        )
        .catch(error => {});
    }

    render() {
        return(
            <div>
                <h1>Hotel System</h1>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <ul className='navbar-nav mr-auto'>
                    <li><Link to={'/admin/list-room'} className='nav-link'> ListRoom </Link></li>
                    <li><Link to={'/admin/create-edit-room'} className='nav-link'>CreateEditRoom</Link></li>
                </ul>
                <ul className='navbar-nav'>
                    <li><Link to={'#'} onClick ={this.logout}> Log Out </Link></li>
                </ul>
                </nav>
                <hr />
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


export default connect(mapStateToProps, mapDispatchToProps)(Header)   
