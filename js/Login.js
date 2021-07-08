	  	
	function Alcargar(){
		Control('spinner').style.display= "none";
		Control('usuario').focus();
		escucharEventos();
	}
	
	function escucharEventos(){
		Control('enviar').addEventListener('click', verificar);
		Control('usuario').addEventListener('focus', function(event){event.target.value = "";});	  
		Control('contraseña').addEventListener('focus', function(event){event.target.value = "";});
	}
	
	function verificar() {//verificar datos correctos antes de enviar formulario (campos vacios y clave con digitos requeridos)
		var i = 1;
		var regla = /^(?!\s).+$/;
		var elemento = "";
		var error=false;
			while (i > 0){
				error=false;
				elemento = document.querySelector('[tabindex = "'+i+'"]').id;
				i++;
				if (!ValidarExpreg(Control(elemento).value, regla)){
					alert ('Error en el campo '+elemento+', no puede estar vacío ni comenzar con espacios.');
					error=true;
					Control(elemento).focus();
					break;
				}else{
					error=false;
				}
				if (elemento == 'enviar') {i=-1;}
			}
		if (!error){
			Control('spinner').style.display= "inline-grid";
			Control('enviar').style.display= "none";
			Enviar();
		}	
	}
	
	function Enviar(){
		var datos= new FormData();
		datos.append("usuario", Control("usuario").value);
		datos.append("pass", Control("contraseña").value);
		EnviarPost(servidor + '/Usuario/Buscar', datos,  Respuesta);	
	}

	function Respuesta(mensaje){
		
		if (mensaje.length > 0){

			//// traer los datos del usuario y ponerlos en sessioStorage (usuario y avatar)
			datos = JSON.parse(mensaje);
			var nombre = datos[0].nombre;
			var usuario = datos[0].username;
			var imagen =  datos[0].imagen;
			sessionStorage.setItem('nombre', nombre);
			sessionStorage.setItem('usuario', usuario);
			sessionStorage.setItem('imagen', imagen);
			window.location = 'Bienvenida.html';
		
		}else{
			alert('Usuario o contraseña incorrectos.');
			Control('usuario').focus();
			Control('enviar').style.display= "inline-grid";
		}

	}