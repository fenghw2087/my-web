import React from 'react';
import style from './less/layout.less';

export default class CommonFooter extends React.Component{


    render(){
        return <div style={{ width:'100%',height:'100%' }}>
            <div className={ style.footer_linkc }>
                {
                    new Array(20).fill(1).map((v,i)=>{
                        return <a key={ i } className={ style.link }>底部链接{ i }</a>
                    })
                }
            </div>
            <div className={ style.copy }>Copyright@1999-2018.miyi.com.All rights resreved. | ICP证：浙B2XXXXXXXXXXX</div>
        </div>
    }
}