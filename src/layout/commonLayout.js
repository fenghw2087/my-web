import React,{ Component } from 'react';
import style from './less/layout.less';
import getParams from "../util/getParams";
import {objToBase64} from "../util/objexbase64";
import CommonFooter from "../component/commonFooter";

export default class CommonLayout extends Component {
    constructor(props){
        super(props);
        this.params = getParams(this.props);
        console.log(this.props)
        console.log({
            params:this.params
        })
    }

    componentWillMount(){
        document.title = this.title;
    }

    pop =()=> {
        const { history }  = this.props;
        if(history){
            history.goBack()
        }
    };

    push =({ url,params,single })=> {
        if(single){
            const { history }  = this.props;
            if(history){
                history.push(`${url}${ params?`/${objToBase64(params)}`:'' }`)
            }
        }else {
            window.open( `${ url }/${ params?objToBase64(params):'' }` )
        }
    };

    replace =({ url,params,single })=> {
        if(single){
            const { history }  = this.props;
            if(history){
                history.replace(`${url}${ params?`/${objToBase64(params)}`:'' }`)
            }
        }else {
            window.location.href = `${ url }/${ params?objToBase64(params):'' }`
        }
    };

    renderHeader(){
        return <div>header</div>
    }

    renderBody(){
        return <div className={ style.content }>
            { this.bodyContent() }
        </div>
    }

    bodyContent(){
        return <div>body</div>
    }

    renderFooter(){
        return <div className={ style.content }>{ this.footerContent() }</div>
    }

    footerContent(){
        return <CommonFooter/>
    }

    render(){
        return(
            <div className={ style["common-outer"] }>
                <div className={ style.header }>
                    { this.renderHeader() }
                </div>
                { this.renderBody() }
                <div className={ style.footer }>
                    { this.renderFooter() }
                </div>
            </div>
        )
    }
}