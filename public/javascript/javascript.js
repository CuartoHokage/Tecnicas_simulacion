$(document).ready(function(){
    //valores estaticos para numeros aleatoreos
    
    $('#btn-generar_tabla').click(function(){
        var a,c,x,m,rn=0;
    a=81;
    c=89;
    x=11;
    m=100;
    //var paso1=0;
    //var resultado=0;
    
    var demanda= $('#demanda_txt').val();
    var cantidadAleatorios=demanda;    
        var contador= 0;
        //tabla Montecarlo general
        var htmlpuro='<table class="table table-striped"><thead><tr><th>Demanda</th><th>Aleatorio</th><th>P. Frecuencia</th><th>P. Acumulada</th><th>Indice menor</th><th>Indice mayor</th></tr></thead><tbody>';
        var eventos= $('eventos_txt').val();
        var probabilidad= $('probabilidad_txt').val();
        while((contador++)<demanda){
            var paso1=a*x;
            var resultado= ((paso1+c)/m).toFixed(2);
             resultado= (resultado- Math.trunc(resultado)).toFixed(2);
             resultado= resultado*100;
             resultado= Math.trunc(resultado);
             x=resultado;
             rn= resultado/m;
            htmlpuro+='<tr>';
                htmlpuro+= '<td>'+contador+'</td>';
                htmlpuro+= '<td>'+rn+'</td>';
                htmlpuro+= '<td>'+contador+'</td>';
                htmlpuro+= '<td>'+contador+'</td>';
                htmlpuro+= '<td>'+contador+'</td>';
                htmlpuro+= '<td>'+contador+'</td>';
            htmlpuro+='<tr>';
        }
        htmlpuro+='</tbody></table>';
        $('#table-responsive').html(htmlpuro)

        //tabla de probabilidad
        
    });
});