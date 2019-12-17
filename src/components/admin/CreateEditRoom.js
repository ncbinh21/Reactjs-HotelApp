import React, {Component} from 'react';
import HeaderRender from './Header';
import axios from 'axios';
import './CreateEditRoom.css';

export default class CreateEditRoom extends Component {
    constructor(props) {
        super(props);
        this.urlSaveRoom = '/admin/createUpdateRoom/'; 
        this.urlGetRoomWithId = '/admin/getRoomWithId/';
        this.urlGetListTypeRoom = '/admin/getListTypeRoom';  
        this.state = {
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
        };
    }

    componentDidMount = async() => {
        var _this = this;
        await axios.get(this.urlGetListTypeRoom, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response){_this.setState({ types: response.data, isLoaded: false })})
        .catch(error => this.setState({ error, isLoaded: false }));
        var roomIdUse = '';
        if(this.props.match.params.roomId) {
            roomIdUse = this.props.match.params.roomId;
        }
        // if(this.props.match.params.roomId) {
            await axios.get(this.urlGetRoomWithId + roomIdUse, {
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
                error : null
            })})
            .catch( 
                error => {
                    this.props.history.push('/admin');
            });
        // }
    }

    pushDataSever = async(event) => {
        var _this = this;
        event.preventDefault();
        var data = {
            'roomId': this.state.roomId,
            'title' :  this.state.title,
            'content' : this.state.content,
            'price' : this.state.price,
            'size' : this.state.size,
            'type' : this.state.type,
            'status' : this.state.status,
            'url' : this.state.url
        }
        var formData = new FormData();

        formData.append('file', this.state.url);
        formData.append('data', data);

        // dataRoom: JSON.stringify(data);
        const config = { headers: { 'Content-Type': 'application/json' } };
        await axios.post(this.urlSaveRoom + this.state.roomId, {
            dataRoom: JSON.stringify(data)
        }, config)
        .then(function(response) {
            _this.props.history.push('/admin/list-room');
        })
        .catch(error => this.setState({ error, isLoaded: false }));
    }

    setValueIntoState = async(event) => {
        await this.setState({
            [event.target.name]:event.target.value
        });
    }

    renderMessage = () => {
        if(this.state.message) {
            return(
                <div className={'alert' + (!this.state.error ? ' alert-success ' : ' alert-danger ') + 'alert-dismissible fade show'}>
                    <div>{this.state.message}</div>
                    <button type='button' className='close' data-dismiss='alert'>&times;</button>
                </div>
            )
        }
        return null;
    }

    renderTypeRoom = () => {
        if(this.state.types) {
            return (
                this.state.types.map(function (typeItem, i) {
                    return (
                        <option value={typeItem.type} key={i}>{typeItem.type}</option>
                    )
                })
            )
        }
    }

    onChangeImage = (event) => {
        this.setState({
            url: event.target.files[0]
        });
    }

    render() {
        const {roomId, title, content, type, price, size, status, url} = this.state;
        return (
            <div>
                <HeaderRender />
                <h3>{roomId  ? 'Edit ' + title : 'Create New Room'}</h3>
                {this.renderMessage()}
                <form onSubmit={this.pushDataSever}>
                    <div className='input-group col-md-4'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Title</span>
                        </div>
                        <input type='text' className='form-control' value={title || ''} onChange={this.setValueIntoState} name='title'/>
                    </div>
                    <div className='input-group col-md-4'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Content</span>
                        </div>
                        <input type='text' className='form-control' value={content || ''} onChange={this.setValueIntoState} name='content'/>
                    </div>
                    <div className='input-group col-md-4'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text' id='inputGroupFileAddon01'>Upload</span>
                        </div>
                        <div className='custom-file'>
                            <input type='file' name='url' className='custom-file-input' id='inputGroupFile01' aria-describedby='inputGroupFileAddon01' onChange= {this.onChangeImage} accept='image/x-png,image/gif,image/jpeg' />
                            <label className='custom-file-label' htmlFor='inputGroupFile01'>Choose file</label>
                        </div>
                    </div>
                    {
                        url ? 
                        <div>
                            <img alt={title || ''} src={URL.createObjectURL(url)}/>
                        </div> 
                        : 
                        ''
                    }
                    <div className='input-group col-md-4'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Price</span>
                        </div>
                        <input type='number' className='form-control' value={price || ''} onChange={this.setValueIntoState} name='price'/>
                    </div>
                    <div className='form-group col-md-4'>
                        <select className='form-control' value={type || ''} onChange={this.setValueIntoState} name='type'>
                            <option value=''>--Select Type--</option>
                            {this.renderTypeRoom()}
                        </select>
                    </div>
                    <div className='input-group col-md-4'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Size</span>
                        </div>
                        <input type='text' className='form-control' value={size || ''} onChange={this.setValueIntoState} name='size'/>
                    </div>
                    <div className='form-group col-md-4'>
                        <select className='form-control' value={status.toString() || '1'} onChange={this.setValueIntoState} name='status'>
                            <option value='1'>Enable</option>
                            <option value='0'>Disable</option>
                        </select>
                    </div>
                    <div className='form-group col-md-4'>
                        <button className='btn btn-success' type='submit'>{roomId ? 'Update' : 'Save'}</button>
                    </div>
                </form>         
            </div>
        )
    }

}