const menu = document.getElementById("menu");
const indicador = document.getElementById("indicador");
const secciones = document.querySelectorAll(".seccion");
//  console.log(secciones)

let tamañoIndicador = menu.querySelector("a").offsetWidth;
indicador.style.width = tamañoIndicador + "px";
//    console.log(tamañoIndicador) 263

let indexSeccionActiva;

//Observer

const observer = new IntersectionObserver(
  (entradas, observer) => {
    // console.log(entradas)

    entradas.forEach((entrada) => {
      // console.log(entrada)
      //   console.log(entrada.target)
      if (entrada.isIntersecting) {
        // Obtenemos cual es la seccion que esta entrando en pantalla.
        // console.log(`La entrada ${entrada.target.id} esta intersectando`);

        // Creamos un arreglo con las secciones y luego obtenemos el index de la seccion que esta en pantalla.

        indexSeccionActiva = [...secciones].indexOf(entrada.target);

        indicador.style.transform = `translateX(${
          tamañoIndicador * indexSeccionActiva
        }px)`;
        //  console.log( indexSeccionActiva)
      }
    });
  },
  {
    rootMargin: "-80px 0px 0px 0px",
    threshold: 0.2,
  }
);

// Agregamos un observador para el hero.

observer.observe(document.getElementById("hero"));


// Asignamos un observador a cada una de las secciones

secciones.forEach((seccion) => observer.observe(seccion));

// Evento para cuando la pantalla cambie de tamaño.
const onResize = () => {
  // Calculamos el nuevo tamaño que deberia tener el indicador.
  tamañoIndicador = menu.querySelector("a").offsetWidth;
  // Cambiamos el tamaño del indicador.
  indicador.style.width = `${tamañoIndicador}px`;
  // Volvemos a posicionar el indicador.

  indicador.style.transform = `translateX(${
    tamañoIndicador * indexSeccionActiva
  }px)`;
};

window.addEventListener("resize", onResize);
