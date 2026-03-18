const contenedor = document.getElementById("lista");

fetch("canciones.json")
  .then(response => response.json())
  .then(datos => {
    const days = datos.days;

    days.forEach((dia, index) => {

  const card = document.createElement("div");
  card.classList.add("card");

  const completados = JSON.parse(localStorage.getItem("diasCompletados")) || [];

  if (completados.includes(index.toString())) {
    card.classList.add("completed");
  }

  card.innerHTML = `
    <a href="days.html?id=${index}">
      <h2>Día ${dia.day}</h2>
      <p>${dia.theme}</p>
    </a>
  `;

  contenedor.appendChild(card);
});
  })
  .catch(error => {
    console.error("Error al cargar el JSON:", error);
    contenedor.innerHTML = "<p>No se pudieron cargar las tarjetas.</p>";
  });



  