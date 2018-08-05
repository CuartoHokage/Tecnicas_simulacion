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
        if (miu>=landa) {
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
            htmlpuro2+= '<td>' + arrayMontecarlo[i][6] + '</td>'
            //Tiempo de Servicio
            htmlpuro2+= '<td>' + arrayMontecarlo[i][7] + '</td>'
            htmlpuro2 += '</tr>'
        }
        htmlpuro2 += '</tbody></table>';
        $('#tabla-probabilidades').html(htmlpuro2)
        }
        else {
            alert('Miu tiene que ser mayor a Landa');
        }
    });
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
}); 