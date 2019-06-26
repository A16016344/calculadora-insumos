			function calcular(){
				var HTML = "";
				cap = document.querySelectorAll('.cap');
				bolsas = document.querySelectorAll('.bolsas');
				onzas = document.querySelectorAll('.onzas');
				gramos = document.querySelectorAll('.gramos');
				for (i=0;i < cap.length; i++){
					if (bolsas[i].value == ""){bolsas[i].value = 0;}
					if (onzas[i].value == ""){onzas[i].value = 0;}
					if (gramos[i].value == ""){gramos[i].value = 0;}
					oz_bolsa = parseInt(cap[i].classList[1]);
					g_bolsa = parseInt(cap[i].classList[2]);
					oz_g =  oz_bolsa / g_bolsa;
					onzasTotales = parseInt(bolsas[i].value)*oz_bolsa + parseInt(onzas[i].value) + parseInt(gramos[i].value)*oz_g;
					if (onzasTotales != 0){
						HTML = HTML + "<fieldset><legend>"+cap[i].innerText+"</legend><b>"+cap[i].classList[3]+":</b> "+parseInt(onzasTotales)+" oz</fieldset>";
					}
				}
				document.getElementById("resultados").innerHTML = "<form>" + HTML + "<input class='button' type='button' onclick='mostrar();' value='Modificar'><input class='button' type='button' onclick='recargar();' value='Reiniciar'></form>";
				document.getElementById("resultados").classList.remove('hidden');
				document.getElementById("datos").classList.add('hidden');
				activado = localStorage.getItem("activado");
				if (activado != "true"){
					sumador = localStorage.getItem("sumador");
					if (sumador == "NaN"){localStorage.setItem("sumador",0)}
					localStorage.setItem("sumador",parseInt(sumador)+1);
					if (sumador == "NaN"){localStorage.setItem("sumador",0)}
					if (sumador > 50 & sumador <= 100){
						alert("Te quedan solo "+(100-sumador)+" clicks, ve a ajustes activación para activar tu aplicación");
					}
					if (sumador > 100) {
						alert("Tu periodo de prueba a finalizado, es necesario que actives tu aplicación");
						window.open("activacion.html",'_self');
					}
				}
			}
			function mostrar(){
				document.getElementById("datos").classList.remove('hidden');
				document.getElementById("resultados").classList.add('hidden');
			}
			function recargar(){
				opcion = confirm("Se borraran todos los datos. ¿Reiniciar?");
				if (opcion == true) {
					location.reload();
				}
			}
			
			function validarActivacion() {
				activado = localStorage.getItem("activado");
				if (activado == "true"){
					document.getElementById("datos").classList.add('hidden');
					document.getElementById("resultados").classList.remove('hidden');
				}
			}
			
			function activar() {
				localStorage.setItem("activado","true")
			}
			
(function() {
  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();