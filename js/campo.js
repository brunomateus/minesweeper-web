var campoMinado = [];

function inicializar(nZonas){
    var campo = document.getElementById("campo_minado");
        var tamanhoZona = campo.getBoundingClientRect().width / nZonas;

    for(var i = 0; i < nZonas; i++){

        campoMinado[i] = new Array(nZonas);

        for(var j = 0; j < nZonas; j++){

            var zona = document.createElement("div");

            zona.style.width = tamanhoZona + "px";
            zona.style.height = tamanhoZona + "px";

            zona.style.top = (i * tamanhoZona) + "px";
            zona.style.left = (j * tamanhoZona) + "px";

            zona.id = 'z' + i + j;
            zona.className = "zona";

            zona.addEventListener("click", getZona);

            campo.appendChild(zona);

            campoMinado[i][j] = new Zona(i, j);
        }
        campo.appendChild(document.createElement("br"));
    }

    distribuirBombas(nZonas);
}

function getZona(evento){

    var id = this.id;
    var posicao = id.split("");
}

function distribuirBombas(nZonas){

    var bombasRestantes = nZonas * nZonas * 0.50;

    while(bombasRestantes > 0){
        for(var i = 0; i < nZonas; i++){
            for(var j = 0; j < nZonas; j++){
                var random = Math.random();
                var zonaAtual = campoMinado[i][j];
                if(random > 0.9 &&  zonaAtual.temBomba == false){
                    campoMinado[i][j].temBomba = true;
                    bombasRestantes--;
                    if(bombasRestantes == 0){
                        return;
                    }
                }
            }
        }
    }
}

function mostrarTudo(){


    for(var i = 0; i < campoMinado.length; i++){
        for(var j = 0; j < campoMinado[i].length; j++){
            var zonaAtual = campoMinado[i][j];

            var zona = document.getElementById("z"+ zonaAtual.x + zonaAtual.y);
            if(zonaAtual.temBomba){
                zona.className = "zona bomba";
            }

            if(zonaAtual.temBandeira){
                zona.className = "zona bandeira";
            } else {
                zona.innerHTML = zonaAtual.vizinhosBombados;
            }
        }
    }

}

function Zona(x, y){

    this.x = x;
    this.y = y;
    this.temBomba = false;
    this.temBandeira = false;
    this.vizinhosBombados = "";
    this.revelado = false;

}

window.addEventListener("load", function(){
    campoMinado = new Array(10);
    inicializar(10);
    mostrarTudo();
});
