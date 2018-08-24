import React from 'react';
import headerLogo from '../images/header-logo.png';
import { Input, Icon } from 'antd';

const { Search } = Input;

const SearchHeader =({ search })=> {
    return  <div style={{ height:90,backgroundColor:'#fff',width:'100%' }}>
        <div style={{ height:'100%',width:1200,margin:'0 auto' }}>
            <div style={{ width:320,height:'100%',float:'left' }} className="flexbox aic">
                <img src={headerLogo} style={{ height:70 }} />
            </div>
            <div className="flexbox aic" style={{ width:600,height:'100%',float:'left' }}>
                <Search
                    placeholder="目的地/酒店/景区"
                    enterButton={ <span><Icon type="search" />搜索</span> }
                    size="large"
                    onSearch={value => search(value)}
                />
            </div>
        </div>
    </div>
};

export default SearchHeader;