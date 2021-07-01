function Alcargar(){
	var nombre = sessionStorage.getItem('nombre');
	var imagen = sessionStorage.getItem('imagen');
	ponerimagenUsuario(imagen);
    cargarRubros();
    cargarPublicaciones();
    Control('usuario').innerHTML = nombre;
	Control('spinner').style.display= "none";
    escucharEventos();
}	

function escucharEventos(){
    Control('cerrar').addEventListener('click', salir);	  
	Control('baja').addEventListener('click', baja);
    Control('rubros').addEventListener('change', cargarPublicaciones);
    Control('rubros').addEventListener("click",function(e){e.preventDefault();});
}

function ponerimagenUsuario(imagen){
	var rutaimagen = "http://localhost:666/uploads/img/usuarios/";
	if(imagen !== "null" & imagen !== "" ){
		Control('photouser').src = rutaimagen + imagen;
	}else{
		Control('photouser').src="img/user.png";
	}
}

function cargarRubros(){
    var servidor = "http://localhost:666/PedirRubros";
    EnviarPedidoDatos(servidor, PonerRubros);
}

function PonerRubros(Respuesta){
    var RubrosRecibidos = JSON.parse(Respuesta); 
    var li = ['<li><a href=""  onclick="cargarPublicaciones(0)" >Todas</a></li>']
    RubrosRecibidos.forEach(element => {
    li.push('<li><a href="" onclick="cargarPublicaciones('+element.id_rubro+')">'+ element.categoria + '</a></li>');
    });
    Control('rubros').innerHTML = li;
}

function cargarPublicaciones(id){
    var datos= new FormData();
    datos.append("id_rubro", id);
    var servidor = "http://localhost:666/FiltrarPublicaciones";
    EnviarPost(servidor, datos, mostrarPublicaciones);

}

function mostrarPublicaciones(Respuesta){
    var Publicaciones = JSON.parse(Respuesta); 
    var tr = [];
    Publicaciones.forEach(element => {
        tr.push('<tr><div class="publicacion" ><div class="head_pub"><h3 id ="usuario_pub">'+element.username+'</h3><h2 id ="rubro_pub">'+element.categoria+'</h2></div><div class="imagen_pub"><img id ="img_pub" src="data:'+ element.tipo_imagen +';base64,'+element.imagen+'"><div class="cuerpo_pub"><h1 id="titulo_pub">'+element.titulo+'</h1><span id ="texto_pub">'+element.contenido+'</span><h1 id="pie_pub">'+element.pie+'</h1></div></div><div class="foot_pub"><span id="fecha_pub">'+element.fecha+'</span><span id="iconos_pub"></span></div></div></tr>');
    });
    Control('publicacion').innerHTML = tr;
}


function salir(){
    addEventListener("click",function(e){e.preventDefault();});
    alert ("Te esperamos de regreso pronto "+sessionStorage.getItem('nombre')+" !!!");
    sessionStorage.clear();
    window.location = "Login.html";
}	

function baja(){
    addEventListener("click",function(e){e.preventDefault();});
	if (confirm("Tu cuenta será eliminada permanentemente. Seguro que deseas darte de baja?")){
		var datos= new FormData();
		datos.append("usuario", sessionStorage.getItem('usuario'));
		datos.append("imagen", sessionStorage.getItem('imagen'));
		var servidor = "http://localhost:666/BajaUsuario";
		EnviarPost(servidor, datos,  Respuesta);
		cerrar();
	}
}	

function Respuesta(mensaje){
   alert(mensaje);
}
