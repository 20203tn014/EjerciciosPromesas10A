// Ejercicio 1: Promesas Encadenadas
console.log("Ejercicio 1");
function promesasEncadenadas() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const aleatorio = Math.floor(Math.random() * 100) + 1;
      console.log("Promesa 1 | Número aleatorio:", aleatorio);
      resolve(aleatorio);
    }, 2000);
  })
    .then((numero) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const cuadrado = Math.pow(numero, 2);
          console.log("Promesa 2 | Número al cuadrado:", cuadrado);
          resolve(cuadrado);
        }, 3000);
      });
    })
    .then((resultado) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const raiz = Math.sqrt(resultado);
          console.log("Promesa 3 | Raíz cuadrada:", raiz);
          resolve(raiz);
        }, 1000);
      });
    });
}
promesasEncadenadas();

// -------------------------------------------------------------------

// Ejercicio 2: Promesa de Múltiples Solicitudes
function multipleSolicitudes(urls) {
  const promesas = urls.map((url) =>
    fetch(url).then((response) => response.json())
  );
  return Promise.all(promesas);
}

const urls = [
  "https://swapi.dev/api/people/20",
  "https://swapi.dev/api/people/21",
  "https://swapi.dev/api/people/22",
];

setTimeout(() => {
  multipleSolicitudes(urls)
    .then((resultados) => {
      console.log("Ejercicio 2");
      console.log("Promesa de Múltiples Solicitudes:", resultados);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}, 7000);

// -------------------------------------------------------------------

// Ejercicio 3: Promesas Paralelas
function promesasParalelas(promesas) {
  return Promise.all(promesas);
}

const promesa1 = new Promise((resolve) => {
  setTimeout(() => resolve("Promesa 1"), 12000);
});

const promesa2 = new Promise((resolve) => {
  setTimeout(() => resolve("Promesa 2"), 12000);
});

const promesa3 = new Promise((resolve) => {
  setTimeout(() => resolve("Promesa 3"), 12000);
});

const arrayPromesas = [promesa1, promesa2, promesa3];

promesasParalelas(arrayPromesas)
  .then((resultados) => {
    console.log("Ejercicio 3");
    console.log("Promesas paralelas:", resultados);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// -------------------------------------------------------------------

// Ejercicio 4: Promesas en Cadena con Retraso
setTimeout(() => {
  console.log("Ejercicio 4");
  function promesasConRetraso(n) {
    return new Promise((resolve) => {
      let cadenaDePromesas = Promise.resolve();
      for (let i = 1; i <= n; i++) {
        cadenaDePromesas = cadenaDePromesas.then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              console.log(`Promesa con retraso ${i} resuelta.`);
              resolve(i);
            }, i * 1000);
          });
        });
      }
      cadenaDePromesas.then(() => {
        setTimeout(() => {
          resolve("Todas las promesas se resolvieron");
        }, n * 1000);
      });
    });
  }

  const n = 3;

  promesasConRetraso(n)
    .then((mensaje) => {
      console.log(mensaje);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}, 15000);

// -------------------------------------------------------------------

// Ejercicio 5: Promesa con Cancelación
setTimeout(() => {
  console.log("Ejercicio 5");
  function promesaCancelacion() {
    let cancelada = false;
    const promesa = new Promise((resolve, reject) => {
      const tiempoEspera = setTimeout(() => {
        if (!cancelada) {
          resolve("¡Promesa resuelta!");
        } else {
          reject("Promesa cancelada :(");
        }
      }, 5000);
    });

    function cancel() {
      cancelada = true;
    }

    return { promesa, cancel };
  }

  const { promesa, cancel } = promesaCancelacion();

  // Comentar la función cancel(); para resolver la promesa
  cancel();

  promesa
    .then((mensaje) => console.log(mensaje))
    .catch((error) => console.log(error));
}, 26000);
