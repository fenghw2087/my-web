import React from 'react';
import { Button, Affix } from 'antd';
import {objToBase64} from "../../util/objexbase64";
import doRequest from "../../util/doRequest";
import CommonLayout from "../../layout/commonLayout";
import getParams from "../../util/getParams";

export default class RegisterPage extends CommonLayout {

    constructor(props){
        super(props);
        this.title = '蜜驿-注册';
    }


    renderHeader(){
        return <div style={{ height:100 }}>
            注册头部
        </div>
    }


    renderBody(){
        return <div style={{ padding:'20px 0' }}>
            注册头部
            <Button type='primary' onClick={ ()=>this.replace({ url:'/',single:true }) }>返回登陆</Button>
        </div>
    }
}

