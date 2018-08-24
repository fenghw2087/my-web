import React from 'react';
import {csPhone} from "../common/config";
import {objToBase64} from "../util/objexbase64";
import style from "./less/layout.less";
import {Dropdown, Icon} from "antd";
import appCode from "../images/app-code.png";
import wechatCode from '../images/wechat-code.png';

const TopHeader =({ isLogin, from })=> {
    const menu1 = (
        <div className={ style.menu }>
            <div className={ style.menuTitle }>扫描下载蜜驿APP</div>
            <img src={ appCode } />
        </div>
    );
    const menu2 = (
        <div className={ style.menu }>
            <div className={ style.menuTitle }>扫描添加公共号</div>
            <img src={ wechatCode } />
        </div>
    );
    return  <div style={{ height:30,lineHeight:'30px',backgroundColor:'#f2f2f2' }}>
        <div style={{ width:1200,margin:'0 auto' }}>
            <div style={{ float:'left',lineHeight:'30px' }}>
                <i className="fa fa-home" /><span style={{ color:'#999' }}>Hi,最近想去哪里玩？</span>
                {!isLogin ?
                <span style={{ marginLeft:10 }}><a href={ `/login.html#/${ objToBase64({ from }) }` } style={{ color:'#333' }}>请登陆</a> | <a href={ `/login.html#/register/${ objToBase64({ from }) }` } style={{ color:'#333' }}>免费注册</a></span>
                :<span style={{ marginLeft:10 }}><a href={ `/userCenter.html` } style={{ color:'#333' }}>会员中心</a> | <a href={ `/order.html` } style={{ color:'#333' }}>我的订单</a></span>
                }
            </div>
            <div className="flexbox" style={{ float:'right',color:'#999' }}>
                <span style={{ marginRight:5 }}>客服电话：{ csPhone }</span>
                <div className={ style["icon-c"] }>
                    <Dropdown overlay={menu1} placement="bottomRight">
                        <Icon className={ style.icon } type="mobile" />
                    </Dropdown>
                </div>
                <div className={ style["icon-c"] }>
                    <Dropdown overlay={menu2} placement="bottomRight">
                        <Icon className={ style.icon } type="wechat" />
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
};

export default TopHeader;