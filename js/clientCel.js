var socket = io.connect('https://pinguino-julian10404.c9users.io/');
//var socket = io.connect('http://52.55.56.172/');
var id = "";
var estadoSincro = 0;

// Paso 4 - Se envía el código para comparar
function comparaCodigo(){
    codigo = $("#code-mobile").val();
    if (codigo != "") {
        var data={
            id: id,
            codigo: codigo
        }
        socket.emit('comparaCodigo', data);
        createmobilearea();
    }else{
        showmessage("Ingrese el código",null,2000);
    }
}

// Paso 8 - Se reciben los datos y se realiza la accion
function realizaAccion(porcentaje){
    if (estadoSincro==1) {
        var data={
            codigo:codigo,
            porcentaje:porcentaje
        }
        socket.emit('realizaAccion', data);
    }else if(estadoSincro==0 && device=="mobile"){
      var idVideoDesc = syncCAjax( localStorage.getItem("video") ,'desc');
      moveframe(porcentaje,idVideoDesc);
    }
}

if (screen.width<1280) 
{    
    // Se crea la conexión con el servidor
    socket.on('connect', function() {
      id = socket.socket.sessionid;
    });
    
    //Paso 7 - Muestra alerta si se sincroniza correctamente
    socket.on('sincronizaCel', function (data) {
        if (data.estadoCodigo==1) {
            // Sincronizo correctamente
            estadoSincro=1;
            loadersynchronize();
            initializeactions(data.idVideo);
        }else if (data.estadoCodigo==2){
            // El código ya está en uso
            showmessage("El código ya se está usando",null,4000);
            estadoSincro=0;
        }else{
            // El código es incorrecto
            showmessage("El código es incorrecto",null,4000);
            estadoSincro=0;
        }
    });
    
    //Paso 11 - Se desconecta Web
    socket.on('desconectadoWeb', function () {
        showmessage("Se desconecto el cliente web",null,4000);
        estadoSincro=0;
        location.reload();
    });
    
     //Paso 14 - Termina la accion en la web
    socket.on('terminaAccion', function () {
        nextcanvas();
    });
    
    //Paso 16 - Cambia el estado de la acción(Bandera)
    socket.on('statusAccion', function (status) {
        setflagaccion(status);
    });
}