import {base64ToObj} from "./objexbase64";

const getParams =(props)=> {
    if(props.match &&  props.match.params && props.match.params.data){
        return base64ToObj(props.match.params.data)
    }else {
        return {};
    }
};

export default getParams