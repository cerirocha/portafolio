# César Rocha · Portafolio

Sitio personal estático (HTML, CSS y JavaScript, sin dependencias) publicado en Vercel.

El inicio cambia según quién visita: **Reclutador**, **Cliente** o **Desarrollador**. La elección se guarda en el navegador y se refleja en la URL, así que puedes compartir un enlace directo a cada versión:

- https://cesar-rocha.vercel.app/?para=reclutador
- https://cesar-rocha.vercel.app/?para=cliente
- https://cesar-rocha.vercel.app/?para=dev

## Estructura

```
public/
  index.html    Estructura y textos fijos (proyectos, contacto)
  styles.css    Estilos (colores y tipografía en las variables de :root)
  script.js     Textos de cada tipo de visitante, copiar correo y acordeón
  404.html      Página de error
  favicon.svg
  img/          Fotos (retrato y laguna) e imagen para compartir (og.jpg)
vercel.json     Le dice a Vercel que publique la carpeta public/
```

## Editar contenido

- **Textos por tipo de visitante:** objeto `AUDIENCIAS` en `public/script.js`. El HTML trae la versión de reclutador para quien navega sin JavaScript. Si cambias esos textos, cámbialos también en `index.html`.
- **Proyectos:** cada `<details class="proyecto">` en `public/index.html`.
- **CV:** está en `public/cv.pdf` y se descarga desde el botón de reclutador y desde Contacto. Para actualizarlo, reemplaza ese archivo con el mismo nombre.
- **Capturas de proyectos:** guarda la imagen en `public/img/` y agrégala dentro de la `.proyecto-vista` correspondiente:

  ```html
  <div class="proyecto-vista">
    <img src="img/portalnexo.webp" alt="Pantalla principal de PortalNexo" />
  </div>
  ```

## Ver en local

Abre `public/index.html` en el navegador, o sirve la carpeta:

```bash
npx serve public
```

## Publicar en Vercel

**Opción A: desde GitHub (recomendada, se publica solo con cada cambio)**

1. Sube este proyecto a un repositorio de GitHub.
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio.
3. Deja la configuración como está (Framework: *Other*) y presiona **Deploy**. `vercel.json` ya indica la carpeta `public/`.

**Opción B: desde la terminal**

```bash
npx vercel          # primera vez: inicia sesión y crea el proyecto (vista previa)
npx vercel --prod   # publica en producción
```

La carpeta `ppt/` no forma parte del sitio: está excluida en `.gitignore` y `.vercelignore`.
