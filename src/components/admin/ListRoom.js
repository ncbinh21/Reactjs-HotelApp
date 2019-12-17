import React, {Component} from 'react';
import './ListRoom.css';
import HeaderRender from './Header';
import axios from 'axios';

export default class ListRoom extends Component {
 // site that doesn’t send Access-Control-*
    constructor(props) {
        super(props);
        this.urlGetListRoom = '/admin/getListRoom';
        this.urlDeleteRoom = '/admin/deleteRoomWithId';
        this.urlCheckoutRoom = '/checkoutRoom';
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
        .then(function(response){ _this.setState({ items: response.data, isLoaded: false })
        })
        .catch(
            error => {
                this.props.history.push('/admin');
            }
        )
    }

    onDelete = async (item) => {
        const itemsData = this.state.items;
        var data = {
            'roomId': item._id
        }
        await axios(this.urlDeleteRoom + '/' + item._id, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then(this.setState({items: itemsData}))
        .then(() => {
            window.location.reload();
        })
        .catch(error => {console.log(error)});
    }

    onCheckout = async (item) => {
        const itemsData = this.state.items;
        var data = {
            'roomId': item._id
        }
        await axios(this.urlCheckoutRoom + '/' + item._id, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then(this.setState({items: itemsData}))
        .then(() => {
            window.location.reload();
        })
        .catch(error => {console.log(error)});
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
                    <HeaderRender/>
                    <h3 id='title'>List Room</h3>
                    <a className='room-create-link' href='/admin/create-edit-room'><button className='btn btn-primary room-create'>Create Room</button></a>
                    <div className='row'>
                        {items.map(function (item, index) {
                            return( 
                                <div key={index} className='col-md-3'>
                                    <div className={'room-image ' + this.switchRank(item.type)}></div>
                                    <h5 className='room-title'>{item.title}</h5>
                                    <div>Description: {item.content}</div>
                                    <div className='room-price'>{item.price}$</div>
                                    <div className='room-size'>Size: {item.size}</div>
                                    <div className='room-type'>Rank: {item.type || 'Undefined'}</div>
                                    <div className='room-type'>Assign: {item.userId || 'None'}</div>
                                    <div className='room-detail'>
                                        <a href={'/admin/create-edit-room/' + item._id}><button className='btn btn-info room-edit'>Edit</button></a>
                                        <button className='btn btn-danger room-delete' onClick={() => {if(window.confirm('Are you sure you want to delete this item?')) {this.onDelete(item)};}}>Delete</button>
                                        {(item.userId) ?
                                        <button className='btn btn-warning' onClick={() => {if(window.confirm('Are you sure you want to checkout this room?')) {this.onCheckout(item)};}}>Checkout</button>
                                        : ''
                                        }
                                    </div>
                                </div>
                            )   
                        }, this)}
                    </div>
                </div>
            )
        }
    }
} 
