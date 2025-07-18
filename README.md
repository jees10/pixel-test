# pixel-test
# 🗓️ Calendar App

Este repositorio contiene **dos proyectos**:

* 📦 **Backend** (NestJS)
* 🌐 **Frontend** (Next.js)

Sigue estas instrucciones para ejecutar ambos correctamente.

---

## 📦 Backend (NestJS)

### 🚀 Instrucciones para levantar el backend

1. 📥 **Clonar el repositorio y entrar a la carpeta del backend**:

   ```bash
   cd calenda-be
   ```

2. 📦 **Usar la versión de Node configurada en `.nvmrc`**:

   ```bash
   nvm use || nvm install
   ```

3. 📥 **Instalar dependencias**:

   ```bash
   npm install
   ```

4. 🏃‍♂️ **Iniciar el backend**:

   ```bash
   npm run start:dev
   ```

✅ El backend se ejecutará en el puerto `3002`.

---

## 🌐 Frontend (Next.js)

### 🚀 Instrucciones para levantar el frontend

1. 📥 **Entrar a la carpeta del frontend**:

   ```bash
   cd calendar-fe
   ```

2. 📦 **Usar la versión de Node configurada en `.nvmrc`**:

   ```bash
   nvm use || nvm install
   ```

3. 📥 **Instalar dependencias**:

   ```bash
   npm install
   ```

4. 🏃‍♂️ **Iniciar el frontend**:

   ```bash
   npm run dev
   ```

✅ El frontend se ejecutará en el puerto `3000`. Abre tu navegador y entra a:

```
http://localhost:3000
```

---

## 🔑 Credenciales de acceso

Para iniciar sesión en la aplicación usa el siguiente usuario de prueba:

* **📧 Correo:** `test@test.com`
* **🔑 Contraseña:** `12345`

---

## ⚠️ Notas

* Asegúrate de que el backend esté corriendo en el puerto **3002** antes de levantar el frontend, ya que el frontend hace peticiones al API en ese puerto.
* Ambos proyectos usan la versión de Node especificada en el archivo `.nvmrc`.

---

## 📂 Estructura del repositorio

```
/calendar-be       # API REST en NestJS
/calendar-fe       # Aplicación web en Next.js
README.md          # Este archivo
```
