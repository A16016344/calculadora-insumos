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
			
(function() {
  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();