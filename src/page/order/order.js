import React, { Component } from 'react';
import { Button } from 'antd';
import {objToBase64} from "../../util/objexbase64";

class OrderPage extends Component {

    _jumpToSearch =()=> {
        window.location.href = `/search.html#/searchD/${ objToBase64({ form:'protal' }) }`
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={ ()=>this._jumpToSearch() }>order</Button>
            </div>
        );
    }
}

export default PortalPage;