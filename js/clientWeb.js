var socket = io.connect('https://pinguino-julian10404.c9users.io/');
//var socket = io.connect('http://52.55.56.172/');
var idSocket;
var idVideo;
var codigoUsu;
// Paso 1 - Enviamos la petición del código al servidor
function peticionCodigo()
{
    var videoEnc = localStorage.getItem("video");
    var idVideo = syncCAjax(videoEnc,'desc');
    if (idVideo != undefined && idVideo > 0) {
        var data={
            id: idSocket,
            idVideo: idVideo
        };
        socket.emit('generaCodigo', data);
    }else{
        window.location="/";
    }
}

function setStatusActionMobile(status){
    if (device == "mobile-desktop" && !mobile) {
	    var data={
            codigo: codigoUsu,
            status: status
        };
        socket.emit('statusAction', data);
    }
}

// Paso 12 - Enviamos la petición del código al servidor
function terminaAccion()
{
    socket.emit('terminaAccion',codigoUsu);
}

if (screen.width >= 1280) 
{    
    // Se crea la conexión con el servidor
    socket.on('connect', function() {
        idSocket = socket.socket.sessionid;
    });
    
    //Paso 3 - Recibimos el código generado
    socket.on('guardarCodigo', function (codigo) {
        if (codigo==null || codigo==undefined || codigo=="") {
            showmessage("Haz click en la pantalla de tu computador y genera un nuevo código")
        }else{
            codigoUsu=codigo
            $("#code-desktop").text(codigo);
        }
        
    });
    
    
    //Paso 6 - Muestra alerta si se sincroniza correctamente
    socket.on('sincronizaWeb', function (data) {
        loadersynchronize();
        initializeactions(data.idVideo);
    });
    
    //Paso 10 - Recibe y realiza la acción a enviada desde el cel
    socket.on('realizaAccion', function (data) {
        moveframe(data.porcentaje,data.idVideo,2);
    });
}