# Cinema Colombia - Frontend MVP

## Descripción General
Esta es la solución frontend para la Prueba Técnica Senior Full Stack. Se trata de una aplicación web moderna y responsive construida con **React** y **Vite**, diseñada para ofrecer una experiencia premium en la compra de entradas de cine.

## Arquitectura

### Frontend (React)
- **Framework:** React 18+ con TypeScript.
- **Build Tool:** Vite (para un desarrollo y bundling ultra rápido).
- **Estilos:** Vanilla CSS con un sistema de diseño basado en variables (Custom Properties) para garantizar coherencia visual y facilidad de mantenimiento. Se aplicaron principios de **Glassmorphism** y diseño premium.
- **Iconografía:** Lucide React.
- **Enrutamiento:** React Router DOM v6.

### Estructura del Proyecto
```text
src/
├── components/ # Componentes reutilizables (MovieCard, etc)
├── pages/      # Vistas principales (Home, Register, Purchase, Admin)
├── services/   # Capa de servicios para interactuar con la API (Mockeada)
├── types/      # Definiciones de TypeScript
├── styles/     # Variables globales y estilos base
└── App.tsx     # Configuración de rutas y layout general
```

## MER (Modelo Entidad-Relación)

A continuación se detalla la estructura lógica de datos utilizada para el backend simulado:

```mermaid
erDiagram
    PELICULA ||--o{ TICKET : tiene
    CLIENTE ||--o{ COMPRA : realiza
    COMPRA ||--|{ TICKET : contiene
    PELICULA {
        string id PK
        string titulo
        string genero
        int duracion
        string descripcion
        string imagen_url
        float calificacion
        string estado "ACTIVE | INACTIVE"
    }
    CLIENTE {
        string id PK
        string email
        string telefono
        string nombre
        string apellido
        string password_hash
    }
    COMPRA {
        string id PK
        string cliente_id FK
        datetime fecha_compra
        float total
        string estado "COMPLETED | PENDING"
    }
    TICKET {
        string id PK
        string compra_id FK
        string pelicula_id FK
        int cantidad
        float precio_unitario
    }
```

## Funcionalidades Desarrolladas

1.  **Administración de Películas (Admin Panel):**
    - Listado de películas con estadísticas rápidas.
    - Cambio de estado (Habilitar/Inhabilitar) películas.
    - Mock de creación y edición.
2.  **Registro de Clientes:**
    - Formulario con validaciones en tiempo real.
    - Manejo de estados de carga y éxito.
3.  **Compra de Entradas (Flow completo):**
    - Selección de película desde el catálogo.
    - Ajuste de cantidad de tickets con cálculo de precio dinámico.
    - Simulación de proceso de pago.
    - Confirmación de compra con resumen detallado.
4.  **Catálogo de Películas:**
    - Buscador funcional por título y género.
    - Diseño responsive adaptable a móviles y tablets.
    - Micro-animaciones y efectos hover premium.

## Decisiones Técnicas y Justificación

- **Uso de Vanilla CSS:** Se optó por no usar frameworks como Tailwind para demostrar control total sobre el diseño y las animaciones, permitiendo una estética más personalizada y "premium".
- **Mock Service Layer:** Se implementó una capa de servicios asíncronos (`movieService.ts`) que simula latencia de red, facilitando la integración futura con el backend de Spring Boot sin cambiar la lógica de los componentes.
- **Glassmorphism:** Se aplicó este estilo para dar una sensación de modernidad y profundidad, alineándose con las tendencias de diseño actuales en plataformas de streaming y cine.

## Instrucciones para Ejecución Local

1.  Asegúrate de tener **Node.js** instalado.
2.  Clona el repositorio.
3.  Instala las dependencias:
    ```bash
    npm install
    ```
4.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
5.  Abre `http://localhost:5173` en tu navegador.

## Posibles Mejoras Futuras
- Integración real con el backend de Spring Boot.
- Implementación de JWT para autenticación persistente.
- Selección de asientos interactiva mediante un mapa de la sala.
- Integración real con Pasarela de Pagos (Stripe/Epayco).
- Carga de imágenes real a AWS S3 desde el panel admin.
