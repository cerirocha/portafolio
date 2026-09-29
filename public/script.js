(() => {
  const CORREO = "cesar.r.rocharobledo@gmail.com";

  const ENLACES = {
    correo: `mailto:${CORREO}`,
    linkedin: "https://www.linkedin.com/in/cesar-ricardo-rocha-robledo-bb0331345",
    github: "https://github.com/cerirocha",
    portalnexo: "https://github.com/cerirocha/portalnexo",
    // Ruta a tu CV dentro de public/. Vacío = el botón de reclutador muestra "Escríbeme".
    cv: "cv.pdf",
  };

  // Nombre con el que se guarda el CV al descargarlo.
  const NOMBRE_CV = "CV - César Ricardo Rocha Robledo.pdf";

  // Lo que cambia según quién visita. Cada `items` es una lista de [título, descripción].
  const AUDIENCIAS = {
    reclutador: {
      titulo: "Desarrollador full stack en Altamira, hoy en PBXHosting.",
      lead: "Ingeniero en Electrónica y Automatización. Diseño plataformas web SaaS para empresas: backend en Python con FastAPI, frontend en Vue 3 con TypeScript e integraciones con WhatsApp Business y Stripe.",
      cta1: ENLACES.cv
        ? { texto: "Descargar CV", href: ENLACES.cv, descarga: NOMBRE_CV }
        : { texto: "Escríbeme", href: ENLACES.correo },
      cta2: { texto: "LinkedIn ↗", href: ENLACES.linkedin },
      panel: "Para reclutadores",
      items: [
        ["Experiencia", "Technology Lead en Digital Boost Factory (nuevo) · Full Stack en PBXHosting · antes Alphagary (Orbia) · Freelance desde 2023"],
        ["Formación", "Ingeniería en Electrónica y Automatización, Universidad Politécnica de Altamira"],
        ["Idiomas", "Español nativo · Inglés avanzado (B2) · Francés intermedio (B1)"],
      ],
      contacto: "¿Tienes una vacante?",
    },
    cliente: {
      titulo: "Construyo la aplicación que tu negocio necesita.",
      lead: "Freelance desde 2023: aplicaciones web y móviles, APIs y dashboards a medida. Entiendo el problema antes de escribir código y entrego soluciones que siguen funcionando meses después.",
      cta1: { texto: "Cuéntame tu proyecto", href: ENLACES.correo },
      cta2: { texto: "Ver proyectos", href: "#proyectos" },
      panel: "Para clientes",
      items: [
        ["Aplicaciones web y móviles", "Flutter, Django, Flask o Next.js, según lo que necesite tu proyecto."],
        ["APIs y dashboards", "Servicios en Python y dashboards para ver tus métricas en tiempo real."],
        ["Automatización e IA", "Visión por computadora, machine learning y flujos automatizados."],
      ],
      contacto: "¿Tienes un proyecto?",
    },
    dev: {
      titulo: "Código legible que aguanta el paso del tiempo.",
      lead: "Python con FastAPI, Django o Flask en el backend; Vue 3, React y Next.js con TypeScript en el frontend; MariaDB, Firebase y Docker para datos y despliegue.",
      cta1: { texto: "GitHub ↗", href: ENLACES.github },
      cta2: { texto: "PortalNexo ↗", href: ENLACES.portalnexo },
      panel: "Para desarrolladores",
      items: [
        ["Hoy", "SaaS multi-tenant con FastAPI, JWT + 2FA, y Vue 3 con Pinia"],
        ["También", "Visión computacional y ML con OpenCV, PyTorch y TensorFlow"],
        ["Código abierto", "PortalNexo y más en @cerirocha"],
      ],
      contacto: "¿Quieres colaborar?",
    },
  };

  const DEFECTO = "reclutador";
  const CLAVE = "audiencia";
  const PARAMETRO = "para";

  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
  const campo = (nombre) => document.querySelector(`[data-campo="${nombre}"]`);
  const botones = document.querySelectorAll("[data-audiencia]");
  const cuerpo = document.querySelector(".inicio-cuerpo");
  const tituloContacto = campo("contacto");

  function leerGuardada() {
    try {
      return localStorage.getItem(CLAVE);
    } catch {
      return null;
    }
  }

  function guardar(id) {
    try {
      localStorage.setItem(CLAVE, id);
    } catch {
      // Sin almacenamiento (modo privado, bloqueado): la elección solo dura esta visita.
    }
  }

  function ponerEnlace(elemento, { texto, href, descarga }) {
    elemento.textContent = texto;
    elemento.href = href;
    if (descarga) {
      elemento.setAttribute("download", descarga);
    } else {
      elemento.removeAttribute("download");
    }
  }

  function pintar(id) {
    const a = AUDIENCIAS[id];
    campo("titulo").textContent = a.titulo;
    campo("lead").textContent = a.lead;
    ponerEnlace(campo("cta1"), a.cta1);
    ponerEnlace(campo("cta2"), a.cta2);
    campo("panel").textContent = a.panel;
    campo("items").replaceChildren(
      ...a.items.map(([titulo, descripcion]) => {
        const fila = document.createElement("div");
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = titulo;
        dd.textContent = descripcion;
        fila.append(dt, dd);
        return fila;
      }),
    );
    tituloContacto.textContent = a.contacto;
    botones.forEach((boton) => {
      boton.setAttribute("aria-pressed", String(boton.dataset.audiencia === id));
    });
  }

  function elegir(id) {
    if (!AUDIENCIAS[id]) return;
    guardar(id);

    // Deja la elección en la URL para poder compartir el enlace (por ejemplo ?para=cliente).
    const url = new URL(window.location.href);
    url.searchParams.set(PARAMETRO, id);
    history.replaceState(null, "", url);

    if (reducirMovimiento.matches) {
      pintar(id);
      return;
    }
    cuerpo.classList.add("cambiando");
    tituloContacto.classList.add("cambiando");
    setTimeout(() => {
      pintar(id);
      cuerpo.classList.remove("cambiando");
      tituloContacto.classList.remove("cambiando");
    }, 180);
  }

  const desdeUrl = new URLSearchParams(window.location.search).get(PARAMETRO);
  const inicial = [desdeUrl, leerGuardada()].find((id) => id && AUDIENCIAS[id]) || DEFECTO;
  pintar(inicial);

  botones.forEach((boton) => {
    boton.addEventListener("click", () => elegir(boton.dataset.audiencia));
  });

  // Acordeón de proyectos: <details name="proyectos"> ya deja uno abierto a la vez en
  // navegadores recientes; esto hace lo mismo en los que todavía no lo soportan.
  const proyectos = document.querySelectorAll("details.proyecto");
  proyectos.forEach((detalle) => {
    detalle.addEventListener("toggle", () => {
      if (!detalle.open) return;
      proyectos.forEach((otro) => {
        if (otro !== detalle) otro.open = false;
      });
    });
  });

  // Copiar correo
  const botonCopiar = document.querySelector("[data-copiar]");
  const aviso = document.querySelector("[data-aviso]");
  let temporizador;

  async function copiarTexto(texto) {
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch {
      const area = document.createElement("textarea");
      area.value = texto;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      let copiado = false;
      try {
        copiado = document.execCommand("copy");
      } catch {
        copiado = false;
      }
      area.remove();
      return copiado;
    }
  }

  if (botonCopiar) {
    botonCopiar.hidden = false;
    botonCopiar.addEventListener("click", async () => {
      const copiado = await copiarTexto(botonCopiar.dataset.copiar);
      botonCopiar.textContent = copiado ? "¡Copiado!" : "No se pudo";
      aviso.textContent = copiado ? "Correo copiado al portapapeles." : "No se pudo copiar el correo.";
      clearTimeout(temporizador);
      temporizador = setTimeout(() => {
        botonCopiar.textContent = "Copiar";
        aviso.textContent = "";
      }, 1800);
    });
  }

  const anio = document.querySelector("[data-anio]");
  if (anio) anio.textContent = String(new Date().getFullYear());
})();
