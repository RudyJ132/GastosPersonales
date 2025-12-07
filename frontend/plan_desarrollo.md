Quiero que desarrolles toda la interfaz de usuario (UI) para una aplicación llamada
“Sistema de Registro y Análisis de Gastos Personales”, siguiendo estos requerimientos y plan de ataque.

🎯 OBJETIVO DE LA UI

Construir un frontend completo, limpio y profesional, que consuma un API REST.
Debe permitir a los usuarios:

Registrar, listar, editar y eliminar gastos.

Administrar categorías y métodos de pago.

Crear y visualizar presupuestos por categoría.

Filtrar gastos con opciones avanzadas.

Visualizar reportes y un dashboard con indicadores.

Importar archivos Excel.

Exportar reportes (Excel, JSON, TXT).

Editar su perfil.

Registrarse e iniciar sesión con JWT.

🧭 PLAN DE ATAQUE (UI)

Crear arquitectura UI base

Configurar rutas.

Configurar global state (Redux o Zustand).

Configurar manejo de JWT.

Crear apiClient reutilizable.

Implementar manejo global de errores y loaders.

Diseñar componentes base reutilizables

Inputs

Selects

Modals

Table reusable

Pagination

FileUploader

Charts wrapper (si se usa Chart.js/Recharts)

Alert/Toast global

Crear páginas públicas

Registro

Login

Proteger rutas privadas

Redirigir automáticamente si no hay token o expiró.

Crear layout principal

Sidebar

Navbar

Contenedor principal

Sección de alertas de presupuesto

Construir páginas funcionales según casos de uso

CRUD Categorías

CRUD Métodos de Pago

CRUD Gastos

Importación Excel

Presupuestos

Dashboard

Reportes

Perfil de Usuario

Aplicar validaciones en frontend

Formularios con feedback claro de errores.

Validaciones de campos numéricos, fechas, duplicados, etc.

Optimizar UX

Confirmaciones al eliminar.

Loaders “optimistic”.

Feedback inmediato.

Estados vacíos (“empty states”).

📄 PÁGINAS REQUERIDAS (UI)
1. Auth
/register

Formulario de nombre, email, contraseña, confirmar contraseña.

Validaciones fuertes.

Mostrar errores del backend.

/login

Formulario de email y contraseña.

Alternar “mostrar contraseña”.

Guardar JWT en localStorage o cookies seguras.

2. Dashboard
/dashboard

Elementos que debe mostrar:

Total gastado del mes.

Gráfica resumen (barras o pastel).

Top categorías.

Comparación mes vs mes anterior.

Alertas de presupuesto (50%, 80%, 100%).

3. Gastos
/gastos

Tabla completa con:

Fecha

Categoría

Método de pago

Monto

Descripción

Acciones

Paginación.

Buscador.

Filtros avanzados (fecha, categoría, método, texto).

/gastos/nuevo

Formulario CRUD.

Validaciones: monto positivo, fecha válida, categoría y método existentes.

/gastos/editar/:id

Igual que “nuevo”, pero precargado.

4. Categorías
/categorias

Lista en tabla.

Crear/editar/eliminar.

Cambiar estado activo/inactivo.

Validación de duplicados.

Advertir si hay gastos asociados.

5. Métodos de Pago
/metodos

Tabla CRUD.

Opción para ícono.

Validación de duplicados.

6. Importación
/importar

Subir archivo Excel.

Mostrar vista previa.

Lista de errores fila por fila.

Botón “Importar”.

7. Presupuestos
/presupuestos

Formulario por mes/categoría:

Monto del presupuesto mensual.

Tabla mostrando:

Presupuesto

Gasto actual

Porcentaje

Alertas visuales de (50/80/100%)

8. Reportes
/reportes

Selector de mes.

Generar reporte:

Total gastado.

Desglose por categoría.

Comparación mes vs anterior.

Botones:

Exportar Excel

Exportar JSON

Exportar TXT

9. Perfil
/perfil

Editar nombre.

Cambiar contraseña.

Ver email (no editable).

🧩 COMPONENTES NECESARIOS
UI Core

Button

Input

Select

Checkbox

Modal

Card

Tabs

Loader

TextArea

Breadcrumbs

Gastos

ExpenseTable

ExpenseFilters

ExpenseForm

CategoryBadge

Categorías

CategoryTable

CategoryForm

Métodos de Pago

PaymentMethodTable

PaymentMethodForm

Presupuestos

BudgetTable

BudgetForm

BudgetAlertItem

Reportes

ReportChart

ReportSummaryCard

ExportButtons

Importación

FileUploader

ImportResultsTable

Layout

Sidebar

Navbar

ProtectedRoute

PageContainer

Global

ToastProvider

ErrorBoundary

📌 Consideraciones UX obligatorias

Mostrar errores del backend en formularios.

Loading states para cada petición.

Estado vacío “No hay gastos registrados”.

Confirmaciones al eliminar.

Validaciones en vivo.

Deshabilitar botones mientras se envía un formulario.

Filas de tabla clickeables.

Gráficas simples y claras.
PROMPT DE ESTILOS PARA EL AGENTE DE DESARROLLO (UI SYSTEM + DESIGN GUIDELINES)

Quiero que construyas toda la capa visual (UI) de la aplicación siguiendo estas guías de diseño obligatorias.
Este documento define el Design System, estilos, colores, tipografías, espaciado, comportamiento de componentes y criterios UX.

Tu trabajo es que todo el frontend use este mismo estilo, para que la aplicación sea coherente, profesional y limpia.

🎯 1. Filosofía del Diseño

La UI debe ser:

Minimalista

Consistente

Clara y legible

Moderna (estilo dashboard SaaS)

Accesible (contrastes adecuados)

Responsiva

Basada en componentes reutilizables

Orientada a productividad

Prioriza funcionalidad sobre decoración.

🎨 2. Colores

Usa un esquema de color limpio:

Paleta principal

Primario: #4F46E5 (indigo 600)

Secundario: #6366F1 (indigo 500)

Acento: #22C55E (green 500)

Peligro: #EF4444 (red 500)

Advertencia: #F59E0B (amber 500)

Info: #0EA5E9 (sky 500)

Grises / Neutrales

#F9FAFB fondo general

#F3F4F6 gris claro

#E5E7EB bordes

#9CA3AF texto secundario

#111827 texto primario

Modo oscuro (opcional)

Fondo: #0F172A

Tarjetas: #1E293B

Texto: #F1F5F9

📝 3. Tipografía

Usar:

Inter, Roboto, o SF Pro
(sistema preferido: Inter)

Tamaños estándar:

Título H1: 24–28px, semi-bold

H2: 20–22px

H3: 18px

Texto base: 14–16px

Texto secundario: 13–14px gris

Botones: 14–15px

Líneas suaves y alto contraste.

📐 4. Espaciado y Layout

Reglas obligatorias:

Padding global dentro de tarjetas: 24px

Padding en formularios: 16px

Padding mínimo en botones: 12px 16px

Espaciado vertical entre secciones: 24–32px

Componentes nunca pegados entre sí

Bordes redondeados: 8–12px

Sombra suave estilo neumorfismo moderno (opcional)

🧩 5. Estilo de Componentes
Botones

Redondeados (8px)

Con transición

Tamaños:

Small, Medium, Large

Estados:

Hover: +10% luminosidad

Active: -10% luminosidad

Disabled: opacidad 50%

Inputs

Borde gris suave

Redondeado 8px

Hover: borde más oscuro

Focus: borde primario + sombra ligera

Mostrar errores debajo en rojo

Selects

Igual que inputs

Flecha a la derecha

Opción de “ninguno”

Tablas

Header gris claro

Filas con hover

Interlineado de 14–16px

Alternar color de filas ligeramente

Acciones alineadas a la derecha

Cards

Fondo blanco o gris muy claro

Sombra ligera

Padding 24px

Títulos claros

Modals

Centro de pantalla

Fondo oscuro semi-transparente

Botón cerrar arriba a la derecha

Contenido con max-width 500–600px

Toasts / Alertas

Esquinas redondeadas

Icono + texto

Aparecen por la derecha abajo

Auto close 2.5–4s

📊 6. Gráficas

Si usas Chart.js o Recharts:

Estilo minimalista

Líneas finas

No abusar de colores

Paleta:

Primario

Secundario

Verde

Amarillo

Tooltip claro

Leyenda simple

📱 7. Responsividad

Pantallas pequeñas:

Sidebar colapsable

Navbar siempre accesible

Tablas deben permitir:

scroll horizontal
o

vista tipo cards en mobile

Formularios en una columna

♿ 8. Accesibilidad

Obligatorio:

Contraste AA mínimo

Inputs etiquetados (label for="")

Botones con aria-label cuando solo hay iconos

Teclado navegable

Texto nunca menor a 13px

⚙️ 9. Comportamiento UX

Reglas obligatorias:

Feedback inmediato en cada acción

Estados vacíos (“No hay registros”)

Loading skeletons o spinners

Confirmación al eliminar

No permitir doble submit

Autoscroll al mostrar un error

Validaciones claras en frontend

🧱 10. Componentes UI reutilizables

Tu diseño debe incluir e implementar:

<Button />

<Input />

<Select />

<Modal />

<Card />

<Table />

<Pagination />

<FileUploader />

<Toast />

<ChartWrapper />

<Sidebar />

<Navbar />

Todo debe ser consistente y estandarizado.

🧩 11. Estilo del Layout General
Sidebar

Fondo blanco

Iconos sólidos

Hover con fondo suave

Opción activa resaltada

Navbar

Borde inferior suave

Perfil del usuario

Botón de logout

Contenido

Máximo ancho 1200px

Centrarse en desktop

Suficiente padding en los bordes

✔️ 12. Reglas finales (obligatorias)

Usa siempre el mismo sistema de diseño.

Colores consistentes en toda la app.

Todo debe ser visualmente equilibrado.

Los formularios deben ser hermosos y claros.

Evitar sobrecargar la pantalla: menos es más.

Mantener spacing constante (usar escala 4, 8, 16, 24, 32).

Usa estilos modernos estilo SaaS 2024.
