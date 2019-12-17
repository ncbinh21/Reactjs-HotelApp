import React, {Component} from 'react';
import HeaderRoot from './HeaderRoot.js';
import './Homepage.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Homepage extends Component
{
    constructor(props) {
        super(props);
        this.urlGetListRoom = '/frontend/getListRoom';
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }

    }

    componentDidMount = async() => {
        var _this = this;
        await axios.get(this.urlGetListRoom, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response){_this.setState({ items: response.data, isLoaded: false })
        })
        .catch(
            error => {
                // this.props.history.push('/');
            }
        )
    }

    switchRank(rank) {
        switch(rank) {
            case 'Platinum':
                return 'room-image-platinum';
            case 'Diamond':
                return 'room-image-diamond';
            case 'Gold':
                return 'room-image-gold';
            case 'Silver':
                return 'room-image-silver';
            case 'Bronze':
                return 'room-image-bronze';
            default:
                return 'room-image-bronze';
        }
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if(isLoaded) {
            return <div>Loading ...</div>
        } else {
            return(
                <div>
                    <HeaderRoot/>
                    <div className='container container-body'>
                        <div className='row'>
                            {items.map(function (item, index) {
                                if(item.status !== 0) {
                                return( 
                                    <div key={index} className='col-md-3'>
                                        <div className={'room-image ' + this.switchRank(item.type)}></div>
                                        <h5 className='room-title'>{item.title}</h5>
                                        <div>Description: {item.content}</div>
                                        <div className='room-price'>{item.price}$</div>
                                        <div className='room-size'>Size: {item.size}</div>
                                        <div className='room-detail'>
                                            <button className='btn btn-success' {...(item.userId ? { disabled: true  } : {})}>
                                                {item.userId ? 'Booked': 
                                                <Link to={'room-detail/' + item._id}>View Detail</Link>}
                                            </button>
                                        </div>
                                    </div>
                                )} 
                                return(
                                    null
                                )
                            }, this)}
                        </div>
                    </div>
                </div>
            )
        }
    }
}
