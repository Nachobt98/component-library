# Component Library Dashboard

Dashboard interactivo en React para explorar la dirección visual inicial de una futura librería de componentes customizables.

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Qué incluye

- Selector de paletas estratégicas.
- Controles de densidad y radio visual.
- Preview dinámico de componentes.
- Mapa filtrable de propuestas de componentes.
- Componentes diferenciales como Command Palette, Stat Orb, Bento Feature Grid y Color Harmony Studio.
- Tokens visuales base para color, spacing, radius, tipografía y motion.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La app se abrirá normalmente en:

```txt
http://localhost:5173
```

## Build

```bash
npm run build
```

## Preview de producción

```bash
npm run preview
```

## Objetivo del proyecto

Esta primera versión no pretende ser todavía la librería final, sino un concept dashboard para decidir:

- Qué estética base merece la pena seguir.
- Qué tokens deben formalizarse primero.
- Qué componentes estándar son prioritarios.
- Qué componentes especiales pueden diferenciar la librería sin convertirla en un carnaval visual.

## Próximos pasos recomendados

1. Separar el dashboard de los componentes base.
2. Crear una carpeta `src/components` con componentes reutilizables reales.
3. Añadir TypeScript.
4. Añadir Storybook.
5. Definir design tokens en CSS variables.
6. Añadir tests de accesibilidad y comportamiento.
