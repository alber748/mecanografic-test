export const counts = {
      errors: 0,
      success: 0,
      complete : 0,
      pulsaciones : 0
}

export let chronometerIsRunning = false;

export const counterErrors = () => {

      counts.errors += 1;
}
export const counterSuccess = () => {

      counts.success += 1;
}


const reloadChronometer = (tiempoRestante : string) => {
      const cronometro : HTMLElement = document.getElementById("cronometro")!;
      cronometro.textContent = tiempoRestante;
}

export const initChronometer = () => {
      let tiempoRestante = 60;
      chronometerIsRunning = true;
      const intervalo = setInterval(function() {
            tiempoRestante--;

            if (tiempoRestante >= 0) {
                  const minutos = Math.floor(tiempoRestante / 60);
                  const segundos = tiempoRestante % 60;

                  const tiempoFormateado = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
                  reloadChronometer(tiempoFormateado);
            } else {
                  clearInterval(intervalo);
                  chronometerIsRunning = false;
                  const input : HTMLInputElement = document.querySelector('#text-word')!;
                  input.value = '';
                  input.disabled = true;
                  createResult();
            }
      }, 1000);
}


const createResult = () => {

      let porcentajeAcertado = (counts.errors / counts.pulsaciones) * 100;
      porcentajeAcertado = 100 - porcentajeAcertado;

      let totalError = counts.complete - counts.success;

      const html = `
      <h3>Resultados de tu Test</h3>
      <div class="px-3">
            <h5>Pulsaciones : ${counts.pulsaciones}</h5>
            <h5>Errores al teclear : ${counts.errors}</h5>
            <h5>Precisión : ${porcentajeAcertado.toFixed(2)}%</h5>
            <br>
            <h5>Palabras acertadas : ${counts.success}</h5>
            <h5>Palabras incorrectas : ${totalError}</h5>
            <h3>Palabras por Minuto : ${counts.complete}</h3>
      </div>`

      const result = document.querySelector('#results')!;
      result.innerHTML = html;
}