var list = [
	{"desc":"arroz","amount":"1","value":"5.40"},//amount => quantidade
	{"desc":"cerveja","amount":"12","value":"1.99"},
	{"desc":"carne","amount":"1","value":"15.00"}
];

function getTotal(list){
	//debugger;
var total = 0;
    for(var key in list){
        total += list[key].value * list[key].amount;
    }
    return total;
}

function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
    for(var key in list){
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ list[key].amount +'</td><td>'+ formatValue(list[key].value) +'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');" >Edit</button> Delete</td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
}

function formatDesc(desc){
    var str = desc.toLowerCase(); //toLowerCase, deixa tudo minusculo
    str = str.charAt(0).toUpperCase() + str.slice(1); //CharAt, primeira maiscula
    return str;
}

function  formatValue(value){
    var str = parseFloat(value).toFixed(2) + ""; // toFixed, apenas dois numeros decimais, dois numeros apos o ponto
    str = str.replace(".",","); // replace, transforma ponto em virgula
    str = "R$ " + str;
    return str;
}

function addData(){
    debugger;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc":desc , "amount":amount ,"value":value });
    setList(list);
}

function setUpdate(id){
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
}

function updateData(){
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc":desc, "amount": amount, "value":value };
    resetForm();
    setList(list);

}



setList(list);
console.log(getTotal(list));
