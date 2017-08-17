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