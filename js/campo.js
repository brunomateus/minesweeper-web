var campoMinado = [];

function inicializar(nZonas, nivel){
    var campo = document.getElementById("campo_minado");
    var tamanhoZona = campo.getBoundingClientRect().width / nZonas;

    campoMinado = new Array(nZonas);

    for(var i = 0; i < nZonas; i++){

        campoMinado[i] = new Array(nZonas);

        for(var j = 0; j < nZonas; j++){

            var zona = document.createElement("div");

            zona.style.width = tamanhoZona + "px";
            zona.style.height = tamanhoZona + "px";

            zona.style.top = (i * tamanhoZona) + "px";
            zona.style.left = (j * tamanhoZona) + "px";

            zona.id = "z-" + i + "-" + j;
            zona.className = "zona";

            zona.addEventListener("click", getZona);

            campo.appendChild(zona);

            campoMinado[i][j] = new Zona(i, j);
        }
        campo.appendChild(document.createElement("br"));
    }

    distribuirBombas(nivel);
    contabilizarVizinhosBombados();
}

function getZona(evento){

    var id = this.id;
    var posicao = id.split("-");
     revelarZona(campoMinado[posicao[1]][posicao[2]]);
}

function revelarZona(zona){
    var zonaClicada = document.getElementById("z-"+zona.x+"-"+zona.y);

    zona.revelado = true;
    if(zona.temBomba){
        zonaClicada.className = "zona bomba";
        alert("Game Over");
    } else {
        zonaClicada.innerHTML = zona.vizinhosBombados;
        revelarVizinhanca(zona);
    }
}

function revelarVizinhanca(zona){

    paraTodoVizinhoValido(zona, function(vizinho){
        if(zona.vizinhosBombados == 0 && vizinho.temBomba == false && vizinho.revelado == false){
            revelarZona(vizinho);
        }
    });

}

function distribuirBombas(nivel){

    var nZonas = campoMinado.length;
    var bombasRestantes = Math.pow(nZonas, 2) * nivel;

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

function contabilizarVizinhosBombados(){

    var nZonas = campoMinado.length;

    for(var x = 0; x < nZonas; x++){
        for(var y = 0; y < nZonas; y++){

            var zonaAtual = campoMinado[x][y];
            var nBombas = contabilizarVizinhosZona(zonaAtual);
        }
     }
}

function contabilizarVizinhosZona(zona){

    var nBombas = 0;

    paraTodoVizinhoValido(zona, function(zonaVizinha){
          if(zonaVizinha.temBomba){
                    nBombas++;
            }
    });
    zona.vizinhosBombados = nBombas;
}

function paraTodoVizinhoValido(zona, funcao){
    var x = zona.x;
    var y = zona.y;
    var nZonas = campoMinado.length;

    for(var i = x -1; i <= x + 1; i++){
        for(var j = y - 1; j <= y + 1; j++){
            if(((x == 0 && i < x) || (x == nZonas - 1 && i > x)) ||
              ((y == 0 && j < y) || (y == nZonas - 1 && j > y)) ||
              (x == i && y == j)){
                continue;
            } else {
                var vizinho = campoMinado[i][j];
                //console.log("[", x, ", ", y, "] [", i, ", ", j, "]");
                funcao(vizinho);
            }
        }
    }
}

function mostrarTudo(){


    for(var i = 0; i < campoMinado.length; i++){
        for(var j = 0; j < campoMinado[i].length; j++){
            var zonaAtual = campoMinado[i][j];

            var zona = document.getElementById("z-"+ zonaAtual.x + "-" + zonaAtual.y);
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
    this.vizinhosBombados = null;
    this.revelado = false;

}

window.addEventListener("load", function(){
    inicializar(20, 0.15);
//    mostrarTudo();
});
