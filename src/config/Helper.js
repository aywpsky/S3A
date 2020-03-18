import CryptoJS from "crypto-js";
import axios from 'axios';
let key = 's3aManufacturing';

const result = localStorage.getItem('data');

const Helper = {
    isLoggedIn : function(){
        if (result) {
            const decrypt_data = CryptoJS.AES.decrypt(result.toString(), key);
            try {
                const data = JSON.parse(decrypt_data.toString(CryptoJS.enc.Utf8));
                if (data['isLoggedIn']) {
                    return true;
                }
            } catch (e) {
                localStorage.clear();
                return false;
            }
        }else{
            return false;
        }
    },
    getUserDetail : function(string){
        if (result) {
            const decrypt_data = CryptoJS.AES.decrypt(result.toString(), key);
            try {
                const data = JSON.parse(decrypt_data.toString(CryptoJS.enc.Utf8));
                return data[string];
            } catch (e) {
                return false;
            }
        }
    },

    toSqlDate : function(date){
        let my_date = new Date(date.getFullYear() , date.getMonth() , date.getDate() + 1 , 0,0,0,0).toISOString().slice(0, 20).replace('T', ' ');
        return  my_date;
    },

    formatDate : function(date) {
        var kani_naDate = new Date(date);
        var date = kani_naDate.getDate(); //Current Date
        var month = kani_naDate.getMonth() + 1; //Current Month
        var year = kani_naDate.getFullYear(); //Current Year
        var dd = (date < 10 ? '0' : '') + date;
        var MM = ((month) < 10 ? '0' : '') + (month);
        var yyyy = year;
        return (yyyy + "-" + MM + "-" + dd);
    },
    getMonth : function(m = 0){
        let Months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        return Months[m];
    }
}

export default Helper;
