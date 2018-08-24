import React from 'react';
import { Button } from 'antd';
import {objToBase64} from "../../util/objexbase64";
import CommonLayout from "../../layout/commonLayout";
import TopHeader from "../../component/topHeader";
import SearchHeader from "../../component/searchHeader";

class SearchPage extends CommonLayout {
    constructor(props){
        super(props);

        this.state = {
            isLogin: false
        };
        this.title = '酒店预订查询宾馆住宿搜索蜜驿'
    }

    _jumpToSearchD =()=> {
        const params = { id:1,name:'凤凰网' };
        this.push({
            url:'/searchD',
            params,
            single:true
        })
    };

    renderHeader(){
        return <div>
            <TopHeader
                isLogin={ this.state.isLogin }
                from={ 'portal' }
            />
            <SearchHeader
                search={ value=>console.log(value) }
            />
        </div>
    }

    bodyContent(){
        return <div>body</div>
    }
}

export default SearchPage;