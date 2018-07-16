$(document).ready(function(){
    //valores estaticos para numeros aleatoreos
    $('#btn-generar_tabla').click(function(){
        var a,c,x,m,rn=0;
    a=81;
    c=89;
    x=11;
    m=100;
    // a=$('#A_txt').val();
    // c=$('#C_txt').val();
    // x=$('#X_txt').val();
    // m=$('#M_txt').val();
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
    $('#btn-generar_tabla2').click(function(){
        var a,c,x,m,rn=0;
    // a=81;
    // c=89;
    // x=11;
    // m=100;
    a=$('#A_txt').val();
    c=$('#C_txt').val();
    x=$('#X_txt').val();
    m=$('#M_txt').val();
    //var paso1=0;
    //var resultado=0;
    
    var demanda= $('#demanda_txt').val();
    var cantidadAleatorios=demanda;    
        var contador= 0;
        //tabla Montecarlo general
        var htmlpuro='<table class="table table-striped"><thead><tr><th>#</th><th>Xn+1</th><th>Xn / M</th></tr></thead><tbody>';
        var eventos= $('eventos_txt').val();
        var probabilidad= $('probabilidad_txt').val();
        while((contador++)<demanda){
            var paso1=a*x;
            var resultado= ((paso1+parseInt(c))/parseInt(m)).toFixed(2);
             resultado= (resultado- Math.trunc(resultado)).toFixed(2);
             resultado= resultado*100;
             resultado= Math.trunc(resultado);
             x=resultado;
             rn= resultado/m;
            htmlpuro+='<tr>';
                htmlpuro+= '<td>'+contador+'</td>';
                htmlpuro+= '<td>'+x+'</td>';
                htmlpuro+= '<td>'+rn+'</td>';
            htmlpuro+='<tr>';
        }
        htmlpuro+='</tbody></table>';
        $('#table-responsive').html(htmlpuro)

        //tabla de probabilidad
        a=$('#A_txt').val();
        c=$('#C_txt').val();
        x=$('#X_txt').val();
        m=$('#M_txt').val();
        contador=0;
        //tiempos
        var array=[];
        var tEspera=0, tOcio=0, tSalida=0;
        
        var htmlpuro2='<table class="table table-striped"><thead><tr><th>Cliente</th><th>Tiempo Llegada</th><th>Tiempo Espera</th><th>Tiempo Ocio</th><th>Tiempo Servicio</th><th>Tiempo Salida</th></tr></thead><tbody>';
        while((contador++)<demanda){
            var tLlegada=Math.random(), tServicio=Math.random();
            var a_Llegada=tLlegada.toFixed(2);
            var a_Servicio=tServicio.toFixed(2);
            a_Llegada=a_Llegada*100;
            a_Llegada=Math.trunc(a_Llegada);
            a_Servicio=a_Servicio*100;
            a_Servicio=Math.trunc(a_Servicio);
            if(contador==1){
                tEspera=0,tOcio=0;
                tSalida= a_Llegada+ a_Servicio;
            }else{
                if(tSalida<a_Llegada){
                    tEspera=a_Llegada-tSalida;
                }else{
                    tEspera=tSalida-a_Llegada;
                }
                tSalida=a_Llegada+tEspera+a_Servicio;
            }
            htmlpuro2+='<tr>';
                htmlpuro2+= '<td>'+contador+'</td>';
                htmlpuro2+= '<td>'+a_Llegada+'</td>';
                htmlpuro2+= '<td>'+tEspera+'</td>';
                htmlpuro2+= '<td>'+tOcio+'</td>';
                htmlpuro2+= '<td>'+a_Servicio+'</td>';
                htmlpuro2+= '<td>'+tSalida+'</td>';
                htmlpuro2+='<tr>';
        }
    //     contador=0;
    //     while((contador++)<demanda){
    //        var paso1=a*x;
    //        var resultado= ((paso1+parseInt(c))/parseInt(m)).toFixed(2);
    //         resultado= (resultado- Math.trunc(resultado)).toFixed(2);
    //         resultado= resultado*100;
    //         resultado= Math.trunc(resultado);
    //         x=resultado;
    //         rn= resultado/m;
    //         htmlpuro2+= '<td>'+x+'</td>';
    //         htmlpuro2+='<tr>';
    //    }
        htmlpuro2+='</tbody></table>';
        $('#tabla-probabilidades').html(htmlpuro2)
    });
}); 