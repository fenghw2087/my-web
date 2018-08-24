import React from 'react';
import { Button, Radio, Input, Dropdown, Tabs, InputNumber, Select, message, Icon } from 'antd';
import CommonLayout from "../../layout/commonLayout";
import TopHeader from "../../component/topHeader";
import 'moment/locale/zh-cn';

import $ from 'jquery';
import style from './less/portal.less';
import DatePicker from "../../jq-component/component/datePicker/datePicker";
import CityChooser from "../../component/cityChooser";


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Option = Select.Option;


export default class PortalPage extends CommonLayout {

    constructor(props){
        super(props);
        this.title = '蜜驿';
        this.state = {
            target:window,
            isLogin:false,
            roomType:'a',
            cityOpen:false,
            currentCity:'',
            roomNum:1,
            personNum:1,
            hotelLevel:-1,
            blocks:{}
        };
        this.data = {
            startDate:'',
            endDate:''
        };
        this.hotelLevelDic = [
            { name:'不限',value:-1 },{ name:'酒店级别1',value:1 },{ name:'酒店级别2',value:2 },{ name:'酒店级别3',value:3 },{ name:'酒店级别4',value:4 }
        ];

    }

    componentDidMount(){
        const _end = new Date();
        _end.setFullYear(_end.getFullYear()+1);
        this.startDatePicker = new DatePicker({
            input:$('#startDate'),
            startDate:Date.now(),
            endDate:_end,
            onDateChange:date=>{
                this.data.startDate = date;
                this.endDatePicker.setStartDate(date || Date.now()).setEndDate(date?((end)=>{
                    let endDate = new Date(end);
                    endDate.setMonth(endDate.getMonth()+1);
                    if(endDate.getTime()>_end.getTime()){
                        endDate = _end;
                    }
                    return endDate
                })(date):_end);
            }
        });
        this.endDatePicker = new DatePicker({
            input:$('#endDate'),
            startDate:Date.now(),
            endDate:_end,
            onDateChange:date=>{
                this.data.endDate = date;
                this.startDatePicker.setEndDate(date || _end).setStartDate(date?((start)=>{
                    let startDate = new Date(start);
                    startDate.setMonth(startDate.getMonth()-1);
                    if(startDate.getTime()<Date.now()){
                        startDate = Date.now()
                    }
                    return startDate;
                })(date):Date.now())
            }
        });

        const morkImg = [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535027171155&di=0c77dd6b700b48dd8e04583a1ab47041&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Flvpics%2Fh%3D800%2Fsign%3Ddaff5515718b4710d12ff0ccf3cec3b2%2Faec379310a55b3198b9a2f4140a98226cffc17a6.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535027171155&di=a1c5c5d131cfa834f6341a679e12eb6c&imgtype=0&src=http%3A%2F%2Fwww.xzta.com%2FPublic%2Fimage_lib%2F2016%2F05%2F09%2F4cc641becac2e9bc95a10b13eb2ab352.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535027171155&di=af085066da578349f31c4bd0d6bee247&imgtype=0&src=http%3A%2F%2Fwww.linanwood.cc%2FimageRepository%2F3445e814-6e99-4351-a15f-e048dea7aa2e.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535027171155&di=6c4f81d1e2a570960cecd75d2f98be28&imgtype=0&src=http%3A%2F%2F709.s21i-1.faidns.com%2F1924709%2F2%2FABUIABACGAAg_bW1kQUopoDWuAcw0gI4mQI.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535027171154&di=0649933b4ed622156866bb0d6f1c55f0&imgtype=0&src=http%3A%2F%2Fsports.sun0769.com%2Fphoto%2Ffootball%2F201304%2FW020130409318230363970.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535027171154&di=75419a7d536ac5cfe78c66ba7cecf51a&imgtype=0&src=http%3A%2F%2Fsmt.114chn.com%2FUserFiles%2F2%2528424%2529.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535027171153&di=fb5c2571d3ec5888a3c44fb6a77f1082&imgtype=0&src=http%3A%2F%2Fimage.wyn88.com%2Fadminbranch%2F201609021007032087.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535027171153&di=4c1821816988297451d9389016575de5&imgtype=0&src=http%3A%2F%2Fi8.hexunimg.cn%2F2012-04-13%2F140384197.jpg'
        ];

        const hotalList1 = morkImg.map((v,i)=>{
            return {
                name:'热门酒店名称'+i,
                city:'上海',
                type:'豪华型',
                cover:v,
                price:1234
            }
        });

        const blocks = [ 24,25,33,34,35,43,44,45,46 ].reduce((o,v,i)=>{
            o[v+''] = hotalList1[i%8];
            return o;
        },{});
        this.setState({ blocks });

        this.step();
    }

    beginSearch =()=> {
        if(!this.state.currentCity){
            this.setState({
                cityOpen:true
            });
            return message.error('请选择目的地');
        }
        if(!this.data.startDate){
            this.startDatePicker.pickerShow();
            return message.error('请选择入住时间');
        }
        if(!this.data.endDate){
            this.endDatePicker.pickerShow();
            return message.error('请选择离店时间');
        }
        this.replace({
            url:'/search.html#',
            params:{
                city:this.state.currentCity,
                start:this.data.startDate,
                end:this.data.endDate,
                roomNum:this.state.roomNum,
                personNum:this.state.personNum,
                hotelLevel:this.state.hotelLevel,
            }
        })
    };


    renderHeader(){
        return <div>
            <TopHeader
                isLogin={ this.state.isLogin }
                from={ 'portal' }
            />
        </div>
    }

    chooseCity =(city)=> {
        this.setState({
            currentCity:city.display
        })
    };

    roomTypeChange =(e)=> {
        this.setState({
            roomType:e.target.value
        })
    };


    renderPTroom(){
        return <div>
            <div className={ style.itemO}>
                <div className={ style['item-t'] }>目的地</div>
                <div className={ style['item-c'] }>
                    <CityChooser
                        input={{
                            placeholder:"请输入目的地",
                            size:"large"
                        }}
                        currentCity={ this.state.currentCity }
                        chooseCity={ city=>this.chooseCity(city) }  />
                </div>

            </div>
            <div className={ style.itemO}>
                <div className={ style['item-t'] }>入住时间</div>
                <div className={ style['item-c']+' flexbox aic' }>
                    <div className="flex1"><Input id="startDate" placeholder="请选择入住时间" size="large" /></div>
                    <span style={{ margin:'0 5px',color:'#fff' }}>-</span>
                    <div className="flex1"><Input id="endDate" placeholder="请选择离店时间" size="large" /></div>
                </div>
            </div>
            <div className={ style.itemO}>
                <div className={ style['item-c']+' flexbox aic' }>
                    <div style={{ width:120,marginRight:20 }} className={ style["item-c"] }>
                        <div className={ style['item-t'] }>房间数量</div>
                        <div className={ style['item-c'] }>
                            <InputNumber style={{ width:'100%' }} min={1} max={10} size='large' value={ this.state.roomNum } onChange={(roomNum)=> this.setState({ roomNum }) } />
                        </div>
                    </div>
                    <div style={{ width:120,marginRight:20 }} className={ style["item-c"] }>
                        <div className={ style['item-t'] }>人数</div>
                        <div className={ style['item-c'] }>
                            <InputNumber style={{ width:'100%' }} min={1} max={4*this.state.roomNum} size='large' value={ this.state.personNum } onChange={(personNum)=> this.setState({ personNum }) } />
                        </div>
                    </div>
                    <div className={ style["item-c"]+' flex1' }>
                        <div className={ style['item-t'] }>酒店级别</div>
                        <div className={ style['item-c'] }>
                            <Select size='large' value={this.state.hotelLevel+''} onChange={ hotelLevel => this.setState({ hotelLevel }) } placeholder="选择酒店级别" style={{ width: '100%' }}>
                                {
                                    this.hotelLevelDic.map(v=>{
                                        return <Option key={ v.value }>{ v.name }</Option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={ style.itemO}>
                <div className={ style['item-t'] }>关键字</div>
                <div className={ style['item-c'] }>
                    <Input value={ this.state.keyword } onChange={ e=>this.setState({ keyword:e.target.value.trim() }) } placeholder="请输入关键字(选填)" size="large" />
                </div>
            </div>
            <Button size='large' onClick={this.beginSearch} className={style.mainSearchBtn} type="primary" icon="search">搜 索</Button>
        </div>
    }

    renderMainSearch(){
        return <div className={ style["search-outer"] }>
            <div className={style["search-c"]}>
                <div className={style.searchHotel}>
                    <div className={ style.mainT }>在线预订</div>
                    <div className={ style.mainTen }>ONLINE RESERVE</div>
                    <RadioGroup id="chooseSearchR" onChange={this.roomTypeChange} value={ this.state.roomType } size="large">
                        <RadioButton value="a">普通房</RadioButton>
                        <RadioButton value="b">钟点房</RadioButton>
                    </RadioGroup>
                    {
                        this.renderPTroom()
                    }
                </div>
            </div>
        </div>
    }

    renderHotHotel1(){

        const { blocks } = this.state;

        return <div className={ style.hotArea1 }>
            <div className={style.sq_area}>
                {
                    new Array(6).fill(1).map((v,i)=>{
                        return new Array(10).fill(1).map((v2,i2)=>{
                            return <div key={i+''+i2} style={{ left:(i%2)*150+(280+20)*i2+55,top:150*i }} className={style.area_item}>
                                { blocks[i+''+i2] ?
                                    <img src={ blocks[i+''+i2].cover } className={ style.area_img } />
                                    :''
                                }
                                { blocks[i+''+i2] ?
                                    (<div className={ style.area_detail }>
                                        <div className={ style.title }>{ blocks[i+''+i2].name }</div>
                                        <div className={ style.type }>{ blocks[i+''+i2].city+'/'+blocks[i+''+i2].type }</div>
                                        <div className={ style.price }>¥{ blocks[i+''+i2].price }</div>
                                        <button className={ style.btn }>详情<Icon type="double-right" /></button>
                                    </div>)
                                    :''
                                }
                            </div>
                        })
                    })
                }
            </div>
            <div className={ style.area_title }>豪华酒店集锦</div>
        </div>
    }

    renderHotHotel2(){
        const { blocks } = this.state;
        const _blocks = Object.keys(blocks).slice(0,4).map(v=>{
            return blocks[v]
        });
        return <div className={ style.hotArea2 }>
            <div className={ style.area_title }>度假酒店精选</div>
            <div className={ style.group }>
                {
                    _blocks.map((v,i)=>{
                        return <div key={ i } className={ style.area2 }>
                            <img src={ _blocks[i].cover } />
                            <div className={ style.detail2 }>
                                <div className={ style.title }>{ _blocks[i].name }</div>
                                <div className={ style.type }>{ _blocks[i].city+'/'+_blocks[i].type }</div>
                                <div className={ style.price }>¥{ _blocks[i].price }</div>
                                <button className={ style.btn }>详情<Icon type="double-right" /></button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    }

    renderHotHotel3(){
        const { blocks } = this.state;
        const _blocks = Object.keys(blocks).slice(0,5).map(v=>{
            return blocks[v]
        });

        return <div className={ style.hotArea3 }>
            <div className={ style.area_title }>经济型酒店推荐</div>
            <div className={ style.group }>
                {
                    _blocks.map((v,i)=>{
                        return <div key={ i } className={ style.area }>
                            <div className={ style.imgc }>
                                <img src={ v.cover } />
                            </div>
                            <div className={ style.detail }>
                                <div className={ style.title }>{ _blocks[i].name }</div>
                                <div className={ style.type }>{ _blocks[i].city+'/'+_blocks[i].type }</div>
                                <div className={ style.price }>¥{ _blocks[i].price }</div>
                                <button className={ style.btn }>详情<Icon type="double-right" /></button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    }

    renderHotHotel4(){
        const { blocks } = this.state;
        let _blocks = Object.keys(blocks).map(v=>{
            return blocks[v]
        });
        _blocks = [ ..._blocks,..._blocks.slice(0,6) ];
        return <div className={ style.hotArea4 }>
            <div className={ style.area_title }>连锁酒店精选</div>
            <div className={ style.group } onMouseEnter={ this.clearRaq } onMouseLeave={ ()=>!this.raqID && this.step() } >
                <div className={ style.left }><Icon type="caret-left" /></div>
                <div onClick={()=>!this.raqID && this.step()} className={ style.right }><Icon type="caret-right" /></div>
                <div className={ style.content }>
                    <div ref={ node=>this.animateNode = node } className={ style.content_c }>
                        {
                            _blocks.map((v,i)=>{
                                return <div key={ i } className={ style.imgc }>
                                    <img src={ v.cover } />
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    }

    step =()=> {
        let _left = parseFloat(this.animateNode.style.marginLeft || 0);
        if(_left  === 0 - 190*(Object.keys(this.state.blocks).length) ) _left = 0;
        this.animateNode.style.marginLeft = (_left-1.5)+'px';
        this.raqID = window.requestAnimationFrame(this.step);
    };

    clearRaq =()=> {
        this.raqID && cancelAnimationFrame(this.raqID);
        this.raqID = null;
    };

    bodyContent(){
        return <div>
            { this.renderMainSearch() }
            { this.renderHotHotel1() }
            { this.renderHotHotel2() }
            { this.renderHotHotel3() }
            { this.renderHotHotel4() }
        </div>
    };


    renderBody(){
        return <div>
            { this.bodyContent() }
        </div>
    }

}

