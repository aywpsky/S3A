const initState = {
    job_sheet_id                :   '',
    is_job_sheet_complete       :   false,
    job_order_data              :   [],
    create_js_data              :   [],
    js_last_id                  :   '',
    job_order_data_cust         :   [],
    job_order_job_sheet_data    :   [],
    job_order_data_company      :   [],
    job_order_data_new          :   {},
    print_production_fields     :   false,
    logistic_fields             :   false,
    table_production_fields     :   false,
    isModalOpen                 :   false,
    createJSModal               :   false,
    displayJSModal              :   false,
    job                         :   null,
    salesOrder_job              :   null,
    customer                    :   null,
    substrate                   :   null,
    cap                         :   null,
    quantity                    :   null,
    topSeal                     :   null,
    type                        :   null,
    special_inc                 :   null,
    add_details                 :   null,
    startDate                   :   new Date(),
    actionType                  :   null
}

const warehouseReducer = (state = initState, action) => {
    switch (action.type) {

        case 'TOGGLE_MODAL':
            return {
                ...state,
                [action.state]: !state[action.state]
            }
        case 'HANDLE_CHANGE':
           return {
              ...state,
              [action.state]: action.value
           }
        case 'ONCHANGE':
            let stated = action.name;
            return {
                ...state,
                stated : action.value
            }

        case 'ONCHANGE_DATE':

            let stated_date = action.name;
            let d           = new Date(action.value);
            let year        = d.getFullYear();
            let day         = d.getDay() - 1;
            let month       = d.getMonth() + 1;
            let date_ex     = year.toString()+'-'+day.toString()+'-'+month.toString();

            return {
                ...state,
                stated_date : new Date(date_ex)
            }

        default:
            return state;
    }
}
export default warehouseReducer;
