function Alcargar(){
	var nombre = sessionStorage.getItem('nombre');
	var imagen = sessionStorage.getItem('imagen');
	ponerimagen(imagen);
	Control('bienvenida').innerHTML="Hola "+nombre+"!";
	Control('spinner').style.display= "none";
	escucharEventos();
}	

function escucharEventos(){
	Control('seguir').addEventListener('click', seguir);
	Control('cerrar').addEventListener('click', cerrar);	  
	Control('baja').addEventListener('click', baja);
}

function ponerimagen(imagen){
	//var rutaimagen = "http://localhost:666/uploads/img/usuarios/";
	var servidor = "https://api-back-calvo.herokuapp.com/app/uploads/img/usuarios/";
	if(imagen !== "null" & imagen !== "" ){
		Control('img_previa').src = rutaimagen + imagen;
	}else{
		Control('img_previa').src="img/user.png";
	}
}	

function seguir(){
	window.location = 'Publicaciones.html';
}


function cerrar(){
	alert ("Te esperamos de regreso pronto "+sessionStorage.getItem('nombre')+" !!!");
	sessionStorage.clear();
	window.location = 'Login.html';
}	

function baja(){
	if (confirm("Tu cuenta será eliminada permanentemente. Seguro que deseas darte de baja?")){
		var datos= new FormData();
		datos.append("usuario", sessionStorage.getItem('usuario'));
		datos.append("imagen", sessionStorage.getItem('imagen'));
		//var servidor = "http://localhost:666/BajaUsuario";
		var servidor = "https://api-back-calvo.herokuapp.com/app/BajaUsuario";
		EnviarPost(servidor, datos,  Respuesta);
		cerrar();
	}
}	

function Respuesta(mensaje){
	alert(mensaje);
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


	

