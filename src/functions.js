// import './jspdf.min.js';
import axios from 'axios';
import {toastController} from '@ionic/vue';

async function axiosReq(params){
    for(let p in params){
        if(p === 'data'){
            params[p] = toFormData(params[p]);
        }
    }
    return await axios(params);
}

function validateForm(obj,rules){
    let validated = {
        allValid: true
    };
    for(let r in rules){
        if((rules[r] == "required" || rules[r].isRequired ) &&
            obj[r] == undefined || obj[r] == '' ){
                validated[r] = 'empty';
        }else if((rules[r] != "required" || rules[r].isRequired ) &&
            obj[r] == undefined || obj[r] == '' ){
                validated[r] = true;  
        }else if(r != 'callback'){
            let emailregex = /[a-z0-9._]+@[a-z]+\.[a-z]{2,3}/i;
            let intregex = /[0-9]+/;

            validated[r] = true;

            if(rules[r].isEmail &&  obj[r].toLowerCase().match(emailregex))
                validated[r] = true;
            else if (rules[r].isEmail ){
                validated[r] = 'invalid_email';
                break;
            }

            if(rules[r].isInteger && obj[r].match(intregex))
                validated[r] = true;
            else if(rules[r].isInteger) {
                validated[r] = 'invalid_number';
                break;
            }

            if(rules[r].regexMatch != null && obj[r].match(rules[r].regexMatch))
                validated[r] = true;
            else if(rules[r].regexMatch != null) {
                validated[r] = 'value_and_regex_not_match';
                break;
            }

            if(rules[r].equalTo != null &&  obj[r] == rules[r].equalTo)
                validated[r] = true;
            else if(rules[r].equalTo != null) {
                validated[r] = 'values_not_match';
                break;
            }

            if(typeof rules[r].maxChars == 'number' && rules[r].maxChars >= obj[r].length)
                validated[r] = true;
            else if(typeof rules[r].maxChars == 'number') {
                validated[r] = 'invalid_length_max';
                break;
            }

            if(typeof rules[r].minChars == 'number' && rules[r].minChars <= obj[r].length)
                validated[r] = true;
            else if(typeof rules[r].minChars == 'number') {
                validated[r] = 'invalid_length_min';
                break;
            }


        }
    }

    let someEmpty = false;
    if(rules.callback != null){
        for(let v in validated){
            if(validated[v] === 'empty'){
                validated.allValid = false;
                rules.callback();
                someEmpty = true;
                break;
            }
        }
    }
    if(!someEmpty){
        for(let v in validated){
            if(validated[v] != true){
                validated.allValid = false;
                if(rules[v].callback != null){
                    rules[v].callback(validated[v],v);
                    break;
                }

            }
        }
    }

    return validated;
}


// function toPdf(selector,saveAs,marg=undefined) {
//     var pdf = new jsPDF('p', 'pt', 'letter');

//     source = document.querySelector(selector);

//     specialElementHandlers = {

//         '#bypassme': function (element, renderer) {

//             return true
//         }
//     };
//     margins = (marg != undefined) ? marg : {
//         top: 20,
//         bottom: 20,
//         left: 20,
//         width: 500
//     };


//     pdf.fromHTML(
//         source,
//         margins.left,
//         margins.top, {
//             'width': margins.width,
//             'elementHandlers': specialElementHandlers
//         },

//         function (dispose) {       
//             pdf.save(saveAs);
//         }, margins
//     );
// }

async function openToast(msg, type) {
    try {
        await toastController.dismiss();
    } catch(e) {
        console.log(e);
    }
    
    const toast = await toastController
        .create({
        message: msg,
        color:type,
        duration: 2000
        })
    return toast.present();
}

function toFormData(obj){
    var fd = new FormData();
    for(var i in obj){
        fd.append(i,obj[i]);
    }
    return fd;
}

function dateFormat(stringFormat,dateString){
    let date = new Date(Date.parse(dateString.match('[0-9]+-[0-9]+-[0-9]+ [0-9]+:[0-9]+:[0-9]+')[0]));
    let months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dateFormat = stringFormat.replaceAll('%y',date.getFullYear());
    dateFormat = dateFormat.replaceAll('%d',date.getDate());
    dateFormat = dateFormat.replaceAll('%lm',months[date.getMonth()]);
    dateFormat = dateFormat.replaceAll('%m',date.getMonth()+1);
    dateFormat = (date.getMinutes() >= 10) ?  dateFormat.replaceAll('%i',date.getMinutes()) : dateFormat.replaceAll('%i',"0"+date.getMinutes());
    dateFormat = (date.getSeconds() >= 10) ?  dateFormat.replaceAll('%s',date.getSeconds()) : dateFormat.replaceAll('%s',"0"+date.getSeconds());
    let hour = date.getHours() + 1;
    if(hour > 12) {
        dateFormat = dateFormat.replaceAll('%h',hour - 12);
        dateFormat = dateFormat.replaceAll('%a','pm');
    }else if(hour == 0){
        dateFormat = dateFormat.replaceAll('%h',12);
        dateFormat = dateFormat.replaceAll('%a','am');
    }else{
        dateFormat = dateFormat.replaceAll('%h',hour);
        dateFormat = dateFormat.replaceAll('%a','am');
    }
    dateFormat = dateFormat.replaceAll('%H',hour);
    return dateFormat;
}

function removeFix(object,fix){
    let newObj = {};
    for(let k in object){
        let key = k.toLowerCase().replaceAll(fix,""); 
        newObj[key] = object[k];
    }
    return newObj;
}


class LocalStore{
    set(key,value){localStorage.setItem(key,value);}
    get(key){return localStorage.getItem(key);}
    setObject(key,value){localStorage.setItem(key,JSON.stringify(value));}
    getObject(key){return JSON.parse(localStorage.getItem(key));}
    remove(key){localStorage.removeItem(key);}
    setInObject(parentKey,childKey,value){
        let parentObject = this.getObject(parentKey);
        parentObject[childKey] = value;
        this.setObject(parentKey,parentObject);
    }
    isset(key){
        if(localStorage.getItem(key) == null) return false;
        return true;
    }
    getInObject(parentKey,childKey){
        let parentObject = this.getObject(parentKey);
        return parentObject[childKey];
    }
    objectify(stringObj){
        stringObj = stringObj.replaceAll('&#34;','"');
        stringObj = JSON.parse(stringObj);
        return stringObj;
    }
}

const local = new LocalStore();



function toDataURL(file){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    return new Promise((resolve) => {
        filereader.addEventListener('load',() => {
            resolve(filereader.result);
        });
    });
}



function toDataURL(file){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    return new Promise((resolve) => {
        filereader.addEventListener('load',() => {
            resolve(filereader.result);
        });
    });
}








export { 
    axiosReq,
    validateForm,
    toFormData,
    openToast,
    local,
    dateFormat,
    removeFix,
    toDataURL
}; 