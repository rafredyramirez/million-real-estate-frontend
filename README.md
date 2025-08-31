# RealEstate — Frontend (React + Vite + Tailwind + React Query)

Interfaz web para consultar propiedades desde el API de RealEstate, con **búsqueda por nombre, dirección y rango de precios**, **paginación**, **ordenamiento** y **detalle**. Preparado para ejecutarse en **desarrollo** (Vite) o **producción** con **Docker + Nginx**.

---

## 📦 Tecnologías

- **Framework:** React 18 + Vite  
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS  
- **Data fetching & cache:** TanStack React Query v5  
- **HTTP:** Axios (con `X-Correlation-ID` por request)  
- **Validación de respuestas:** Zod  
- **Contenedores:** Docker / Docker Compose  
- **Node:** 22.12+

---

## 🧱 Estructura del proyecto (formato árbol)

```text
src/
├─ components/                # UI reutilizable
│  ├─ Layout.tsx
│  ├─ PropertyCard.tsx
│  ├─ FiltersForm.tsx
│  ├─ Pagination.tsx
│  └─ SkeletonCard.tsx
├─ features/
│  └─ properties/
│     ├─ api.ts              # llamadas HTTP (Axios, usa VITE_API_URL)
│     ├─ hooks.ts            # React Query (useProperties, usePropertyDetail)
│     ├─ schemas.ts          # Zod (validación de respuestas)
│     ├─ types.ts            # Tipos derivados de Zod
│     └─ pages/
│        ├─ PropertiesPage.tsx
│        └─ PropertyDetailPage.tsx
├─ lib/
│  ├─ axios.ts               # cliente Axios (baseURL + X-Correlation-ID)
│  ├─ format.ts              # utilidades (monedas, helpers)
│  ├─ searchParams.ts        # sincroniza filtros ↔ URL
│  └─ useDebouncedValue.ts   # debounce para inputs
├─ main.tsx                  # Router + QueryClient + Layout
└─ index.css                 # TailwindCSS
```

**Buenas prácticas aplicadas**
- Separación de responsabilidades: API / hooks / UI.  
- Sincronización de filtros y paginación con la URL (deep-linkable).  
- Esquemas **zod** para validar el shape del backend.  
- Placeholders y `onError` para imágenes (UX robusta).  
- Errores visibles con `X-Correlation-ID` (troubleshooting).  

---

## 🔧 Configuración de entorno

El frontend consume el backend vía `VITE_API_URL`.

### **CORS** 
El front llama directamente a `http://localhost:5153/api` y el backend permite los orígenes del front.

- **Desarrollo (Vite):** crea `.env.development`
  ```env
  VITE_API_URL=http://localhost:5153/api
  ```
---

## ▶️ Ejecución

### Desarrollo (Vite)
```bash
npm ci
npm run dev
# abre http://localhost:5173
```

### Docker (producción con Nginx)
```bash
docker compose up -d --build
# abre http://localhost:8080
```
---

## 🔗 Uso conjunto con el Backend

### 1) Backend
- Repositorio: **million-real-estate-backend**  
- Arranca con Docker:
  ```bash
  docker compose up -d --build
  # Swagger: http://localhost:5153/swagger
  ```
- Verifica:
  - Health: `http://localhost:5153/healthz` → `{ "status": "ok" }`
  - Ready: `http://localhost:5153/readyz` → `{ "status": "ready" }`
  - Swagger: `http://localhost:5153/swagger`

### 2) Frontend
- Repositorio: **million-real-estate-frontend**
- Dev local:
  ```bash
  # .env.development con VITE_API_URL=http://localhost:5153/api
  npm ci && npm run dev
  # http://localhost:5173
  ```
- Docker frontend:
  ```bash
  # .env (Compose) con VITE_API_URL=http://localhost:5153/api
  docker compose up -d --build
  # http://localhost:8080
  ```

