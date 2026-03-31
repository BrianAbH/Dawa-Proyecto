# 📋 ESPECIFICACIONES PARA DESARROLLO - Dawa-Proyecto

## Solicitud para Agente de IA: Sistema de Gestión de Servicios Profesionales

---

## 🎯 Descripción General del Proyecto

Desarrollar una **plataforma integral de gestión de servicios profesionales** que conecte clientes con profesionales calificados en diversos oficios. El sistema debe permitir la administración completa de categorías, profesionales, clientes, servicios y reseñas.

**Nombre del Proyecto:** Dawa-Proyecto / Serv_Oficios

---

## 🔧 Stack Tecnológico

### Frontend
- **Framework:** Angular 17+
- **Lenguaje:** TypeScript
- **Arquitectura:** Standalone Components
- **Sistema de Enrutamiento:** Angular Router
- **Comunicación HTTP:** HttpClient de Angular
- **Estilos:** CSS puro (sin librerías)
- **Fuente de Datos:** JSON local (datos.json)

### Configuración
```typescript
appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

---

## 📁 Estructura de Directorios Requerida

```
Serv_Oficios/
├── public/
│   └── json/
│       └── datos.json
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   └── app/
│       ├── app.config.ts
│       ├── app.routes.ts
│       ├── app.ts
│       ├── app.css
│       ├── app.html
│       ├── app.spec.ts
│       ├── components/
│       │   ├── categorias/crud-categorias/
│       │   │   ├── crud-categorias.html
│       │   │   └── crud-categorias.ts
│       │   ├── clientes/crud-clientes/
│       │   │   ├── crud-clientes.css
│       │   │   ├── crud-clientes.html
│       │   │   └── crud-clientes.ts
│       │   ├── home/inicio/
│       │   │   ├── inicio.css
│       │   │   ├── inicio.html
│       │   │   └── inicio.ts
│       │   ├── profesionales/
│       │   │   ├── crud-profesionales/
│       │   │   │   ├── crud-profesionales.html
│       │   │   │   └── crud-profesionales.ts
│       │   │   └── vista/
│       │   │       ├── vista.css
│       │   │       ├── vista.html
│       │   │       └── vista.ts
│       │   ├── resenas/crud-resena/
│       │   │   ├── crud-resena.css
│       │   │   ├── crud-resena.html
│       │   │   └── crud-resena.ts
│       │   ├── servicios/
│       │   │   ├── crud-servicios.css
│       │   │   ├── crud-servicios.html
│       │   │   ├── crud-servicios.ts
│       │   │   └── crud-servicios.spec.ts
│       │   └── shared/
│       │       ├── cards/
│       │       │   ├── cards.css
│       │       │   ├── cards.html
│       │       │   └── cards.ts
│       │       └── search/
│       │           ├── search.css
│       │           ├── search.html
│       │           └── search.ts
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
```

---

## 📊 Modelos de Datos

### 1. **Clientes**
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
  estado: string;              // "Activo" | "Inactivo"
  fechaRegistro?: string;      // ISO 8601 format
}
```

### 2. **Categorías**
```typescript
interface Categorias {
  id: string;
  nombre: string;
  descripcion: string;
  estado: "Activa" | "Inactiva";
}
```

**Categorías Predefinidas:**
- Gasfitería - Servicios de plomería y gasfitería
- Electricidad - Instalaciones y reparaciones eléctricas
- Albañilería - Construcción y reparaciones de obra
- Limpieza - Servicios de limpieza profesional
- Pintor - Aplicación de pintura, resanes y acabados
- Cerrajero - Experto en cerraduras y cerrojos
- Jardinero - Mantenimiento y diseño de jardines
- Técnico en Refrigeración - Instalación y reparación de aires acondicionados

### 3. **Profesionales**
```typescript
interface Profesionales {
  id: string;
  foto: string;                // URL o ruta de imagen
  nombreCompleto: string;
  numero: string;              // Teléfono
  correo: string;
  categoria: string;           // ID de categoría
  ciudad: string;
  experiencia: string;         // "X Años"
  estado: "Disponible" | "No disponible";
}
```

### 4. **Servicios**
```typescript
interface Servicios {
  id?: string | number;
  idCliente: string;
  idProfesional: string;
  categoria: string;
  descripcion: string;
  estado: "Pendiente" | "En proceso" | "Completado" | "Cancelado";
  fechaCreacion?: string;
  fechaCompletacion?: string;
}
```

### 5. **Reseñas**
```typescript
interface Resenas {
  id?: string | number;
  idProfesional: string;
  idCliente: string;
  calificacion: number;        // 1-5
  comentario: string;
  fecha?: string;
}
```

---

## 🛣️ Rutas Requeridas

### Configuración de Rutas
```typescript
const routes: Routes = [
  // Rutas sin menú
  {path: "profesionales-vista", component: Vista},
  {path: "profesionales-vista/:id/:idCat", component: Vista},

  // Ruta principal con menú y rutas hijas
  {path: "inicio", component: Inicio,
    children: [
      {path: "categoria-crud", component: CrudCategorias},
      {path: "profesionales-crud", component: CrudProfesionales},
      {path: "clientes-crud", component: CrudClientes},
      {path: "servicio-crud", component: CrudServicios},
      {path: "resenas-crud", component: CrudResena},
      {path: "", redirectTo: "categoria-crud", pathMatch: "full"}
    ]
  },

  // Redirecciones
  {path: "", redirectTo: "inicio", pathMatch: "full"},
  {path: "**", redirectTo: "inicio"}
];
```

### Tabla de Rutas

| Ruta | Componente | Descripción | Tipo |
|------|-----------|-------------|------|
| `/` | - | Redirige a inicio | Redirección |
| `/inicio` | Inicio | Página principal con menú | Layout |
| `/inicio/categoria-crud` | CrudCategorias | CRUD de categorías | Módulo |
| `/inicio/profesionales-crud` | CrudProfesionales | CRUD de profesionales | Módulo |
| `/inicio/clientes-crud` | CrudClientes | CRUD de clientes | Módulo |
| `/inicio/servicio-crud` | CrudServicios | CRUD de servicios | Módulo |
| `/inicio/resenas-crud` | CrudResena | CRUD de reseñas | Módulo |
| `/profesionales-vista` | Vista | Vista pública de profesionales | Página |
| `/profesionales-vista/:id/:idCat` | Vista | Detalle de profesional | Página |
| `**` | - | Rutas inválidas | Redirección |

---

## 🧩 Componentes Requeridos

### Componentes CRUD

#### 1. **CrudCategorias**
- **Ubicación:** `components/categorias/crud-categorias/`
- **Funcionalidades:**
  - Listar todas las categorías
  - Crear nueva categoría
  - Editar categoría existente
  - Eliminar categoría
  - Cambiar estado (Activa/Inactiva)
  - Tabla con búsqueda y filtros
  - Formulario de validación

#### 2. **CrudProfesionales**
- **Ubicación:** `components/profesionales/crud-profesionales/`
- **Funcionalidades:**
  - Listar profesionales
  - Crear nuevo profesional (con foto)
  - Editar perfil profesional
  - Eliminar profesional
  - Cambiar estado de disponibilidad
  - Filtrar por categoría y ciudad
  - Validación de datos

#### 3. **CrudClientes**
- **Ubicación:** `components/clientes/crud-clientes/`
- **Funcionalidades:**
  - Listar clientes
  - Registrar nuevo cliente
  - Editar datos del cliente
  - Eliminar cliente
  - Gestionar estado
  - Búsqueda avanzada
  - Historial de registros

#### 4. **CrudServicios**
- **Ubicación:** `components/servicios/`
- **Funcionalidades:**
  - Crear solicitud de servicio
  - Asignar profesional a servicio
  - Listar servicios
  - Cambiar estado del servicio
  - Seguimiento de servicios
  - Historial completo

#### 5. **CrudResena**
- **Ubicación:** `components/resenas/crud-resena/`
- **Funcionalidades:**
  - Agregar reseña de cliente
  - Calificar profesional (1-5 estrellas)
  - Listar reseñas por profesional
  - Eliminar reseña
  - Visualizar comentarios

### Componentes Compartidos (Shared)

#### 1. **Cards**
- **Ubicación:** `components/shared/cards/`
- **Propósito:** Componente reutilizable para mostrar información de profesionales, clientes o servicios en formato de tarjeta
- **Características:**
  - Foto/Avatar
  - Información principal
  - Acciones (editar, eliminar, ver)
  - Responsive design

#### 2. **Search**
- **Ubicación:** `components/shared/search/`
- **Propósito:** Barra de búsqueda reutilizable
- **Características:**
  - Input de texto
  - Búsqueda en tiempo real
  - Filtros combinables
  - Iconografía clara

### Componentes de Layout

#### 1. **Inicio**
- **Ubicación:** `components/home/inicio/`
- **Propósito:** Componente principal que contiene:
  - Menú de navegación
  - RouterOutlet para rutas hijas
  - Layout general de la aplicación

#### 2. **Vista**
- **Ubicación:** `components/profesionales/vista/`
- **Propósito:** Vista pública de profesionales
- **Características:**
  - Mostrar profesionales disponibles
  - Filtrar por categoría
  - Buscar por ciudad
  - Mostrar detalles con parámetros de ruta (:id/:idCat)

---

## 🔌 Servicios Requeridos

### 1. **ServCategoria**
**Archivo:** `services/serv-categoria.ts`

**Métodos:**
- `getCategories(): Observable<Categorias[]>`
- `getCategory(id: string): Observable<Categorias>`
- `createCategory(categoria: Categorias): Observable<Categorias>`
- `updateCategory(id: string, categoria: Categorias): Observable<Categorias>`
- `deleteCategory(id: string): Observable<void>`

### 2. **ServClientes**
**Archivo:** `services/serv-clientes.ts`

**Métodos:**
- `getClientes(): Observable<Clientes[]>`
- `getCliente(id: number): Observable<Clientes>`
- `createCliente(cliente: Clientes): Observable<Clientes>`
- `updateCliente(id: number, cliente: Clientes): Observable<Clientes>`
- `deleteCliente(id: number): Observable<void>`

### 3. **ServProfesionales**
**Archivo:** `services/serv-profesionales.ts`

**Métodos:**
- `getProfesionales(): Observable<Profesionales[]>`
- `getProfesional(id: string): Observable<Profesionales>`
- `createProfesional(profesional: Profesionales): Observable<Profesionales>`
- `updateProfesional(id: string, profesional: Profesionales): Observable<Profesionales>`
- `deleteProfesional(id: string): Observable<void>`
- `getProfesionalesByCategoria(categoria: string): Observable<Profesionales[]>`
- `getProfesionalesByCiudad(ciudad: string): Observable<Profesionales[]>`

### 4. **ServServicios**
**Archivo:** `services/serv-servicios.ts`

**Métodos:**
- `getServicios(): Observable<Servicios[]>`
- `getServicio(id: string): Observable<Servicios>`
- `createServicio(servicio: Servicios): Observable<Servicios>`
- `updateServicio(id: string, servicio: Servicios): Observable<Servicios>`
- `deleteServicio(id: string): Observable<void>`

### 5. **ServResenas**
**Archivo:** `services/serv-resenas.ts`

**Métodos:**
- `getResenas(): Observable<Resenas[]>`
- `getResena(id: string): Observable<Resenas>`
- `createResena(resena: Resenas): Observable<Resenas>`
- `updateResena(id: string, resena: Resenas): Observable<Resenas>`
- `deleteResena(id: string): Observable<void>`
- `getResenasByProfesional(idProfesional: string): Observable<Resenas[]>`

### Nota sobre Servicios
- Todos los servicios deben usar `HttpClient` de Angular
- Deben retornar `Observable`
- Usar la URL base: `http://localhost:4200/api` (o local JSON)
- Implementar manejo de errores básico
- Cada servicio es un Injectable

---

## 🔧 Validadores

**Archivo:** `validators/Validators.ts`

**Validadores a Implementar:**
- Validación de correo electrónico
- Validación de teléfono (formato ecuatoriano opcional)
- Validación de campos requeridos
- Validación de longitud mínima/máxima
- Validación de cédula (opcional)
- Validadores personalizados según necesidad

---

## 🔄 Pipes

**Archivo:** `pipes/filtros.ts`

**Pipes a Implementar:**
- `FiltrosPipe`: Filtrar arrays por propiedades
- Transformación de datos en templates
- Filtrado en tiempo real

---

## 📊 Fuente de Datos

**Archivo:** `public/json/datos.json`

**Estructura Requerida:**
```json
{
  "categorias": [
    {
      "id": "1",
      "nombre": "Gasfitería",
      "descripcion": "Servicios de plomería y gasfitería",
      "estado": "Activa"
    },
    // ... más categorías
  ],
  "profesionales": [
    {
      "id": "1",
      "foto": "https://imagen.jpg",
      "nombreCompleto": "Luis Franco",
      "numero": "0980661525",
      "correo": "luis@gmail.com",
      "categoria": "2",
      "ciudad": "Guayaquil",
      "experiencia": "5 Años",
      "estado": "Disponible"
    },
    // ... más profesionales
  ],
  "clientes": [],
  "servicios": [],
  "resenas": []
}
```

---

## 🎨 Estilos y Branding

- Usar CSS puro (sin frameworks de CSS)
- Responsive design mobile-first
- Colores profesionales y coherentes
- Iconografía clara y consistente
- Accesibilidad WCAG 2.1 Level A mínimo

---

## ✅ Funcionalidades Principales Requeridas

### 1. Gestión de Categorías
- [x] CRUD completo
- [x] Estado (Activa/Inactiva)
- [x] Listado con tabla

### 2. Gestión de Profesionales
- [x] CRUD completo
- [x] Foto de perfil
- [x] Filtros por categoría y ciudad
- [x] Estado de disponibilidad
- [x] Vista pública accesible

### 3. Gestión de Clientes
- [x] CRUD completo
- [x] Información completa (nombre, teléfono, email, ciudad, dirección, cédula)
- [x] Foto de perfil

### 4. Gestión de Servicios
- [x] CRUD básico
- [x] Asignación profesional-cliente
- [x] Control de estado

### 5. Sistema de Reseñas
- [x] CRUD de reseñas
- [x] Calificación 1-5 estrellas
- [x] Comentarios

### 6. Búsqueda y Filtrado
- [x] Búsqueda por nombre
- [x] Filtros por categoría
- [x] Filtros por ciudad
- [x] Filtros por disponibilidad

---

## 📦 Dependencias Requeridas

```json
{
  "dependencies": {
    "@angular/animations": "^17.x.x",
    "@angular/common": "^17.x.x",
    "@angular/compiler": "^17.x.x",
    "@angular/core": "^17.x.x",
    "@angular/forms": "^17.x.x",
    "@angular/platform-browser": "^17.x.x",
    "@angular/platform-browser-dynamic": "^17.x.x",
    "@angular/router": "^17.x.x",
    "rxjs": "^7.x.x",
    "tslib": "^2.x.x",
    "zone.js": "^0.14.x"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^17.x.x",
    "@angular/cli": "^17.x.x",
    "@angular/compiler-cli": "^17.x.x",
    "@types/jasmine": "~5.1.x",
    "jasmine-core": "~5.1.x",
    "karma": "~6.4.x",
    "karma-chrome-launcher": "~3.2.x",
    "karma-coverage": "~2.2.x",
    "karma-jasmine": "~5.1.x",
    "karma-jasmine-html-reporter": "~2.1.x",
    "typescript": "~5.2.x"
  }
}
```

---

## 🚀 Instrucciones de Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
ng serve

# 3. Acceder a http://localhost:4200

# 4. Build para producción
ng build --configuration production
```

---

## 📋 Checklist de Implementación

- [ ] Estructura de carpetas creada
- [ ] Modelos de datos definidos (interfaces TypeScript)
- [ ] Servicios implementados con HttpClient
- [ ] Componentes CRUD creados
- [ ] Componentes compartidos (Cards, Search)
- [ ] Rutas configuradas
- [ ] Validadores personalizados
- [ ] Pipes de filtrado
- [ ] Datos JSON cargados
- [ ] Estilos CSS implementados
- [ ] Responsividad verificada
- [ ] Tests básicos incluidos
- [ ] README actualizado
- [ ] Proyecto funcional y probado

---

## 📝 Notas Importantes

1. **Datos Locales:** El proyecto usa datos en JSON local. Puede migrarse a backend en futuro.
2. **Autenticación:** No incluir en esta versión
3. **Testing:** Incluir tests básicos para componentes principales
4. **Performance:** Lazy loading en rutas hijas (opcional)
5. **Accesibilidad:** Mantener soporte WCAG 2.1 Level A

---

## 🎓 Ejemplo de Prompt para el Agente IA

```
Crear una aplicación Angular 17+ de gestión de servicios profesionales con las siguientes especificaciones:

Stack: Angular 17+, TypeScript, Standalone Components, CSS puro
Funcionalidades: CRUD de categorías, profesionales, clientes, servicios y reseñas
Datos: JSON local (proporcionado)
Rutas: Sistema de rutas con layout principal y vistas públicas
Componentes: 5 módulos CRUD + componentes compartidos
Servicios: 5 servicios HTTP para manejo de datos
Validadores: Validación personalizada de formularios
Pipes: Filtrado de datos en templates

Requisitos específicos:
- Arquitectura modular con standalone components
- Responsive design
- Búsqueda y filtrado avanzado
- Vista pública de profesionales
- Gestión de estado de disponibilidad
- Validación de formularios

Ver especificaciones detalladas para requisitos completos.
```

---

## 📞 Información de Contacto para Consultorías

Para cambios significativos o consultas técnicas, referirse a las especificaciones de componentes y servicios.

---

**Versión:** 1.0
**Última Actualización:** Marzo 2026
**Estado:** Completo y listo para desarrollo
