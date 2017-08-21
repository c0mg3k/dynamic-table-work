let keys1 = ["name", "age", "ssn"];
let values1 = ["Josh", 28, "123654798"];
function getValsFromTableRow(tableId) {
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
    console.log(vals);
    return vals;
}