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
    //return total;
     document.getElementById("totalValue").innerHTML = formatValue(total);
}

function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
    for(var key in list){
         table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');" >Edit</button>  <button class="btn btn-default" onclick="deleteData('+key+');" >Delete</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

function formatDesc(desc){
    var str = desc.toLowerCase(); //toLowerCase, deixa tudo minusculo
    str = str.charAt(0).toUpperCase() + str.slice(1); //CharAt, primeira maiscula
    return str;
}

function  formatAmount(amount){
    return parseInt(amount);
}

function  formatValue(value){
    var str = parseFloat(value).toFixed(2) + ""; // toFixed, apenas dois numeros decimais, dois numeros apos o ponto
    str = str.replace(".",","); // replace, transforma ponto em virgula
    str = "R$ " + str;
    return str;
}

function addData(){
    if(!validation()){
        return; // validaçao de erros
    }
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

function deleteList() {
    if(confirm("Delete this list?")){
        list = [];
        setList(list);
    }
}

function updateData(){
    if(!validation()){
        return;// validaçao de erros
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc":desc, "amount": amount, "value":value };
    resetForm();
    setList(list);

}
function deleteData(id) {
    if(confirm("Delete this item?")){
        if(id === list.length - 1){
            list.pop();
        }else if (id === 0){
            list.shift(); // limpa o primeiro registro do array
        }else{
            var arrayAuxIni = list.slice(0, id);
            var arrayAuxEnd = list.slice(id + 1);
            list = arrayAuxIni.concat(arrayAuxEnd);
        }
        setList(list);
    }
}

function validation() { // função que faz validaçao de erros!
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    document.getElementById("erros").style.display = "none"; // se a validaçao estiver correta, some com retangulo de erros.
    var erros = "";

    if(desc === ""){
        erros += '<p>Fill out description</p>'; // precisa digitar uma descrição
    }

    if(amount === ""){
        erros += '<p>Fill out quantity</p>'; // quantidade
    }else if(amount != parseInt(amount)){
        erros += '<p>Fill out a valid amount</p>'; // digite um valor valido, somente inteiro sera valido.
    }
    if(value === ""){
        erros += '<p>Fill out quantity</p>'
    }else if(value != parseFloat(value)){
        erros += '<p>Fill out a valid value</p>'
    }

    if(erros != ""){
        document.getElementById("erros").style.display = "block";
        document.getElementById("erros").style.background = "rgba(85 ,85, 85 , 0.2)";
        document.getElementById("erros").style.color = "white"
        document.getElementById("erros").style.padding = "10px";
        document.getElementById("erros").style.margin = "10px";
        document.getElementById("erros").style.borderRadius = "13px"; //borderRadius, deixa retangulo dos erros arrendondado.

        document.getElementById("erros").innerHTML = "<h3>Error: </h3>" + erros;
        return 0;
    }else{
        return 1;
    }
}

function saveListStorage(list) { // salvar os dados no local storage, como list.
    var jsonStr = JSON.stringify(list); // transforma no lista em json para string, pois storage so aceita string.
    localStorage.setItem("list",jsonStr);
}

function initListStorage() {
    var testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList);
    }
    setList(list);
}

initListStorage();

//setList(list);
console.log(getTotal(list));
