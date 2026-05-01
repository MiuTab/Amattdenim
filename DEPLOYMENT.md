# Deployment en GitHub Pages

Este proyecto está configurado para ser desplegado automáticamente en GitHub Pages usando GitHub Actions.

## Configuración

### 1. Vite (`vite.config.ts`)
La base URL está configurada a `/Amattdenim/` para que funcionen correctamente los assets y rutas cuando se despliega en un repositorio de usuario.

### 2. GitHub Actions (`.github/workflows/deploy.yml`)
El workflow automático:
- Se ejecuta cada vez que haces push a la rama `main`
- También se ejecuta en pull requests para validar la compilación
- Instala las dependencias con npm
- Construye el proyecto
- Despliegue automático en GitHub Pages

## Scripts disponibles

```bash
npm run dev        # Inicia servidor de desarrollo
npm run build      # Construye el proyecto para producción
npm run preview    # Vista previa local del build de producción
```

## Pasos para activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Abre **Settings** → **Pages**
3. Bajo "Build and deployment":
   - En **Source**, selecciona **Deploy from a branch**
   - En **Branch**, selecciona **gh-pages** y **/root**
4. Guarda los cambios

El workflow automático creará la rama `gh-pages` cuando hagas el primer push.

## Verificación local de la compilación

Para verificar que la compilación funciona correctamente localmente:

```bash
npm run build
npm run preview
```

Esto construirá el proyecto y lo servirá en `http://localhost:4173` o similar, simulando el entorno de producción.

## URLs

- **Repositorio**: https://github.com/MiuTab/Amattdenim
- **Página en vivo**: https://miutab.github.io/Amattdenim/

## Notas importantes

- El workflow solo despliega cuando haces push a **main**
- Los PRs no se despliegan, pero se valida que la compilación funciona
- Todos los assets deben ser accesibles desde la ruta `/Amattdenim/`
