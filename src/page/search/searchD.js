import React from 'react';
import { Button, Select, DatePicker } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import getParams from "../../util/getParams";
import CommonLayout from "../../layout/commonLayout";


export default class SearchDPage extends CommonLayout {
    constructor(props){
        super(props);

        this.state = {
            selectValue:undefined,
            defaultDate:moment( '2018-05-03','YYYY-MM-DD' )
        };

        this.params = getParams(this.props);

        this.testList = [
            { name:'不限',value:-1 },
            ...new Array(20).fill(1).map((v,i)=>{
                return {
                    name:'项目项目'+i,
                    value:i+1
                }
            })
        ]
    }

    componentWillMount(){

    }

    _selectChange =(item)=> {
        this.setState({
            selectValue:item === '-1'?undefined:item
        });
        console.log(this.state.selectValue)
    };

    backPortal =()=> {
        this.replace({
            url:'/#',
            params:{
                back:true
            }
        })
    };

    onChange =(date)=> {
        this.setState({
            defaultDate:date
        })
    };

    renderBody() {
        const { Option } = Select;

        return (
            <div>
                <Button type="danger" onClick={ this.backPortal }>返回首页</Button>
                <Button type="primary">fffffffffffff</Button>
                <Select style={{ width:120 }} placeholder='请选择' value={this.state.selectValue} onChange={ this._selectChange } defaultActiveFirstOption={false}>
                {
                    this.testList.map((v,i)=>{
                        return <Option key={v.value} title={v.name} >{v.name}</Option>
                    })
                }
                </Select>
                <div>{ this.state.selectValue }</div>
                <DatePicker locale={locale} value={this.state.defaultDate} onChange={this.onChange} />
                <DatePicker.MonthPicker locale={locale} />
            </div>
        );
    }
}

