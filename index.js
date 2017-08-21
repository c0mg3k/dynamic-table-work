//Returns a collection (?array?) of input tags within the given div...
function getInputElesInDiv(divId) {
    var eles = document.getElementById(divId).getElementsByTagName('input');
    return eles;
}
//Returns an array of values pulled from an array of input elements...
function getInputEleVals(eles) {
    var valArr = [];
    for(var i = 0; i< eles.length; i++) {
        valArr.push(eles[i].value);
    }
    return valArr;
}
//Sets value of each input ele in eles to null (No return)
function clearInputEleVals(eles) {
    for(var i = 0; i< eles.length; i++) {
        eles[i].value = null;
    }
}

//Targets a table by given id and creates a row with cells for each value
function createTableRowWithVals(tableId, vals){
    var table = document.getElementById(tableId);
    var row = table.insertRow(-1);
    for(var i = 0; i < vals.length; i++){
        var cell = row.insertCell(-1);
        cell.innerText = vals[i];
    }
    var cell = row.insertCell(-1);
    cell.innerHTML = `<button class="btn btn-danger" onclick="deleteTableRow('address-table', this)">Delete</button>`;
    cell.className = 'json-ignore';
}

function addAddress() {
    var eles = getInputElesInDiv('address-form');
    var vals = getInputEleVals(eles);
    createTableRowWithVals('address-table', vals);
    clearInputEleVals(eles);
}

function deleteTableRow(tableId, r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById(tableId).deleteRow(i);
}
//Returns an array of strings representing th eles for a given table
function getKeysFromTableHeaders(tableId) {
    let thEles = document.getElementById(tableId).getElementsByTagName('th');
    let thVals = [];
    for(let i = 0; i < thEles.length; i++) {
        thVals.push(thEles[i].innerHTML);
    }    
    return thVals;
}

// function createJsonObjFromKeysVals(keys, vals){
//     for(var i = 0; i < keys.length; i++) {
//         let innerJString = ``;
//         innerJString = innerJString + `"` + keys[i] + `"` + " : " + `"` + vals[i] + `"`;
//         if(i + 1 < keys.length) {
//             innerJString = innerJString + ", "
//         }
//         return innerJString;
//     }
// }

//TEST
function getKeysFromTable(){

}

let tableKeys = ["City", "State", "Zip"];

let tableVals = ["Palatine", "Illinois", "60067"];
let tableVals2 = ["Delavan", "Wisconsin", "53115"];

let jAddresses = [];

let jWrapper = `{&|& |&|}`;
let key = `"SomeKey":`;
let val = `"SomeVal"`;

function createParentJsonTextWithCollection(jObjs, collectionName) {
    var text = `{"${collectionName}" : [`;
    for(var i = 0; i < jObjs.length; i++){
        text = text + jObjs[i] + ",";
    }
    text = text.slice(0, -1);
    text = text + `]}`;
    return text;
}

function createJsonObjFromKeysVals(keys, vals){
    let innerJString = ``;
    for(var i = 0; i < keys.length; i++) {
        
        innerJString = innerJString + `"` + keys[i] + `"` + " : " + `"` + vals[i] + `"`;
        if(i + 1 < keys.length) {
            innerJString = innerJString + ", "
        }
    }
    let result = `{ ${innerJString} }`
    return result;
}

function getValsFromTableRows(tableId) {
    let vals = [[]];
    let table = document.getElementById(tableId);

    let numOfRows = table.rows.length;
    for(let i = 0; i < numOfRows; i++) {
        let cells = table.rows[i].getElementsByTagName('td');
        let data = [];
        for(let j = 0; j < cells.length; j++) {
            if(cells[j].className != 'json-ignore') {
                data.push(cells[j].innerText);
            }
        }
        if(data.length != 0){
            vals.push(data);
        }
    }
    return vals;
}

var text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ]}';
jAddresses.push(createJsonObjFromKeysVals(tableKeys, tableVals2));
jAddresses.push(createJsonObjFromKeysVals(tableKeys, tableVals));

let result = createParentJsonTextWithCollection(jAddresses, 'addresses');

//let result1 = "[{a: 'val1', b: 'val2'}, {a: 'val3', b: 'val4'}]"
//let jAddress = createJsonObjFromKeysVals(tableKeys, tableVals);
// var obj = JSON.parse(jAddress);
var obj = JSON.parse(result);
// console.log(obj.addresses[0].City);
// var r2 = JSON.parse(result1);
// console.log(result);
function buildCompletJsonFromTable(tableId, collectionName) {
    let keys = getKeysFromTableHeaders(tableId);
    let valArrays = getValsFromTableRows(tableId);
    let jObjs = [];
    for(var i = 0; i < valArrays.length; i++) {
        if(valArrays[i].length > 0){
            jObjs.push(createJsonObjFromKeysVals(tableKeys, valArrays[i]))
        }
    }
    let result = createParentJsonTextWithCollection(jObjs, collectionName);
    console.log(JSON.parse(result));
}