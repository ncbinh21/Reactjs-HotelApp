import React, {Component} from 'react';
import './MyAccount.css';
import axios from 'axios';
import { setLoginHomepage } from '../../reducers';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
import HeaderRoot from './HeaderRoot.js';

class MyAccount extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: null,
            redirect: null,
            items: []
        };
        this.urlListRoom = '/getListRoom';
    }

    componentDidMount = async() => {
        var _this = this;
        await axios.get(this.urlListRoom, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response){console.log(response); _this.setState({ 
            items: response.data
        })})
        .catch( 
            error => {
                console.log(error)
                this.setState({ redirect: '/'})
        });
    }

    returnRoom = async(event) => {
        event.preventDefault();
        if(event.target[0]) {
            let roomIdUse = event.target[0].value;
        
            await axios.post(this.urlBookRoom + roomIdUse, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function(response){
                console.log(response.data);
                this.setState({ userId: response.data.userId})
                // this.setState({ redirect: 'my-account'})
            })
            .catch( 
                error => {
                    //
            });
        }
    }

    checkout = (event) => {
        event.preventDefault();
    }

    render() {
        const {items, redirect, error, isLoaded} = this.state;
        if (redirect !== null || error) {
            // return <Redirect to={redirect}/>;
            return <HeaderRoot />
        } else if(isLoaded) {
            return <div>Loading ...</div>
        } else {
            return(
                <div>
                    <HeaderRoot />
                    <div className='container container-body'>
                        <div className="row col-md-6">
                        <h3>Booking Rooms</h3>
                        <table className="table table-striped cus-tab">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Content</th>
                                    <th>Price</th>
                                    <th>Size</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {items.map(function (item, index) {
                                return(
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>{item.content}</td>
                                        <td>{item.price}</td>
                                        <td>{item.size}</td>
                                        <td>
                                            <button>View</button>
                                        </td>
                                    </tr>                                 
                                )}
                            )}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = state => ({
    login: state.login,
});

const mapDispatchToProps = {
    setLoginHomepage
};

export default connect(mapStateToProps,mapDispatchToProps)(MyAccount);