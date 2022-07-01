window.addEventListener('load', ()=> {
  let lon
  let lat

  let temperaturaValor = document.getElementById('temperatura-valor')
  let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

  let ubicacion = document.getElementById('ubicacion')
  let iconoAnimado = document.getElementById('icono-animado')

  let vientoVelocidad = document.getElementById('viento-velocidad')


  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( posicion => {
      //console.log(posicion.coords.latitude)
      lon = posicion.coords.longitude
      lat = posicion.coords.latitude
      
      //ubicación actual
      //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=351cdc268071d525ae785d1da4ed88d7`

      //ubicación por ciudad
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Calarca&lang=es&units=metric&appid=351cdc268071d525ae785d1da4ed88d7`

      //console.log(url)
      fetch(url)
        .then( response => { return response.json()})
        .then( data => {
          let temp = Math.round(data.main.temp)
          temperaturaValor.textContent = `${temp} °C`

          let desc = data.weather[0].description
          temperaturaDescripcion.textContent = desc.toUpperCase()

          ubicacion.textContent = data.name

          vientoVelocidad.textContent = `${data.wind.speed} m/s`
          //console.log(data.wind.speed)

          //Para Iconos Estaticos
          /*console.log(data.weather[0].icon)
          let iconCode = data.weather[0].icon
          const urlIcon = `https://openweathermap.org/img/wn/$(iconCode).png`
          console.log(urlIcon)
          */

          //Para Iconos Animados
          console.log(data.weather[0].main)
          switch (data.weather[0].main) {
            case 'Thunderstorm':
              iconoAnimado.src = 'animated/thunder.svg'
              console.log('Tormenta');
              break;
            case 'Drizzle':
              iconoAnimado.src = 'animated/rainy-2.svg'
              console.log('Llovizna');
              break;
            case 'Rain':
              iconoAnimado.src = 'animated/rainy-7.svg'
              console.log('Lluvia');
              break;             
            case 'Snow':
              iconoAnimado.src = 'animated/snowy-6.svg'
              console.log('Nieve');
              break; 
            case 'Clear':
              iconoAnimado.src = 'animated/day.svg'
              console.log('Limpio');
              break;
            case 'Atmosphere':
                iconoAnimado.src = 'animated/weather.svg'
                console.log('Atmosfera');
                break;          
            case 'Clouds':
              iconoAnimado.src = 'animated/cloudy-day-1.svg'
              console.log('Nubes');
              break;
            default:
              iconoAnimado.src = 'animated/cloudy-day-1.svg'
              console.log('Por Defecto');
              break;
          }
        })
        .catch( error=> {
          console.log(error)
        })
    })
  }
})