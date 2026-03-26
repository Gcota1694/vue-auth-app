# 🔐 Vue Auth App

Aplicación web de autenticación construida con Vue 3, Vite y Supabase. Incluye registro, inicio de sesión y rutas protegidas.

🌐 **GitHub Pages:** [gcota1694.github.io/vue-auth-app](https://gcota1694.github.io/vue-auth-app/)  
▲ **Vercel:** [vue-auth-app-vh2b.vercel.app](https://vue-auth-app-vh2b.vercel.app/#/)

---

## 🚀 Tecnologías utilizadas

- [Vue 3](https://vuejs.org/) — Framework de JavaScript progresivo
- [Vite](https://vitejs.dev/) — Herramienta de build ultrarrápida
- [Supabase](https://supabase.com/) — Backend como servicio (autenticación y base de datos)
- [Vue Router](https://router.vuejs.org/) — Enrutamiento con rutas protegidas
- [Pinia](https://pinia.vuejs.org/) — Manejo de estado global

---

## ✨ Funcionalidades

- Registro de usuario con email, nombre y apellido
- Inicio de sesión
- Cierre de sesión
- Rutas protegidas (solo accesibles con sesión activa)
- Redirección automática según estado de autenticación
- Bienvenida personalizada con nombre completo en el dashboard

---

## 📦 Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Gcota1694/vue-auth-app.git
cd vue-auth-app

# 2. Instalar dependencias
npm install

# 3. Crear archivo de variables de entorno
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

```bash
# 4. Correr en desarrollo
npm run dev
```

---

## 🏗️ Build para producción

```bash
npm run build
```

---

## 🔑 Variables de entorno

| Variable | Descripción |
|---|---|
| `VITE_SUPABASE_URL` | URL de tu proyecto en Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clave pública (anon key) de Supabase |

> ⚠️ Nunca subas tu archivo `.env` al repositorio.

---

## 🚢 Despliegue

### GitHub Pages
El proyecto se despliega automáticamente con GitHub Actions al hacer push a `main`.

Para configurarlo en tu propio fork, agrega los secrets en **Settings → Secrets and variables → Actions**:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Vercel
Importa el repositorio en [vercel.com](https://vercel.com) y agrega las variables de entorno en **Settings → Environment Variables** antes de hacer deploy.

---

## 📁 Estructura del proyecto

```
src/
├── components/       # Componentes reutilizables
├── composables/      # Lógica reutilizable (useAuth)
├── router/           # Configuración de rutas y guardas
├── stores/           # Estado global con Pinia
├── views/            # Vistas principales
│   ├── AuthView.vue
│   ├── HomeView.vue
│   ├── DashboardView.vue
│   └── NotFoundView.vue
├── supabase.js       # Cliente de Supabase
└── main.js           # Punto de entrada
```

---

## 👤 Autor

**Gabriel Alejo Cota** — [@Gcota1694](https://github.com/Gcota1694)