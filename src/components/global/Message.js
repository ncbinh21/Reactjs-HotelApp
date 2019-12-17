import React, {Component} from 'react';

export default class Message extends Component
{
    renderTypeMessage(typeMessage) {
        switch(typeMessage) {
            case 200:
                return 'alert-success';
            case 400:
                return 'alert-danger';
            case 500:
                return 'alert-danger';
            default:
                return '';
        }
    }

    render() {
        return(
            <div className={'alert ' + this.renderTypeMessage(this.props.styleMessage)}>
                <div>{this.props.message}</div>
          </div>
        )
    }
}