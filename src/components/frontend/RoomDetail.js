import React, {Component} from 'react';
import './RoomDetail.css';
import axios from 'axios';
import { setLoginHomepage } from '../../reducers';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import HeaderRoot from './HeaderRoot.js';

class RoomDetail extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            roomId: '',
            error: null,
            message: '',
            title :  '',
            content : '',
            price : '',
            size : '',
            type: '',
            status : '',
            types: '',
            userId : ''
        };
        this.urlRoomDetail = '/roomDetail/';
        this.urlBookRoom = '/bookRoom/';
    }

    componentDidMount = async() => {
        var _this = this;
        var roomIdUse = '';
        if(this.props.match.params.roomId) {
            roomIdUse = this.props.match.params.roomId;
        }
        await axios.get(this.urlRoomDetail + roomIdUse, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response){_this.setState({ 
            roomId: response.data._id,
            title :  response.data.title,
            content : response.data.content,
            price : response.data.price,
            size : response.data.size,
            type : response.data.type,
            status : response.data.status,
            userId: response.data.userId,
            error : null
        })})
        .catch( 
            error => {
                this.setState({ redirect: '/'})
        });
    }

    bookRoom = async(event) => {
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

    render() {
        const {roomId, title, content, price, size, redirect, userId} = this.state;
        if (redirect !== null) {
          return <Redirect to={redirect}/>;
        }
        return(
            <div>
                <HeaderRoot />
                <div className='container container-body'>
                    <div className="row col-md-6">
                    <h3>Room Detail</h3>
                    <table className="table table-striped cus-tab">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{title}</td>
                            </tr>
                            <tr>
                                <td>Content</td>
                                <td>{content}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{price}</td>
                            </tr>
                            <tr>
                                <td>Size</td>
                                <td>{size}</td>
                            </tr>
                        </tbody>
                    </table>
                    <form onSubmit={this.bookRoom}>
                        <input name='room-id' id='room-id' defaultValue={roomId || ''} />
                        {   
                            this.props.login.isLogin !== true ?
                            <div className='btn btn-success'>Please Login</div>
                            : 
                            <button className='btn btn-success' type='submit' {...(userId ? { disabled: true  } : {})}>{userId ? 'Booked' : 'Book Room'}</button>
                        }
                    </form>
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

export default connect(mapStateToProps,mapDispatchToProps)(RoomDetail);