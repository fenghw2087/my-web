import React from 'react';
import { Button, Affix } from 'antd';
import {objToBase64} from "../../util/objexbase64";
import doRequest from "../../util/doRequest";
import CommonLayout from "../../layout/commonLayout";
import getParams from "../../util/getParams";

export default class PortalPage extends CommonLayout {

    constructor(props){
        super(props);
        this.title = '蜜驿-登录';
    }


    renderHeader(){
        return <div style={{ height:100 }}>
            登录头部1
        </div>
    }


    renderBody(){
        return <div style={{ padding:'20px 0' }}>
            登陆
            <Button type='primary' onClick={ ()=>this.replace({ url:'/register',single:true }) }>注册</Button>
        </div>
    }
}

