onload=function() 
{
	cAyuda=document.getElementById("mensajesAyuda");
	cNombre=document.getElementById("ayudaTitulo");
	cTex=document.getElementById("ayudaTexto");
	divTransparente=document.getElementById("transparencia");
	divMensaje=document.getElementById("transparenciaMensaje");
	form=document.getElementById("formulario");
	urlDestino="mail.php";
	claseNormal="input";
	claseError="inputError";
	ayuda=new Array();
	ayuda["Nombre Usuario"]="Ingresa tu nombre de usuario. De 4 a 50 caracteres. OBLIGATORIO";
	ayuda["Correo"]="Ingresa una direcci�n de correo electr�nico v�lido.";
	ayuda["Contrase�a"]="Ingresa una contrase�a de un m�nimo de 8 caracteres.";
	ayuda["Repetir Contrase�a"]="Ingresa de nuevo la contrase�a";
	preCarga("imagen/ok.gif", "imagen/loading.gif", "imagen/error.gif");
}
 


function preCarga()
{
  
	imagenes=new Array();
	for(i=0; i<arguments.length; i++)
	{
		imagenes[i]=document.createElement("img");
		imagenes[i].src=arguments[i];
	}
}

function nuevoAjax()
{ 
	var xmlhttp=false; 
	try 
	{ 
		// No IE
		xmlhttp=new ActiveXObject("Msxml2.XMLHTTP"); 
	}
	catch(e)
	{ 
		try
		{ 
			// IE 
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); 
		} 
		catch(E) { xmlhttp=false; }
	}
	if (!xmlhttp && typeof XMLHttpRequest!="undefined") { xmlhttp=new XMLHttpRequest(); } 
	return xmlhttp; 
}

function limpiaForm()
{
	for(i=0; i<=4; i++)
	{
		form.elements[i].className=claseNormal;
	}
	
}

function campoError(campo)
{
	campo.className=claseError;
	error=1;
}

function ocultaMensaje()
{
	divTransparente.style.display="none";
}

function muestraMensaje(mensaje)
{
	divMensaje.innerHTML=mensaje;
	divTransparente.style.display="block";
}

function eliminaEspacios(cadena)
{
	// Funcion para eliminar espacios delante y detras de cada cadena
	while(cadena.charAt(cadena.length-1)==" ") cadena=cadena.substr(0, cadena.length-1);
	while(cadena.charAt(0)==" ") cadena=cadena.substr(1, cadena.length-1);
	return cadena;
}

function validaLongitud(valor, permiteVacio, minimo, maximo)
{
	var cantCar=valor.length;
	if(valor=="")
	{
		if(permiteVacio) return true;
		else return false;
	}
	else
	{
		if(cantCar>=minimo && cantCar<=maximo) return true;
		else return false;
	}
}

function validaCorreo(valor)
{
	var reg=/(^[a-zA-Z0-9._-]{1,30})@([a-zA-Z0-9.-]{1,30}$)/;
	if(reg.test(valor)) return true;
	else return false;
}

function validaForm()
{
	limpiaForm();
	error=0;
	
	var inputUser=eliminaEspacios(form.inputUser.value);
	var inputRpass=eliminaEspacios(form.inputRpass.value);
	var inputPass=eliminaEspacios(form.inputPass.value);
	var inputCorreo=eliminaEspacios(form.inputCorreo.value);
	
	
	if(!validaLongitud(inputUser, 0, 4, 50)) campoError(form.inputUser);
	if(!validaLongitud(inputRpass, 0, 8, 50)) campoError(form.inputRpass);
	if(!validaLongitud(inputPass, 0, 8, 50)) campoError(form.inputPass);
	if(!validaCorreo(inputCorreo)) campoError(form.inputCorreo);
	
	
	if(error==1)
	{
		var texto="<img src='imagen/error.gif' alt='Error'><br><br>Error: revise los campos en rojo.<br><br><button style='width:45px; height:18px; font-size:10px;' onClick='ocultaMensaje()' type='button'>Ok</button>";
		muestraMensaje(texto);
	}
	else
	{
		var texto="<img src='imagen/loading.gif' alt='Enviando'><br>Enviando. Por favor espere.<br><br><button style='width:60px; height:18px; font-size:10px;' onClick='ocultaMensaje()' type='button'>Ocultar</button>";
		muestraMensaje(texto);
		
		var ajax=nuevoAjax();
		ajax.open("POST", urlDestino, true);
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send("InputUser="+InputUser);
		
		ajax.onreadystatechange=function()
		{
			if (ajax.readyState==4)
			{
				var respuesta=ajax.responseText;
				if(respuesta=="OK")
				{
					var texto="<img src='ok.gif' alt='Ok'><br>Gracias por su mensaje.<br>Le responderemos a la brevedad.<br><br><button style='width:45px; height:18px; font-size:10px;' onClick='ocultaMensaje()' type='button'>Ok</button>";
				}
				else var texto="<img src='error.gif'><br><br>Error: intente m�s tarde.<br><br><button style='width:45px; height:18px; font-size:10px;' onClick='ocultaMensaje()' type='button'>Ok</button>";
				
				muestraMensaje(texto);
			}
		}
	}
}

// Mensajes de ayuda

if(navigator.userAgent.indexOf("MSIE")>=0) navegador=0;
else navegador=1;

function colocaAyuda(event)
{
	if(navegador==0)
	{
		var corX=window.event.clientX+document.documentElement.scrollLeft;
		var corY=window.event.clientY+document.documentElement.scrollTop;
	}
	else
	{
		var corX=event.clientX+window.scrollX;
		var corY=event.clientY+window.scrollY;
	}
	cAyuda.style.top=corY+20+"px";
	cAyuda.style.left=corX+15+"px";
}

function ocultaAyuda()
{
	cAyuda.style.display="none";
	if(navegador==0) 
	{
		document.detachEvent("onmousemove", colocaAyuda);
		document.detachEvent("onmouseout", ocultaAyuda);
	}
	else 
	{
		document.removeEventListener("mousemove", colocaAyuda, true);
		document.removeEventListener("mouseout", ocultaAyuda, true);
	}
}

function muestraAyuda(event, campo)
{
	colocaAyuda(event);
	
	if(navegador==0) 
	{ 
		document.attachEvent("onmousemove", colocaAyuda); 
		document.attachEvent("onmouseout", ocultaAyuda); 
	}
	else 
	{
		document.addEventListener("mousemove", colocaAyuda, true);
		document.addEventListener("mouseout", ocultaAyuda, true);
	}
	
	cNombre.innerHTML=campo;
	cTex.innerHTML=ayuda[campo];
	cAyuda.style.display="block";
}
