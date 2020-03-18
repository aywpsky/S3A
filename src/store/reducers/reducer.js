import * as actionTypes from '../action';
const initialState={
    top_bar:true,
    side_bar:true,
    loginpage:false,
    isRegpage:false,
    recover_pass : false,
    footer : true
}

const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionTypes.TOP_BAR:
        return{
            ...state,
            top_bar:!state.top_bar
        };
        case actionTypes.SIDE_BAR:
        return{
            ...state,
            side_bar:!state.side_bar
        };
        case actionTypes.LOGINPAGE:
        return{
            ...state,
            loginpage:!state.loginpage
        };
        case actionTypes.REG_PAGE:
        return{
            ...state,
            isRegpage:!state.isRegpage
        };
        case actionTypes.SWITCHTOLOGIN:
        return{
            ...state,
           isRegpage:!state.isRegpage,

        };
        case actionTypes.SWITCHTOREG:
        return{
            ...state,
            isRegpage:!state.isRegpage
        };
        case actionTypes.RECOVER_PASS:
        return{
            ...state,
            recover_pass:!state.recover_pass
        };
        case actionTypes.FOOTER:
        return{
            ...state,
            footer:!state.footer
        };
        default :
        return state;
    }

}

export default reducer;
