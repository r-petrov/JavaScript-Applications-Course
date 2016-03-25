/**
 * Created by PC on 27.02.2016 г..
 */
"use script";
var input = [{"manufacturer":"BMW","model":"E92 320i","year":2011,"price":50000,"class":"Family"},
{"manufacturer":"Porsche","model":"Panamera","year":2012,"price":100000,"class":"Sport"},
{"manufacturer":"Peugeot","model":"305","year":1978,"price":1000,"class":"Family"}];

function createTableHeader(obj) {
    var keys = Object.keys(obj),
        thead = $('<thead>'),
        tr = $('<tr>'),
        index,
        header;

    thead.append(tr);
    for (index = 0; index < keys.length; index++) {
        header = keys[index];
        header = header.charAt(0).toLocaleUpperCase() + header.slice(1);
        tr.append($('<td>' + header + '</td>')
            .css('border', '1px solid #000000')
            .css('background-color', '#809F40')
            .css('padding', '8px')
            .css('font-weight', 'bold'));
    }

    console.log(thead);
    return thead;
}

function generateTable(data) {
    var obj = data[0],
        table = $('<table>'),
        thead = createTableHeader(obj),
        tbody = $('<tbody>'),
        tr,
        index,
        key,
        content,
        currentObject;

    table.append(thead);
    table.append(tbody);

    for (index in data) {
        currentObject = data[index];
        tr = $('<tr>');
        for (key in currentObject) {
            content = currentObject[key];
            tr.append($('<td>' + content + '</td>>')
                .css('border', '1px solid #000000')
                .css('padding', '8px'));
            tr.appendTo(tbody);
        }
    }

    table.css('border-collapse', 'collapse');

    return table;
}

$('#wrapper').append(generateTable(input));

