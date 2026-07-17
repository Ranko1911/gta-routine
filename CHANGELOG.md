# 📝 Registro de Cambios (Changelog) - Nueva Actualización

Este documento detalla los cambios recientes realizados en el **GTA V Elite Protocol Tracker** para organizar la estructura del proyecto, unificar el diseño visual e implementar componentes reutilizables.

---

## 📁 1. Reorganización de la Estructura del Proyecto
Para mejorar la mantenibilidad y limpieza del directorio raíz, los archivos se reestructuraron en carpetas dedicadas:

*   **Páginas Secundarias (`/pages`)**: Se trasladaron todas las subpáginas HTML desde la raíz a esta carpeta:
    *   `catalog.html` ➡️ `pages/catalog.html`
    *   `group_routine.html` ➡️ `pages/group_routine.html`
    *   `quality_of_life.html` ➡️ `pages/quality_of_life.html`
    *   `requirements.html` ➡️ `pages/requirements.html`
    *   `retirement.html` ➡️ `pages/retirement.html`
    *   `weekly_routine.html` ➡️ `pages/weekly_routine.html`
*   **Recursos Estáticos (`/assets`)**:
    *   **Estilos**: `style.css` ➡️ `assets/css/style.css`
    *   **JavaScript**: `script.js` ➡️ `assets/js/script.js`
*   **Documentación (`/docs`)**: Se organizaron los archivos de texto y guías en Markdown (`GTA Routine.md`, `GTA Routine Group.md`, etc.).
*   **Scripts de Automatización (`/scripts`)**: El archivo de despliegue `deploy.bat` se movió a `scripts/deploy.bat`.

---

## 🧩 2. Cabecera y Navegación Unificada (Web Components)
Se implementó un componente web personalizado (`<elite-header>`) en [components.js](file:///d:/repo-vault/Break/GTAV/assets/js/components.js) para centralizar la barra superior y la navegación de todas las páginas:

*   **Detección Dinámica de Rutas**: Ajusta automáticamente las referencias de los enlaces (usando `../` en subpáginas dentro de `/pages` y rutas directas para `index.html` en la raíz).
*   **Configuración por Página**: Cada vista define un atributo `active` (ej. `active="weekly"`) para que el componente adapte dinámicamente:
    *   **Etiqueta de Estadísticas**: Muestra el contexto de ganancia correspondiente (ej. *SESIÓN*, *GRUPO*, *SEMANAL*, *RETIRO* o *GUÍA*).
    *   **Botón de Reinicio**: Genera el ID de botón adecuado (ej. `reset-btn-weekly`, `reset-btn-catalog`) para enlazarse con los scripts específicos de reinicio de cada vista.
*   **Navegación Unificada en Español**: Enlaces consistentes a todas las secciones: *Solo, Grupo, Semanal, Retiro, Guía, Catálogo y QoL*.

---

## 🎨 3. Rediseño del Tema y Estilos Visuales
Se redefinió el archivo [style.css](file:///d:/repo-vault/Break/GTAV/assets/css/style.css) con un sistema de diseño pulido:

*   **Paleta y Neón**: Ajustes de colores basados en variables de CSS para temas oscuros con glassmorphism y detalles de neón (verde y rojo de acento).
*   **Área del Logo**: Nueva estructura visual para la marca `ELITE PROTOCOL` utilizando clases reutilizables (`.logo-area`, `.logo-text`, `.accent`, `.version-tag`) en lugar de estilos embebidos (inline).
*   **Controles y Contenedores**: Ajustes de espaciados (`gap`), márgenes y bordes en `.top-bar` y `.global-stats`.

---

## 📱 4. Optimización de Responsividad (Diseño Móvil)
Se mejoró significativamente el comportamiento del sitio en dispositivos móviles y pantallas estrechas:

*   **Menú de Navegación Scrollable**: El menú principal ahora tiene `overflow-x: auto` con scroll táctil suave en móviles, permitiendo deslizar las pestañas de navegación si la pantalla es muy estrecha sin romper el diseño.
*   **Ocultamiento de Texto en Tablets**: En resoluciones menores a **900px**, los textos de los enlaces de navegación se ocultan automáticamente, dejando visibles únicamente los iconos para ahorrar espacio.
*   **Ocultamiento del Logo en Móviles**: En resoluciones menores a **768px**, el área del logo superior se oculta por completo para dejar espacio libre a los contadores de ganancias y al menú principal.

---

## 🔧 5. Automatización y Referencias
*   **Scripts**: El script `deploy.bat` se configuró para facilitar el proceso de despliegue y mantenimiento de los cambios del proyecto.
*   **Actualización de Rutas HTML**: Todas las páginas se modificaron para hacer referencia a las nuevas ubicaciones de los archivos JS, CSS e iconos en la estructura reorganizada.

---

## 🔄 6. Estrategia y Alertas del Meta de Rotación de Golpes
Se incorporaron advertencias y guías tácticas para adaptarse al comportamiento actual de GTA Online, donde se premia la rotación de actividades y se penaliza la repetición del mismo golpe en intervalos cortos:

*   **Rediseño de la Interfaz del Solo Tracker ([index.html](file:///d:/repo-vault/Break/GTAV/index.html))**:
    *   **Bucle de Rotación Unificado**: Se eliminó la sección de *Alternativas* (Fase 4) y se unificó junto a la anterior Fase 2 en una sola tarjeta llamada **FASE 2: BUCLE DE ROTACIÓN**.
    *   **Golpes en Rotación**: Se agruparon de manera equitativa **Cayo Perico (Rotado)**, **Contrato Dr. Dre**, **Cluckin' Bell Raid** y **Union Depository**, dotándolos a todos de contadores de repetición individuales para facilitar el rastreo multitarea.
    *   **Temporizadores de Cooldown Integrados**: Se agregó un temporizador nativo para el cooldown de Cayo Perico Solo (144 minutos / 2h 24m) junto a los temporizadores existentes de Dr. Dre y Cluckin' Bell.
*   **Actualización de Valores Financieros**:
    *   **Venta de Lab. Ácido**: Se incrementó el valor asignado de `$335k` a `$500k` para reflejar el beneficio real al vender en lobby público con el bono de alta demanda (+50%), alineándolo con las guías estratégicas.
*   **Nuevas Actividades Integradas (Meta 2026)**:
    *   **Trabajo de Vigilante (Vincent - LSPD)**: Se integró el "Trabajo de Vigilante" de Vincent en [index.html](file:///d:/repo-vault/Break/GTAV/index.html) con un valor de `$25,000` y un temporizador dinámico de cooldown de **1 minuto** (`timer-vincent_dispatch`), reflejando la adición más reciente del meta para rellenar tiempos muertos desde vehículos policiales propios.
*   **Advertencias Visuales (Alertas en la UI)**:
    *   Se diseñaron las clases `.alert-box` y `.alert-box.warning` en [style.css](file:///d:/repo-vault/Break/GTAV/assets/css/style.css) con estilos integrados en la estética *glassmorphism* del tracker.
    *   **Solo Tracker**: Se integró el cuadro de alerta de rotación arriba de la lista de golpes en la Fase 2.
    *   **Squad Tracker ([group_routine.html](file:///d:/repo-vault/Break/GTAV/pages/group_routine.html))**: Se incorporó una advertencia en la Fase 2 aconsejando alternar hosts (para eludir el cooldown de 2.4h) y variar entre Cayo Perico y Diamond Casino para evitar penalizaciones.
*   **Actualización de Guías Estratégicas y Tutoriales (`/docs` y `/pages`)**:
    *   **[GTA Routine.md](file:///d:/repo-vault/Break/GTAV/docs/GTA Routine.md) y [GTA_routine_2.md](file:///d:/repo-vault/Break/GTAV/docs/GTA_routine_2.md)**: Explicación detallada del nerf por repetición y estructuración paso a paso de la rotación en solitario (Cayo ➡️ Cluckin' Bell ➡️ Dr. Dre ➡️ Union Depository) e inclusión de los trabajos de Vincent.
    *   **[GTA Routine Group.md](file:///d:/repo-vault/Break/GTAV/docs/GTA Routine Group.md)**: Detalle del beneficio de rotación de líderes en escuadrón y alternancia de golpes (Cayo ➡️ Casino ➡️ Cayo).
    *   **[GTA_Requirements_Tutorial.md](file:///d:/repo-vault/Break/GTAV/docs/GTA_Requirements_Tutorial.md) y [requirements.html](file:///d:/repo-vault/Break/GTAV/pages/requirements.html)**: Incorporación del requisito del **Vehículo de Policía (Patrulla)** en Warstock (Stanier LE Cruiser / Interceptor) necesario para el Trabajo de Vigilante.
    *   **[catalog.html](file:///d:/repo-vault/Break/GTAV/pages/catalog.html)**: Añadidos los vehículos policiales (Stanier LE Cruiser por `$3.5M+` y Gauntlet Interceptor por `$4.0M+`) al catálogo de Warstock con sus respectivas mejoras de rendimiento.
    *   **[quality_of_life.html](file:///d:/repo-vault/Break/GTAV/pages/quality_of_life.html)**: 
        *   Reemplazado el truco obsoleto/parchado de AFK con cámaras por el método funcional de la pista de pruebas de **LS Car Meet**.
        *   Añadido **Vincent (LSPD)** a la sección de contactos de utilidad telefónica para iniciar de forma remota el Trabajo de Vigilante.
    *   **[README.md](file:///d:/repo-vault/Break/GTAV/README.md)**: Actualización de la descripción de características reflejando la metodología de rotación.
*   **Separación de Temporizadores (QoL)**:
    *   **[index.html](file:///d:/repo-vault/Break/GTAV/index.html)**: Se eliminaron los cooldowns individuales e inline de las Fases 2 y 3, agrupándolos a todos en un único panel unificado llamado **CONTROL DE COOLDOWNS** en la tercera columna para facilitar el seguimiento simultáneo de todos los enfriamientos del juego (tanto de golpes principales como de actividades secundarias).


