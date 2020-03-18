const initState = {
    editSalesData : [],
    customer : "",
    salesOrderId : '',
    modalOpen:false,
    EditModal:false,
    salesOrder_job: [],
    customer : [],
    substrate : [],
    cap : [],
    quantity : [],
    topSeal: [],
    special_inc: [],
    add_details : [],
    dispatch_date : [],
	sales_description: '',

}

const salesReducers = (state = initState, action) => {
    switch (action.type) {
        case 'toggleModal':
            return {
                ...state,
                modalOpen: !state.modalOpen
            }
        case 'handle_changes':
			return {
                ...state,
                [action.parent_state]: {
                    ...state[action.parent_state],
                    [action.child_state]: action.value
                }
            }
        case 'setDesc':
			return {
					...state,
					sales_description: action.desc
                }
        case 'editModal':
            return {
                ...state,
                EditModal: !state.EditModal,
            }

        case 'setSalesData':
            return {
                ...state,
                editSalesData: action.salesData,
				sales_description: action.sales_description,
                salesOrderId: action.sales_id,
                customer: action.customer,
            }

        case 'setJob':
            let temp_job = state.salesOrder_job;
            temp_job[action.idx] = action.e.target.value
            return {
                ...state,
                salesOrder_job : temp_job,
            }
        case 'setSubstrate':
            let temp_substrate = state.substrate;
            temp_substrate[action.idx] = action.e.target.value;

            return {
                ...state,
                substrate : temp_substrate,
            }
        case 'setCap':
            let temp_cap = state.cap;
            temp_cap[action.idx] = action.e.target.value
            return {
                ...state,
                cap : temp_cap,
            }
        case 'setQty':
            let temp_qty = state.quantity;
            temp_qty[action.idx] = action.e.target.value
            return {
                ...state,
                quantity : temp_qty,
            }
        case 'setTopSeal':
            let temp_seal = state.topSeal;
            temp_seal[action.idx] = action.e.target.value
            return {
                ...state,
                topSeal : temp_seal,
            }
        case 'setSpecialInx':
            let temp_special = state.special_inc;
            temp_special[action.idx] = action.e.target.value
            return {
                ...state,
                special_inc : temp_special,
            }
        case 'setAdditionalDetails':
            let temp_additional = state.add_details;
            temp_additional[action.idx] = action.e.target.value
            return {
                ...state,
                add_details : temp_additional,
            }

        case 'RemoveDataByIdx':
                let temp1 =state.salesOrder_job;
                let temp2 =state.substrate ;
                let temp3 =state.cap ;
                let temp4=state.quantity ;
                let temp5 =state.topSeal;
                let temp6 =state.special_inc;
                let temp7 =state.add_details ;

                temp1.splice(action.idx , 1);
                temp2.splice(action.idx , 1);
                temp3.splice(action.idx , 1);
                temp4.splice(action.idx , 1);
                temp5.splice(action.idx , 1);
                temp6.splice(action.idx , 1);
                temp7.splice(action.idx , 1);


            return {
                ...state,
                salesOrder_job : temp1,
                substrate : temp2,
                cap : temp3,
                quantity : temp4,
                topSeal : temp5,
                special_inc : temp6,
                add_details : temp7,
            }

        default:
            return state;
    }
}

export default salesReducers;
