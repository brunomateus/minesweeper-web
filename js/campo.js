function inicializar(nZonas){
    var campo = document.getElementById("campo_minado");
        var tamanhoZona = campo.getBoundingClientRect().width / nZonas;

    for(var i = 0; i < nZonas; i++){
        for(var j = 0; j < nZonas; j++){

            var zona = document.createElement("div");

            zona.style.width = tamanhoZona + "px";
            zona.style.height = tamanhoZona + "px";

            zona.style.top = (i * tamanhoZona) + "px";
            zona.style.left = (j * tamanhoZona) + "px";

            zona.id = 'z' + i + j;
            zona.className = "zona";

            campo.appendChild(zona);
        }
        campo.appendChild(document.createElement("br"));
    }
}

window.addEventListener("load", function(){
    inicializar(10);
});
