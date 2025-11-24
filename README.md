# Módulo 9 - AE2 ABP

## Quiz de Trivia — Cine Chileno v2

Proyecto interactivo de trivia temático sobre cine chileno. Desarrollado con HTML5, CSS3, Bootstrap 5, JavaScript y jQuery para demostrar buenas prácticas de desarrollo web frontend.

🔗 **[Ver demo en vivo](https://cristiandpto23.github.io/m2-eval-portafolio/)**

---

## 📋 Características

-   ✅ **Quiz interactivo**: 5 preguntas seleccionadas aleatoriamente de un banco de 11 preguntas
-   🎨 **Modo claro/oscuro**: Alternancia dinámica entre temas visuales
-   📊 **Barra de progreso**: Visualización clara del avance en el quiz
-   ♿ **Accesibilidad mejorada**: Atributos ARIA y roles para tecnologías de asistencia
-   📱 **Diseño responsivo**: Interfaz adaptable a diferentes tamaños de pantalla
-   🔄 **Retroalimentación inmediata**: Indicación visual de respuestas correctas e incorrectas
-   🏆 **Sistema de puntuación**: Contador de aciertos y resultados finales
-   🔁 **Opción de reinicio**: Posibilidad de volver a jugar con preguntas aleatorias

---

## 📁 Estructura del Proyecto

```
.
├── index.html        # Estructura HTML principal
├── style.css         # Estilos personalizados y tema oscuro
├── script.js         # Lógica del quiz y funcionalidades interactivas
└── README.md         # Documentación del proyecto
```

---

## 🚀 Tecnologías Utilizadas

-   **HTML5**: Estructura semántica del contenido
-   **CSS3**: Estilos personalizados y transiciones
-   **Bootstrap 5.3.2**: Framework CSS para diseño responsivo
-   **Bootstrap Icons**: Iconografía para el botón de tema
-   **jQuery 3.7.1**: Manipulación del DOM y manejo de eventos
-   **JavaScript ES6+**: Lógica de la aplicación con sintaxis moderna

---

## 💻 Cómo Usar

1. **Clonar o descargar** el repositorio
2. **Abrir** `index.html` en tu navegador web
3. **Hacer clic** en "Comenzar Quiz" para iniciar
4. **Seleccionar** una respuesta para cada pregunta
5. **Ver** tu puntaje final y reiniciar si deseas

---

## 🎯 Funcionalidades Técnicas

### Algoritmo de Mezcla

Implementa el **algoritmo Fisher-Yates** para seleccionar y mezclar preguntas de forma aleatoria, garantizando una distribución uniforme.

### Gestión de Estado

Utiliza variables de estado (`quizIniciado`, `preguntaActual`, `puntaje`) para controlar el flujo de la aplicación.

### Modularización

Código refactorizado con funciones auxiliares específicas:

-   `crearBarraProgreso()`: Genera HTML de la barra de progreso
-   `crearOpcionesHtml()`: Crea botones de opciones de respuesta
-   `aplicarModoOscuro()`: Gestiona el tema visual
-   `mostrarPregunta()`: Renderiza la pregunta actual
-   `mostrarResultado()`: Muestra la pantalla de resultados

### Accesibilidad

-   Atributos `role` y `aria-label` en elementos interactivos
-   Región `aria-live="polite"` para anuncios dinámicos
-   Navegación por teclado con `tabindex`

---

## 🎨 Modo Oscuro

El proyecto incluye un sistema de alternancia de tema que cambia dinámicamente:

-   Colores de fondo y texto
-   Iconos del botón (luna/sol)
-   Estilos de botones y contenedores

---

## 📝 Mejoras Implementadas

En la última refactorización se realizaron las siguientes mejoras:

1. **Constantes para valores repetidos**: Colores y textos de retroalimentación
2. **Funciones auxiliares modulares**: Mejor organización y reutilización de código
3. **Barra de progreso visual**: Indicador del avance en el quiz
4. **Atributos ARIA**: Mejora significativa en accesibilidad
5. **Código más limpio**: Reducción de duplicación y mayor legibilidad

---

## 🤝 Contribuciones

Este proyecto es parte de una evaluación académica. Las sugerencias y mejoras son bienvenidas.

---

## 📄 Licencia

Proyecto educativo de código abierto.

---

## ✍️ Autor

**Cristian Ahumada**  
Repositorio: [m2-eval-portafolio](https://github.com/cristiandpto23/m2-eval-portafolio)

---

**Fecha**: Noviembre 2025
