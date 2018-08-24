import React from 'react';
import {Dropdown, Tabs, Input} from "antd";
import citySuggestion from "../common/city";
import style from "./less/cityChoose.less";
const TabPane = Tabs.TabPane;

import $ from 'jquery';

export default class CityChooser extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            cityOpen: props.cityOpen,
            currentCity:props.currentCity
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.closeCityChooser);
    }

    closeCityChooser=(e)=>{
        if(!this.state.cityOpen) return;
        if(!$(e.target).closest('.cityChooser').length && !$(e.target).closest('.city_chooser_parent').length){
            this.setState({
                cityOpen:false
            })
        }
    };

    chooseCity(city){
        this.toggle(false);
        this.props.chooseCity(city);
        this.setState({
            currentCity:city.display
        })
    }

    toggle(cityOpen){
        this.setState({ cityOpen });
    }

    getCitySection =(section)=> {
        if(section.type === '热门'){
            return section.section[0].citys.map(v=>{
                return <div onClick={ ()=>this.chooseCity(v)  }   key={ v.display } className={ style.cityBtn }>{ v.display }</div>
            })
        }
        return section.section.map(v=>{
            return <div key={ v.type } className={ style.cityS }>
                <div className={style["cityS_code"]}>{ v.type }</div>
                <div className={style.cityC}>
                    {
                        v.citys.map(v2=>{
                            return <div onClick={ ()=>this.chooseCity(v) }  key={ v2.display } className={ style.cityBtn }>{ v2.display }</div>
                        })
                    }
                </div>
            </div>
        })
    };

    onChange =(e)=> {
        console.log(e.target.value)
    };

    render(){
        const menu = <div className="cityChooser">
            <Tabs defaultActiveKey="热门">
                {
                    citySuggestion.map(v=>{
                        return <TabPane tab={ v.type } key={ v.type }><div style={{ padding: '0 10px 20px',overflow:'hidden' }}>
                            { this.getCitySection(v) }
                        </div></TabPane>
                    })
                }
            </Tabs>
        </div>;

        return <div>
            <Input value={ this.state.currentCity } onClick={ ()=>this.toggle(true) } onChange={ this.onChange }  { ...this.props.input } />
            <Dropdown visible={ this.state.cityOpen } overlay={menu}>
                <div style={{ height:0 }} />
            </Dropdown>
        </div>
    }
}