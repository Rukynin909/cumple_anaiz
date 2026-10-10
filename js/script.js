// =========================================================
// script.js
// Lógica de la página de cumpleaños:
//  1) Fondo flotante de corazones/estrellas
//  2) Lightbox para ampliar fotos de la galería
//  3) Mini interacción del regalo sorpresa
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  crearFondoFlotante();
  activarLightbox();
  activarRegaloSorpresa();
});

/* ---------------------------------------------------------
   1) Fondo flotante
   Genera emojis (corazones/estrellas) que suben desde abajo
--------------------------------------------------------- */
function crearFondoFlotante() {
  const contenedor = document.getElementById('fondo-flotante');
  if (!contenedor) return;

  const imagenes = ['img/sushi1.png', 'img/empanada.png', 'img/takoyaki.png', 'img/nocilla.png'];
  const cantidad = 22;

  for (let i = 0; i < cantidad; i++) {
    const particula = document.createElement('img');
    particula.className = 'particula-flotante';
    particula.src = imagenes[Math.floor(Math.random() * imagenes.length)];

    const izquierda = Math.random() * 100; // posición horizontal en %
    const duracion = 8 + Math.random() * 10; // entre 8 y 18 segundos
    const retraso = Math.random() * 12; // desfase para que no salgan todas a la vez
    const tamano = 1 + Math.random() * 1.2; // entre 1rem y 2.2rem

    particula.style.left = izquierda + '%';
    particula.style.fontSize = tamano + 'rem';
    particula.style.animationDuration = duracion + 's';
    particula.style.animationDelay = -retraso + 's';

    contenedor.appendChild(particula);
  }
}

/* ---------------------------------------------------------
   2) Lightbox de la galería
   Al pulsar una foto se muestra en grande sobre un fondo oscuro
--------------------------------------------------------- */
function activarLightbox() {
  const galeria = document.getElementById('galeria-fotos');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const botonCerrar = document.getElementById('lightbox-cerrar');

  if (!galeria || !lightbox || !lightboxImg || !botonCerrar) return;

  galeria.addEventListener('click', (evento) => {
    const tarjeta = evento.target.closest('.foto-tarjeta');
    if (!tarjeta) return;

    const img = tarjeta.querySelector('img');
    if (!img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('activo');
  });

  const cerrarLightbox = () => {
    lightbox.classList.remove('activo');
    lightboxImg.src = '';
  };

  botonCerrar.addEventListener('click', cerrarLightbox);

  // Cerrar al pulsar fuera de la imagen
  lightbox.addEventListener('click', (evento) => {
    if (evento.target === lightbox) cerrarLightbox();
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') cerrarLightbox();
  });
}

/* ---------------------------------------------------------
   3) Regalo sorpresa
   Al pulsar la caja se revela un mensaje final
--------------------------------------------------------- */
function activarRegaloSorpresa() {
  const caja = document.getElementById('caja-regalo');
  const emoji = document.getElementById('regalo-emoji');
  const texto = document.getElementById('regalo-texto');

  if (!caja || !emoji || !texto) return;

  // Personaliza aquí el mensaje sorpresa final
  const mensajeSorpresa = 'Ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh';

  let abierto = false;

  caja.addEventListener('click', () => {
    abierto = !abierto;
    caja.classList.toggle('abierto', abierto);

    if (abierto) {
      emoji.src = 'img/sylveon.png';
      texto.textContent = mensajeSorpresa;
    } else {
      emoji.src= 'img/regalo.png';
      texto.textContent = 'Pulsa el regalo…';
    }
  });
}
