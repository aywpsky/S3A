const initState = {
    modalOpen:false,
    cust_id : '',
    cust_name : '',
    data:[]
}

const reportreducers = (state = initState, action) => {
    switch (action.type) {
        case 'toggleModal':
            return {
                ...state,
                modalOpen: !state.modalOpen
            }

        case 'setId':
            return {
                ...state,
                modalOpen : !state.modalOpen,
                cust_id: action.value,
                cust_name : action.cust_name,
                data:action.data
            }
        break;

        default:
            return state;
    }
}

export default reportreducers;
