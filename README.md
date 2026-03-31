# Dawa-Proyecto - Sistema de Gestión de Servicios Profesionales

Plataforma integral de servicios profesionales que conecta clientes con profesionales calificados en diversos oficios. Sistema desarrollado con Angular 17+ para la gestión completa de categorías, profesionales, clientes, servicios y reseñas.

## 📋 Tabla de Contenidos

- [Características Principales](#características-principales)
- [Especificaciones Técnicas](#especificaciones-técnicas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Entidades y Modelos](#entidades-y-modelos)
- [Funcionalidades](#funcionalidades)
- [Instalación y Configuración](#instalación-y-configuración)
- [Rutas de la Aplicación](#rutas-de-la-aplicación)
- [Componentes](#componentes)
- [Servicios](#servicios)

## ✨ Características Principales

### 1. **Gestión de Categorías de Servicios**
- Crear, leer, actualizar y eliminar categorías
- Descripción detallada de cada categoría
- Estado (Activa/Inactiva)
- Categorías predefinidas:
  - Gasfitería
  - Electricidad
  - Albañilería
  - Limpieza
  - Pintura
  - Cerrajería
  - Jardinería
  - Técnico en Refrigeración

### 2. **Gestión de Profesionales**
- Registro completo de profesionales
- Perfil con foto, contacto y ubicación
- Validación de experiencia
- Estado de disponibilidad (Disponible/No disponible)
- Asignación a categorías específicas
- Búsqueda y filtrado por ciudad, categoría y disponibilidad

### 3. **Gestión de Clientes**
- Registro de clientes
- Información personal completa (nombre, teléfono, email, ciudad)
- Dirección y cédula
- Foto de perfil
- Control de estado
- Historial de registros

### 4. **Gestión de Servicios**
- Creación y seguimiento de servicios solicitados
- Vinculación entre clientes y profesionales
- Descripción detallada de servicios
- Control de estado de servicios

### 5. **Sistema de Reseñas**
- Calificación de profesionales
- Retroalimentación de clientes
- Historial de reseñas por profesional

### 6. **Búsqueda y Filtrado**
- Búsqueda de profesionales por nombre, ciudad o categoría
- Filtros avanzados
- Vista pública de profesionales

## 🔧 Especificaciones Técnicas

### Stack Tecnológico
- **Framework**: Angular 17+
- **Lenguaje**: TypeScript
- **Arquitectura**: Standalone Components
- **Gestión de Rutas**: Angular Router
- **Comunicación HTTP**: HttpClient
- **Estilos**: CSS puro
- **Datos**: JSON local (datos.json)

### Dependencias Principales
- Angular Core
- Angular Router
- Angular Common HTTP
- Angular Forms (implícito)

### Configuración de la Aplicación
```typescript
// app.config.ts
- Browser Global Error Listeners
- Zone Change Detection (eventCoalescing)
- Router Provider
- HttpClient Provider
```

## 📁 Estructura del Proyecto

```
Serv_Oficios/
├── public/
│   └── json/
│       └── datos.json           # Base de datos JSON con categorías y profesionales
├── src/
│   ├── index.html              # Archivo HTML principal
│   ├── main.ts                 # Punto de entrada de la aplicación
│   ├── styles.css              # Estilos globales
│   └── app/
│       ├── app.config.ts       # Configuración de la aplicación
│       ├── app.routes.ts       # Definición de rutas
│       ├── app.ts              # Componente raíz
│       ├── app.css             # Estilos del componente app
│       ├── app.html            # Template del componente app
│       ├── components/
│       │   ├── categorias/
│       │   │   └── crud-categorias/
│       │   ├── clientes/
│       │   │   └── crud-clientes/
│       │   ├── home/
│       │   │   └── inicio/
│       │   ├── profesionales/
│       │   │   ├── crud-profesionales/
│       │   │   └── vista/
│       │   ├── resenas/
│       │   │   └── crud-resena/
│       │   ├── servicios/
│       │   │   └── crud-servicios/
│       │   └── shared/
│       │       ├── cards/
│       │       └── search/
│       ├── models/
│       │   ├── categorias.ts
│       │   ├── clientes.ts
│       │   ├── profesionales.ts
│       │   ├── resenas.ts
│       │   └── servicios.ts
│       ├── services/
│       │   ├── serv-categoria.ts
│       │   ├── serv-clientes.ts
│       │   ├── serv-profesionales.ts
│       │   ├── serv-resenas.ts
│       │   └── serv-servicios.ts
│       ├── pipes/
│       │   └── filtros.ts
│       ├── validators/
│       │   └── Validators.ts
│       └── shared/
│           ├── cards/
│           └── search/
```

## 📊 Entidades y Modelos

### Clientes
```typescript
interface Clientes {
  id?: number;
  nombreCompleto: string;
  numero: string;              // Teléfono
  correo: string;
  ciudad: string;
  direccion?: string;
  cedula?: string;
  foto?: string;
  tipoCliente?: string;
  estado: string;              // Activo/Inactivo
  fechaRegistro?: string;
}
```

### Categorías
```json
{
  "nombre": "string",
  "descripcion": "string",
  "estado": "Activa|Inactiva",
  "id": "string"
}
```

### Profesionales
```json
{
  "foto": "URL",
  "nombreCompleto": "string",
  "numero": "string",
  "correo": "string",
  "categoria": "id_categoria",
  "ciudad": "string",
  "experiencia": "string",
  "estado": "Disponible|No disponible",
  "id": "string"
}
```

## ⚙️ Funcionalidades

### 1. **CRUD de Categorías**
- Crear nuevas categorías de servicios
- Listar todas las categorías
- Editar información de categorías
- Eliminar categorías
- Cambiar estado (Activa/Inactiva)

### 2. **CRUD de Profesionales**
- Registrar profesionales con foto y datos completos
- Listar profesionales con filtros
- Editar perfil de profesionales
- Eliminar registros
- Cambiar estado de disponibilidad

### 3. **CRUD de Clientes**
- Registrar nuevos clientes
- Visualizar lista de clientes
- Editar datos de clientes
- Eliminar clientes
- Filtrar y buscar clientes

### 4. **CRUD de Servicios**
- Crear solicitudes de servicio
- Asignar profesionales a servicios
- Seguimiento del estado
- Historial de servicios

### 5. **CRUD de Reseñas**
- Agregar reseñas de clientes
- Calificación de profesionales
- Ver reseñas por profesional
- Administrar reseñas

### 6. **Búsqueda y Filtrado**
- Tabla de búsqueda global
- Filtros por categoría
- Filtros por ciudad
- Filtros por disponibilidad
- Tarjetas de información de profesionales

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- npm o yarn
- Angular CLI 17+

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repositorio>
cd Dawa-Proyecto/Serv_Oficios
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar la aplicación en desarrollo**
```bash
ng serve
# o
npm start
```

4. **Acceder a la aplicación**
```
http://localhost:4200
```

### Build para Producción
```bash
ng build --configuration production
```

## 🗺️ Rutas de la Aplicación

### Estructura de Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Redirige a `/inicio` | Página principal |
| `/inicio` | Inicio | Página de inicio con menú |
| `/inicio/categoria-crud` | CrudCategorias | Gestión de categorías |
| `/inicio/profesionales-crud` | CrudProfesionales | Gestión de profesionales |
| `/inicio/clientes-crud` | CrudClientes | Gestión de clientes |
| `/inicio/servicio-crud` | CrudServicios | Gestión de servicios |
| `/inicio/resenas-crud` | CrudResena | Gestión de reseñas |
| `/profesionales-vista` | Vista | Vista pública de profesionales |
| `/profesionales-vista/:id/:idCat` | Vista | Detalle de profesional y categoría |
| `**` | Redirige a `/inicio` | Rutas no válidas |

### Estructura de Rutas Hijas

```
/inicio (Componente Principal)
├── /categoria-crud
├── /profesionales-crud
├── /clientes-crud
├── /servicio-crud
├── /resenas-crud
└── (Default: /categoria-crud)
```

## 🧩 Componentes

### Componentes CRUD

| Componente | Ruta | Funcionalidad |
|-----------|------|--------------|
| **CrudCategorias** | `/inicio/categoria-crud` | Gestión completa de categorías |
| **CrudProfesionales** | `/inicio/profesionales-crud` | Gestión de profesionales |
| **CrudClientes** | `/inicio/clientes-crud` | Gestión de clientes |
| **CrudServicios** | `/inicio/servicio-crud` | Gestión de servicios |
| **CrudResena** | `/inicio/resenas-crud` | Gestión de reseñas |

### Componentes Compartidos

| Componente | Ubicación | Propósito |
|-----------|-----------|----------|
| **Cards** | `shared/cards/` | Tarjetas de información |
| **Search** | `shared/search/` | Barra de búsqueda |
| **Vista** | `profesionales/vista/` | Vista pública de profesionales |
| **Inicio** | `home/inicio/` | Contenedor con menú navegación |

### Estructura de Componentes CRUD

Cada componente CRUD incluye:
- Template HTML (`.html`)
- Lógica TypeScript (`.ts`)
- Estilos CSS (`.css`)
- Tests opcionales (`.spec.ts`)

## 🔌 Servicios

### Servicios Disponibles

| Servicio | Ubicación | Responsabilidad |
|---------|-----------|-----------------|
| **ServCategoria** | `services/serv-categoria.ts` | Operaciones CRUD de categorías |
| **ServClientes** | `services/serv-clientes.ts` | Operaciones CRUD de clientes |
| **ServProfesionales** | `services/serv-profesionales.ts` | Operaciones CRUD de profesionales |
| **ServResenas** | `services/serv-resenas.ts` | Operaciones CRUD de reseñas |
| **ServServicios** | `services/serv-servicios.ts` | Operaciones CRUD de servicios |

### Funcionalidades de Servicios

Cada servicio proporciona:
- **GET**: Obtener todos o un registro específico
- **POST**: Crear nuevo registro
- **PUT/PATCH**: Actualizar registro
- **DELETE**: Eliminar registro
- Manejo de HttpClient
- Gestión de observables

## 🛠️ Validadores

### Ubicación
`validators/Validators.ts`

### Intención
Contiene validadores personalizados para:
- Validación de formularios
- Validación de entrada de datos
- Reglas de negocio específicas

## 🔍 Pipes

### Ubicación
`pipes/filtros.ts`

### Propósito
Pipes personalizados para filtrado y transformación de datos en templates

## 📝 Datos

### Fuente de Datos
`public/json/datos.json`

### Estructura JSON
- **Categorías**: Lista de categorías de servicios
- **Profesionales**: Lista de profesionales registrados

### Datos Incluidos

**Categorías Predefinidas:**
- Gasfitería
- Electricidad
- Albañilería
- Limpieza
- Pintura
- Cerrajería
- Jardinería
- Técnico en Refrigeración

**Profesionales de Ejemplo:**
- Luis Franco (Electricidad)
- Alex Carranza (Electricidad)
- Noemi Coello (Albañilería)
- Jorde Reyes (Limpieza)
- Angel Alonso (Variedad)

## 🎯 Próximas Mejoras

- [ ] Integración con base de datos real (SQL/NoSQL)
- [ ] Autenticación y autorización
- [ ] Paginación en listados
- [ ] Exportación de reportes
- [ ] Notificaciones en tiempo real
- [ ] Integración de pagos
- [ ] API REST independiente
- [ ] Aplicación móvil

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Crear una rama para la nueva característica
2. Hacer commit de los cambios
3. Enviar un pull request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.