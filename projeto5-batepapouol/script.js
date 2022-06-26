//mensagens no chat
let promessachat;
let mensagens;
function msgOfChat() {
    promessachat = axios.get("  SLA OQ  ");
    promessachat.then(sendAnser);
}
function sendAnser(resposta) {
    mensagens.innerHTML="";
    let informacoes = resposta.data;
    mensagens = document.getElementById("chat");
    for(let i = 0 ; i < informacoes.length ; i++){
        if(informacoes[i].type == "status"){
            mensagens.insertAdjacentHTML("beforeend",
            `<div class="msgreceivedstatus mensagem${[i]}" >
                <div class="msglength">
                    <p class="tempo">(${informacoes[i].time})</p>
                    <p class="para"><b>${informacoes[i].from}</b> to <b>${informacoes[i].to}:</b> </p>
                    <p class="texto"> ${informacoes[i].text}</p>
                </div>
            </div>
            <div class="margem"></div>`);
        }else if(informacoes[i].type == "message"){
            mensagens.insertAdjacentHTML("beforeend",
            `<div class="msgreceivedmessage mensagem${[i]}">
                <div class="msglength">
                    <p class="tempo">(${informacoes[i].time})</p>
                    <p class="para"><b>${informacoes[i].from}</b> to <b>${informacoes[i].to}:</b> </p>
                    <p class="texto"> ${informacoes[i].text}</p>
                </div>
            </div>
            <div class="margem"></div>`);
        }else if (informacoes[i].to == nome){
            mensagens.insertAdjacentHTML("beforeend",`
            <div class="msgreceivedreservada mensagem${[i]}">
                <div class="tamanhodamsg">
                    <p class="tempo">(${informacoes[i].time})</p>
                    <p class="para"><b>${informacoes[i].from}</b> to <b>${informacoes[i].to}:</b> </p>
                    <p class="texto"> ${informacoes[i].text}</p>
                </div>
            </div>
            <div class="espaco"></div>`);
        }
    }
    let tamanhodoarray = informacoes.length -1
    let elementoQueQueroQueApareca = document.querySelector(`.mensagem${tamanhodoarray}`);
    elementoQueQueroQueApareca.scrollIntoView();
}
setInterval(() => {
    mensagens = document.querySelector(".chat")
    promessa = axios.get("  SLA OQ  ");
    promessa.then(sendAnser);
},3000);
console.log(sendAnser);


//pessoas on                                                        (não estou confiante com esta parte)
let promessaentrar;
let pessoason;
let icones;
let pessoamarcada;
let icone;
let primeiroicone;
promessaentrar = axios.get("    SLA OQ  ");
promessaentrar.then(peopleOn);
function peopleOn(nomes) {
    pessoason = nomes.data;
    for(let x=0; x < pessoason.length; x++){
        icones = document.querySelector(".peopleon");
        icones.innerHTML +=`
        <div class="all" onclick="addCheck(this)">
            <div class="left">
            <ion-icon class="person-circle-icon" name="person-circle"></ion-icon>
            <div class="menunames">${pessoason[x].name}</div>
            </div>
        </div>`;
    }
}
setInterval(() => {
    icones.innerHTML=`
    <div class="all" onclick="addCheck(this)">
        <div class="left">
        <ion-icon class="people-icon" name="people"></ion-icon>
        <div class="menunames">Todos</div>
        </div>
        <ion-icon class="checkmark-outline-icon" name="checkmark-outline" id="icon"></ion-icon>
    </div>`;
    promessaentrar = axios.get("    SLA OQ  ");
    promessaentrar.then(peopleOn);
},10000);


//entrar
let nome;
let mensagem;
let promessarequisicao;
let entrarnasala;
function takename(){
    nome = document.querySelector(".name").value;
    if(nome){
        document.getElementById("login").style.display="none";
        document.getElementById("page").style.display="block";
        getOnChat();
    }
}
function getOnChat(){
    entrar = axios.post("   SLA OQ  ", 
    {
        name: nome
    }
    ).then(resposta => {console.log(resposta)}).catch(deuRuim);
    keepConection()
    msgOfChat()
}
function keepConection(){
    setInterval(() => {
        entrarnasala = axios.post("   SLA OQ  ",
        {
            name: nome
        }
        ).then(resposta => {console.log(resposta)}).catch(deuRuim);
    },5000);
}
function sengMsg() {
    mensagem = document.querySelector(".sendmsg").value;
    if(mensagem){
        sendMsgServer();
    }
}
function sendMsgServer(){
    promessarequisicao = axios.post("   SLA OQ  ",
    {
        from: nome,
        to: 'all',
        text: mensagem,
        type: 'message'
    }).then(resposta => {
        promessa = axios.get("   SLA OQ  ");
        promessa.then(enviarResposta);
        document.getElementById("sendmsg").value='';}).catch(meterOPe);
}
document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
        let botaoum = document.querySelector("#submetermsg");
        botaoum.click();  
    }
});
function sair() {
    window.location.reload();
}        
function erro(){ 
    alert("erro")
}