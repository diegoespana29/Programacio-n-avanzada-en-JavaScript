
async function obtenerAnimales() {
    try {
      const respuesta = await fetch('../animales.json'); 
      const datos = await respuesta.json();
      console.log("Datos cargados desde JSON:", datos);
      return datos.animales;
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
    }
  }
  
  class Animal {
    constructor(nombre, edad, comentarios, imagen, sonido) {
      this.nombre = nombre;
      this.edad = edad;
      this.comentarios = comentarios;
      this.imagen = imagen;
      this.sonido = sonido;
    }
  
    reproducirSonido() {
      const player = document.getElementById("player");
      player.src = `assets/sounds/${this.sonido}`;
      player.play();
    }
  }
  
 
  async function agregarAnimal() {
    const animalSeleccionado = document.getElementById("animal").value;
    const edadSeleccionada = document.getElementById("edad").value;
    const comentarios = document.getElementById("comentarios").value;
  
    if (!animalSeleccionado || !edadSeleccionada || !comentarios) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    const animales = await obtenerAnimales();
  
    const animalEncontrado = animales.find(animal => animal.name === animalSeleccionado);
  
    if (animalEncontrado) {
      const nuevoAnimal = new Animal(
        animalEncontrado.name,
        edadSeleccionada,
        comentarios,
        `assets/imgs/${animalEncontrado.imagen}`,
        animalEncontrado.sonido
      );
  
      // Crear elemento HTML
      const animalDiv = document.createElement("div");
      animalDiv.classList.add("card", "m-2", "text-white", "bg-secondary");
      animalDiv.style.width = "150px";
      animalDiv.innerHTML = `
        <img src="${nuevoAnimal.imagen}" class="card-img-top" alt="${nuevoAnimal.nombre}">
        <div class="card-body">
          <h5 class="card-title">${nuevoAnimal.nombre}</h5>
          <p class="card-text">${nuevoAnimal.edad}</p>
          <button class="btn btn-primary btn-sonido">Reproducir sonido</button>
        </div>
      `;
  
      // Agregar evento para reproducir sonido
      animalDiv.querySelector(".btn-sonido").addEventListener("click", () => {
        nuevoAnimal.reproducirSonido();
      });
  
      document.getElementById("Animales").appendChild(animalDiv);
  
      // Limpiar campos de entrada
      document.getElementById("animal").value = "";
      document.getElementById("edad").value = "";
      document.getElementById("comentarios").value = "";
    }
  }
  
  // Evento para el botón "Agregar"
  document.getElementById("btnRegistrar").addEventListener("click", agregarAnimal);
  