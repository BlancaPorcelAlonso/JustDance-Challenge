// Obtiene los parámetros de la URL (como ?id=3) y los guarda en params
const params = new URLSearchParams(window.location.search);
// Extrae el valor del parámetro "id" de la URL
const id = params.get("id");

// Realiza una solicitud HTTP para cargar el archivo canciones.json
fetch("canciones.json")
  // Convierte la respuesta a formato JSON
  .then(response => response.json())
  // Una vez obtenidos los datos
  .then(datos => {
    // Busca el día específico en el array de days usando el id obtenido de la URL
    const dia = datos.days[id];
    // Obtiene la librería de canciones disponibles
    const songLibrary = datos.songLibrary;

    // Verifica si el día existe (validación)
    if (!dia) {
      // Si no existe, muestra un mensaje de error y un enlace para volver
      document.body.innerHTML = "<p>No se encontró ese día.</p><a href='index.html'>← volver</a>";
      return;
    }

    // Muestra el número del día en el elemento con id "day"
    document.getElementById("day").innerText = "DIA " + dia.day;
    // Muestra el tema del día en el elemento con id "theme"
    document.getElementById("theme").innerText = "Tema: " + dia.theme;
    // Muestra el tipo de música en el elemento con id "type"
    document.getElementById("type").innerText = "Tipo: " + dia.type;

    // Obtiene la referencia al elemento <ul> o contenedor donde irán las canciones
    const listaCanciones = document.getElementById("songs");

    // Itera sobre cada id de canción que pertenece a este día
    dia.songIds.forEach(songId => {
      // Busca la canción completa en la librería usando su id
      const cancion = songLibrary.find(song => song.id === songId);

      // Crea un nuevo elemento div con clase song-card (tarjetita)
      const songCard = document.createElement("div");
      songCard.className = "song-card";

      // Si la canción existe en la librería
      if (cancion) {
        // Crea la estructura HTML de la tarjeta con nombre de canción, intensidad y segundos
        songCard.innerHTML = `
          <div class="song-title">${cancion.title} - ${cancion.artist}</div>
          <div class="song-details">
            <span class="song-intensity">Intensidad: ${cancion.intensity}</span>
            <span class="song-duration">Duration: ${cancion.durationSeconds}s</span>
          </div>
        `;
      } else {
        // Si la canción no está en la librería, solo muestra el id
        songCard.innerText = songId;
      }

      // Añade la tarjeta a el contenedor de canciones en el HTML
      listaCanciones.appendChild(songCard);
    });
  })
  // Si hay un error en la solicitud fetch
  .catch(error => {
    // Muestra el error en la consola del navegador
    console.error("Error al cargar el día:", error);
  });