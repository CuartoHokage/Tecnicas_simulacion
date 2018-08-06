$(document).ready(function () {
    //valores estaticos para numeros aleatoreos
    $('#btn-generar_tabla').click(function () {
        var a, c, x, m, rn = 0, rn2 = 0;
        a = 31;
        c = 31;
        x = 77;
        m = 131;
        // a=$('#A_txt').val();
        // c=$('#C_txt').val();
        // x=$('#X_txt').val();
        // m=$('#M_txt').val();
        //var paso1=0;
        //var resultado=0;

        var demanda = $('#demanda_txt').val();
        var cantidadAleatorios = demanda;
        var contador = 0;
        //tabla Montecarlo general
        var htmlpuro = '<table class="table table-striped"><thead><tr><th>Demanda</th><th>Aleatorio</th><th>P. Frecuencia</th><th>P. Acumulada</th><th>Indice menor</th><th>Indice mayor</th></tr></thead><tbody>';
        var eventos = $('eventos_txt').val();
        var probabilidad = $('probabilidad_txt').val();
        while ((contador++) < demanda) {
            var paso1 = parseInt(a) * parseInt(x);
            var resultado = ((paso1 + parseInt(c)) / parseInt(m)).toFixed(3);
            //aleatorio 
            resultado = (resultado - Math.trunc(resultado)).toFixed(3);
            //aleatorio
            rn = resultado;
            if (rn==0) {
                rn=(0.001).toFixed(3)
            }
            resultado = resultado * m;
            resultado = Math.round(resultado);

            x = resultado;
            htmlpuro += '<tr>';
            htmlpuro += '<td>' + contador + '</td>';
            htmlpuro += '<td>' + rn + '</td>';
            htmlpuro += '<td>' + contador + '</td>';
            htmlpuro += '<td>' + contador + '</td>';
            htmlpuro += '<td>' + contador + '</td>';
            htmlpuro += '<td>' + contador + '</td>';
            htmlpuro += '<tr>';
        }
        htmlpuro += '</tbody></table>';
        $('#table-responsive').html(htmlpuro)

        //tabla de probabilidad

    });
    //Linea de espera
    $('#btn-generar_tabla2').click(function () {
        var a, c, x, m, rn = 0;
        // a=81;
        // c=89;
        // x=11;
        // m=100;
        a = $('#A_txt').val();
        c = $('#C_txt').val();
        x = $('#X_txt').val();
        m = $('#M_txt').val();
        //var paso1=0;0
        //var resultado=0;

        //Variables de línea de espera
        var landa, miu=0;
        landa=$('#Landa_txt').val();
        miu=$('#Miu_txt').val();
        if (parseInt(miu)>=parseInt(landa)) {
        T_entreLlegada=0
        T_Servicio=0
        Hora_llegada=0
        Hora_inicioServicio=0
        Hora_terminacionServi=0
        T_Espera=0
        T_Sistema=0;
        var demanda = $('#demanda_txt').val();
        //Se hace que genere 40 números aleatorios mas
        demanda = demanda * 2
        var arrayMontecarlo = [];
        var cantidadAleatorios = demanda;
        var contador = 0;
        //tabla Montecarlo general
        var htmlpuro = '<table class="table table-striped"><thead><tr><th>#</th><th>Xn+1</th><th>Aleatorio 1</th><th>Xn+1</th><th>Aleatorio 2</th></tr></thead><tbody>';
        var eventos = $('eventos_txt').val();
        var probabilidad = $('probabilidad_txt').val();
        
        while ((contador++) < demanda) {
            var paso1 = parseInt(a) * parseInt(x);
            var resultado = ((paso1 + parseInt(c)) / parseInt(m)).toFixed(3);
            //aleatorio 
            resultado = (resultado - Math.trunc(resultado)).toFixed(3);
            //aleatorio
            rn = resultado;
            //Si el aleatorio da valores de 0 al aplicar la fórmula de logaritmo natural 
            //esta dara un error matematico pues el logaritmo natural de 0 es infinito y 
            //por ello le asignaremos un valor de 0.001 cada vez que este aleatorio salga
            //igual a cero
            if (rn==0) {
                rn=0.001
            }
            resultado = resultado * m;
            resultado = Math.round(resultado);
            //Procesos linea de espera
            T_entreLlegada=((-1*(1/landa))*Math.log(rn)).toFixed(3);
            
            x = resultado;

            if (contador<=(demanda/2)) {
                arrayMontecarlo.push([x, rn,T_entreLlegada])
            }else{
                arrayMontecarlo.push([x, rn])
            }
            
            
            /*htmlpuro+='<tr>';
                htmlpuro+= '<td>'+contador+'</td>';
                    htmlpuro+= '<td>'+x+'</td>';
                    htmlpuro+= '<td>'+rn+'</td>'
                    htmlpuro+= '<td>'+x+'</td>';
                    htmlpuro+= '<td>'+rn+'</td>'
            htmlpuro+='</tr>';/*
            */
        }
        console.log(arrayMontecarlo)

        for (let i = 0; i < arrayMontecarlo.length / 2; i++) { // Solo genero 10 filas
            htmlpuro += '<tr>';
            htmlpuro += '<td>' + (i+1) + '</td>';
            
            // Aleatorios de llegada
            htmlpuro += '<td>' + arrayMontecarlo[i][0] + '</td>';
            htmlpuro += '<td>' + arrayMontecarlo[i][1] + '</td>'
            
            // Aleatorios de servicio
            htmlpuro += '<td>' + arrayMontecarlo[(arrayMontecarlo.length / 2)+i][0] + '</td>';
            htmlpuro += '<td>' + arrayMontecarlo[(arrayMontecarlo.length / 2)+i][1] + '</td>'

            htmlpuro += '</tr>'     
        }

        htmlpuro += '</tbody></table>';
        $('#table-responsive').html(htmlpuro)

        //tabla de probabilidad
        a = $('#A_txt').val();
        c = $('#C_txt').val();
        x = $('#X_txt').val();
        m = $('#M_txt').val();
        contador = 0;
        //tiempos

        //-(1/landa)ln aleatorio de llegada
        //-(1/miu)ln aleatorio de servicio
        var htmlpuro2 = '<table class="table table-striped"><thead><tr><th>Cliente</th><th>Aleatorio Llegada</th><th>Aleatorio Servicio</th><th>Tiempo entrada llegada</th><th>Tiempo Servicio</th><th>Hora de llegada Exacta</th><th>Hora de inicio Servicio</th><th>Hora de Terminación de Servicio</th><th>Tiempo de Espera</th><th>Tiempo en el sistema</th></tr></thead><tbody>';
        //=====================
        contador_deEspera=0;
        for (var i=0; i<arrayMontecarlo.length/2; i++){
            
            htmlpuro2 += '<tr>';
            htmlpuro2 += '<td>' + (i+1) + '</td>';
            
            //calcular tiempo de servicio
            T_Servicio=((-1*(1/miu))*Math.log(arrayMontecarlo[(arrayMontecarlo.length / 2)+i][1])).toFixed(3);
            arrayMontecarlo[(arrayMontecarlo.length / 2)+i].push(T_Servicio)
            ///
            /*Calcular hora de llegada*/
            Hora_llegada= (Hora_llegada+parseFloat(arrayMontecarlo[i][2]))
            arrayMontecarlo[i].push(Hora_llegada.toFixed(3));
            /**/
            /*Calcular hora de inicio Servicio*/
            if (i==0) {
                Hora_inicioServicio= (Hora_inicioServicio+parseFloat(arrayMontecarlo[i][3])) 
            }else{
                if (arrayMontecarlo[i][3]>arrayMontecarlo[i-1][5]) {
                    Hora_inicioServicio=arrayMontecarlo[i][3]
                }else{
                    Hora_inicioServicio=arrayMontecarlo[i-1][5]
                }
            }
            arrayMontecarlo[i].push(Hora_inicioServicio); 
            /**/
            /*Calcular hora de terminacion Servicio*/
            Hora_terminacionServi=parseFloat(arrayMontecarlo[i][4])+parseFloat(arrayMontecarlo[(arrayMontecarlo.length / 2)+i][2])
            arrayMontecarlo[i].push(Hora_terminacionServi.toFixed(3)); 
            /**/

            /**/
            /*Calcular Tiempo de Espera*/
            if (i==0) {
                T_Espera=0;
            } else {
                T_Espera=(arrayMontecarlo[i-1][5]-arrayMontecarlo[i][3])
                if (T_Espera<0) {
                    T_Espera=0;
                }
            }
            arrayMontecarlo[i].push(T_Espera.toFixed(3));
            /**/
            /**/
            /*Tiempo en el Sistema*/
            
            T_Sistema= parseFloat(arrayMontecarlo[i][6])+parseFloat(arrayMontecarlo[(arrayMontecarlo.length / 2)+i][2])
           // console.log(T_Sistema)
            arrayMontecarlo[i].push(T_Sistema.toFixed(3)); 
            /**/

            // Aleatorios de llegada
            htmlpuro2 += '<td>' + arrayMontecarlo[i][1] + '</td>'
            // Aleatorios de servicio
            htmlpuro2 += '<td>' + arrayMontecarlo[(arrayMontecarlo.length / 2)+i][1] + '</td>'
            //Tiempo entre llegada
            htmlpuro2 += '<td>' + arrayMontecarlo[i][2] + '</td>'
            //Tiempo de Servicio
            htmlpuro2 += '<td>' + arrayMontecarlo[(arrayMontecarlo.length / 2)+i][2] + '</td>'
            //Hora de Llegada
            htmlpuro2 += '<td>' + arrayMontecarlo[i][3] + '</td>'
            //Hora Inicio del Servicio
            htmlpuro2 += '<td>' + arrayMontecarlo[i][4] + '</td>'
            //Hora Terminacion del Servicio
            htmlpuro2 += '<td>' + arrayMontecarlo[i][5] + '</td>'
            //Tiempo de espera
            if (arrayMontecarlo[i][6]==0) {
                htmlpuro2+= '<td>' + arrayMontecarlo[i][6] + '</td>'
            } else {
                htmlpuro2+= '<td bgcolor="#A6D7C3">' + arrayMontecarlo[i][6] + '</td>'
                contador_deEspera++;
            }
            //Tiempo de Servicio
            htmlpuro2+= '<td>' + arrayMontecarlo[i][7] + '</td>'
            htmlpuro2 += '</tr>'
        }
        htmlpuro2 += '</tbody></table>';
        htmlpuro2+= '<label>'+contador_deEspera+' personas esperaran</label> '
        $('#tabla-probabilidades').html(htmlpuro2)
        }
        else {
            alert('Miu tiene que ser mayor a Landa');
        }
    });
    //Método Congruencial
    $('#btn-generar_tabla3').click(function () {
        var a, c, x, m, rn = 0;
        // a=81;
        // c=89;
        // x=11;
        // m=100;
        a = $('#A_txt').val();
        c = $('#C_txt').val();
        x = $('#X_txt').val();
        m = $('#M_txt').val();
        //var paso1=0;0
        //var resultado=0;

        //Variables de Aleatorio metodo Congruencial
        var demanda = $('#demanda_txt').val();
        //Se hace que genere 40 números aleatorios mas
        var arrayMontecarlo = [];
        var cantidadAleatorios = demanda;
        var contador = 0;
        //tabla Montecarlo general
        var htmlpuro = '<table class="table table-striped"><thead><tr><th>#</th><th>Xn</th><th>Xn+1</th><th>aleatorio1</th></tr></thead><tbody>';
        var eventos = $('eventos_txt').val();
        var probabilidad = $('probabilidad_txt').val();
        while ((contador++) < demanda) {
            var paso1 = parseInt(a) * parseInt(x);
            var resultado = ((paso1 + parseInt(c)) / parseInt(m)).toFixed(3);
            //aleatorio 
            resultado = (resultado - Math.trunc(resultado)).toFixed(3);
            //aleatorio
            rn = resultado;
            resultado = resultado * m;
            resultado = Math.round(resultado);
            xn1=x;            
            x = resultado;
            arrayMontecarlo.push([contador,x,xn1,rn])
                
        }
        console.log(arrayMontecarlo)

        for (let i = 0; i < arrayMontecarlo.length; i++) { // Solo genero 10 filas
            htmlpuro += '<tr>';
            htmlpuro += '<td>' + arrayMontecarlo[i][0] + '</td>';
            htmlpuro += '<td>' + arrayMontecarlo[i][2] + '</td>';
            htmlpuro += '<td>' + arrayMontecarlo[i][1] + '</td>';
            htmlpuro += '<td>' + arrayMontecarlo[i][3] + '</td>';
            htmlpuro += '</tr>'     
        }
        htmlpuro += '</tbody></table>';
        $('#table-responsives').html(htmlpuro)       
    });
    //Poisson
    $('#btn-generar_tabla4').click(function(){
        miu=0;
        landa=0;
        probabilidad_nopeticiones=0;
        promedio_peticiones=0;
        tiempo_promedioEspera=0;
        tiempo_promedioServicio=0;
        probabilidad_espera=0;
        n_peticiones=$('#N_Peticiones_txt').val();
        t_servicios=$('#T_Servicio_txt').val();
        
        if (t_servicios >= 1 && t_servicios <= 60) {
            t_servicios=60/t_servicios
            if (n_peticiones>t_servicios) {
                miu=n_peticiones;
                landa=t_servicios;
            } else {
                miu=t_servicios;
                landa=n_peticiones;
            }
            if (miu==landa) {
                alert('Miu y Landa no pueden ser iguales pues dará un error matemático en las fórmulas')
            }
            //console.log(miu, landa);
            //probabilidad de que no hayan peticiones
            probabilidad_nopeticiones= (1-(landa/miu)).toFixed(3);
            //Promedio de peticiones diarias
            lq=Math.pow(landa,2)/((miu-landa)*(miu))
            promedio_peticiones=(lq+(landa/miu)).toFixed(3);
            //Tiempo de espera promedio en minutos
            tiempo_promedioEspera=((1/(miu-landa))*60).toFixed(3)
            //Tiempo promedio de servicio
            tiempo_promedioServicio=((lq/landa)*60).toFixed(3)
            //Probabilidad de Espera
            probabilidad_espera=(landa/miu).toFixed(3)
            var variables= '<label>Miu:'+miu+'</label><br>';
             variables+= '<label>Landa:'+landa+'</label>';
            var htmlpuro = '<table class="table table-striped"><thead><tr><th>Probabilidad de no peticiones(Po)</th>\
            <th>Promedio de Peticiones (L)</th><th>Lq</th><th>Tiempo promedio de Espera (W)</th><th>Tiempo promedio de Servicio Wq</th>\
            <th>Probabilidad de espera (Pe)</th></tr></thead><tbody>';
            htmlpuro += '<tr>';
            htmlpuro += '<td>' + probabilidad_nopeticiones + '</td>';
            htmlpuro += '<td>' + promedio_peticiones + '</td>';
            htmlpuro += '<td>' + (lq).toFixed(3) + '</td>';
            htmlpuro += '<td>' + tiempo_promedioEspera + '</td>';
            htmlpuro += '<td>' + tiempo_promedioServicio + '</td>';
            htmlpuro += '<td>' + probabilidad_espera + '</td>';
            htmlpuro += '</tr>'     
            htmlpuro += '</tbody></table>';
            $('#table-responsives').html(htmlpuro)
            $('#variables').html(variables)
        }else{
            console.log(t_servicios)
            alert('tiempo fuera de rango por favor');
        }
    });
    //Montecarlo botones montecarlo
    $('#btn-generar_tabla5').click(function(){
        var a, c, x, m, rn = 0;
        // a=81;
        // c=89;
        // x=11;
        // m=100;
        a = $('#A_txt').val();
        c = $('#C_txt').val();
        x = $('#X_txt').val();
        m = $('#M_txt').val();
        //var paso1=0;0
        //var resultado=0;
        //Variables de Aleatorio metodo Congruencial
        var demanda = $('#demanda_txt').val();
        //Se hace que genere 40 números aleatorios mas
        var arrayMontecarlo = [];
        var cantidadAleatorios = demanda;
        var contador = 0;
        //tabla Montecarlo general
        var htmlpuro = '<table class="table table-striped"><thead><tr><th>#</th><th>Xn</th><th>Xn+1</th><th>aleatorio1</th></tr></thead><tbody>';
        var eventos = $('eventos_txt').val();
        var probabilidad = $('probabilidad_txt').val();
        while ((contador++) < demanda) {
            var paso1 = parseInt(a) * parseInt(x);
            var resultado = ((paso1 + parseInt(c)) / parseInt(m)).toFixed(3);
            //aleatorio 
            resultado = (resultado - Math.trunc(resultado)).toFixed(3);
            //aleatorio
            rn = resultado;
            resultado = resultado * m;
            resultado = Math.round(resultado);
            xn1=x;            
            x = resultado;
            arrayMontecarlo.push([contador,x,xn1,rn])
                
        }
        console.log(arrayMontecarlo)
        for (let i = 0; i < arrayMontecarlo.length; i++) { // Solo genero 10 filas
            htmlpuro += '<tr>';
            htmlpuro += '<td>' + arrayMontecarlo[i][0] + '</td>';
            htmlpuro += '<td>' + arrayMontecarlo[i][2] + '</td>';
            htmlpuro += '<td>' + arrayMontecarlo[i][1] + '</td>';
            htmlpuro += '<td>' + arrayMontecarlo[i][3] + '</td>';
            htmlpuro += '</tr>'     
        }
        htmlpuro += '</tbody></table>';
        sessionStorage['arrayAleatorios']= JSON.stringify(arrayMontecarlo);
        $('#table-responsives').html(htmlpuro)    
    });
    $('#btn-generar_tabla6').click(function(){
        var numeroDeTextos = $('#demanda2_txt').val();
		var contador = 0
        var html = ''
        html='<table class="table table-striped"><tbody>';
        html += '<td>' + '<label>F(x)</label>' + '</td>';
        while((contador++)<numeroDeTextos)
		{   
            html+= '<th>'+contador+'</th>'
            html += '<td>' + '<input type="number" value=""  class="numero">' + '</td>';
        }
        $('#tabla_probabilidades').html(html)

        html3='<table class="table table-striped"><tbody>';
        html3 += '<td>' + '<label>Frecuencia</label>' + '</td><br>';
        contador=0, numeroDeTextos = $('#demanda2_txt').val();
        while((contador++)<numeroDeTextos)
		{   
            html3+= '<th>'+contador+'</th>'
            html3 += '<td>' + '<input type="number" value=""  class="numero">' + '</td>';
        }
        
		$('#tabla_probabilidades3').html(html3)
    });
    $('#btn-generar_tabla7').click(function(){
        var arrayMontecarlo = [];
        contador=0
		$('.numero').each(function(){
            contador++
            arrayMontecarlo.push([contador,(parseFloat(this.value)).toFixed(3)])
        })
        contador=0
        $('#btn-generar_tabla8').click(function(){
            var htmlpuro2 = '<table class="table table-striped"><thead><tr><th>Días de atencion</th><th>Numero de atención</th>\
            <th>Probabilidad</th><th>Probabilidad Acumulada</th><th>Rango Menor</th>\
            <th>Rango Mayor</th></tr></thead><tbody>';
            
            probabilidad_acumulada=0, rango_menor=0,rango_mayor=0;
            for (let i = 0; i < arrayMontecarlo.length / 2; i++) { // Solo genero 10 filas
                //probabilidad Acumulada
                if (probabilidad_acumulada==0) {
                    probabilidad_acumulada=parseFloat(arrayMontecarlo[i][1])
                   //console.log(probabilidad_acumulada)
                }else{
                    probabilidad_acumulada=probabilidad_acumulada+parseFloat(arrayMontecarlo[i][1])
                }
                arrayMontecarlo[i].push((probabilidad_acumulada).toFixed(3))
                //rango menor
                if (i==0) {
                    rango_menor=0
                }else{
                    rango_menor=parseFloat((arrayMontecarlo[i-1][2]))+0.001
                }
                arrayMontecarlo[i].push(rango_menor)
                                
                htmlpuro2 += '<tr>';
                htmlpuro2 += '<td>' + arrayMontecarlo[i][0] + '</td>';
                htmlpuro2 += '<td>' + parseFloat(arrayMontecarlo[(arrayMontecarlo.length / 2)+i][1]).toFixed(0) + '</td>';
                htmlpuro2 += '<td>' + arrayMontecarlo[i][1] + '</td>';
                htmlpuro2 += '<td>' + arrayMontecarlo[i][2] + '</td>';
                htmlpuro2 += '<td>' + parseFloat(arrayMontecarlo[i][3]).toFixed(3) + '</td>';
                htmlpuro2 += '<td>' + arrayMontecarlo[i][2] + '</td>';
    
                htmlpuro2 += '</tr>'     
            }
            console.log(arrayMontecarlo)
            htmlpuro2 += '</tbody></table>';
            $('#tabla_probabilidades2').html(htmlpuro2)
        });
        $('#btn-generar_tabla9').click(function(){
            arrayMontecarlo2=JSON.parse(sessionStorage['arrayAleatorios'])
            arrayDefinitivo=[];
            var htmlpuro = '<table class="table table-striped"><thead><tr><th>Evento</th><th>Aleatorios</th><th>Numero Atenciones</th></tr></thead><tbody>';
            
            for (let i = 0; i < arrayMontecarlo.length/2; i++) { // Solo genero 10 filas
                arrayDefinitivo.push([arrayMontecarlo2[i][0],arrayMontecarlo2[i][1],arrayMontecarlo[i][3],arrayMontecarlo[i][2],arrayMontecarlo[(arrayMontecarlo.length / 2)+i][1]])
            }
            for (let i = 0; i < arrayDefinitivo.length; i++) { // Solo genero 10 filas
                console.log(arrayDefinitivo.length)
                htmlpuro += '<tr>';
                htmlpuro += '<td>' + arrayDefinitivo[i][0] + '</td>';
                htmlpuro += '<td>' + arrayDefinitivo[i][1] + '</td>';
                bandera=0
                j=0
                while(bandera==0){
                    if ((((arrayDefinitivo[i][1])/100)>= arrayDefinitivo[j][2] )&&(((arrayDefinitivo[i][1])/100)<= arrayDefinitivo[j][3])) {
                        htmlpuro += '<td>' + parseFloat(arrayDefinitivo[j][4]).toFixed(0) + '</td>'
                        bandera=1
                    } else {
                        j++
                    }
                
                }
                htmlpuro += '</tr>';  
            }
            htmlpuro += '</tbody></table>';
            $('#tabla_probabilidades4').html(htmlpuro)
            console.log(arrayDefinitivo)
        });
	});
}); 