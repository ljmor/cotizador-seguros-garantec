# Cotizador de Seguros para Agentes

Este documento presenta una visión general del proyecto, detallando la problemática actual, los objetivos, las tecnologías seleccionadas y el equipo de desarrollo.

---

## 1. Problemática y Objetivo General

### Problemática

El proceso actual para **cotizar seguros de vehículos es lento, manual y poco eficiente**, afectando la experiencia del cliente y limitando el crecimiento del negocio. Entre los principales problemas se destacan:

- Cotización individual con cada aseguradora, con tiempos de espera prolongados.
- Falta de plataformas automatizadas; en muchos casos se debe recurrir a correos electrónicos y hojas de cálculo como Excel.
- Comparaciones manuales entre coberturas, lo que añade complejidad y tiempo.
- Uso de un portal web desactualizado, no responsivo ni escalable.
- Dependencia de procesos manuales que extienden los tiempos de respuesta a **2-3 días**.

### Objetivo General

Desarrollar una **plataforma digital moderna, eficiente y profesional** que permita a los asesores de seguros **cotizar de forma rápida y centralizada**, reduciendo los tiempos de cotización a **menos de 3 minutos**. Se busca:

- Optimizar el flujo de trabajo de los asesores.
- Eliminar procesos manuales.
- Mejorar la experiencia del usuario con un diseño responsivo y fácil de usar.
- Escalar el sistema para futuras integraciones y aseguradoras adicionales.

---

## 2. Tecnologías y Justificación

### Frontend: React

**React** es la biblioteca seleccionada para el desarrollo del frontend.

**Ventajas clave:**

- Modularidad y **reutilización de componentes**.
- Ecosistema robusto, bien documentado y respaldado por una comunidad activa.
- Interfaces altamente dinámicas y responsivas.
- Integración fluida con **Material UI**.
- Desacoplamiento total del backend, operando mediante **API REST**.

### Lenguaje de Desarrollo: JavaScript

JavaScript será el lenguaje principal del frontend.

**Justificación:**

- Es el **lenguaje nativo de los navegadores web**.
- Permite construir interfaces modernas con alta interactividad.
- Compatibilidad total con React, HTML y CSS.
- Amplio soporte en navegadores, herramientas y librerías.
- Facilidad para conectarse a APIs RESTful.

### Diseño UI/UX: Material Design 3 con Material UI

Se utilizará **Material Design 3** a través de **Material UI**, garantizando una experiencia profesional y centrada en el usuario.

**Beneficios:**

- Diseño limpio, moderno y coherente.
- **Consistencia visual** en toda la aplicación.
- Enfoque centrado en flujos secuenciales, ideal para procesos paso a paso.
- Cumplimiento de normas de **accesibilidad y usabilidad**.
- Totalmente **responsivo** en dispositivos móviles, tabletas y escritorios.

### Backend: API REST con Symfony

El backend actual está desarrollado en **Symfony (PHP)** con base de datos **SQL**. El frontend se comunicará mediante una **API RESTful**.

**Arquitectura propuesta:**

```
Usuario → React (Frontend) → API REST → Symfony (Backend)
→ SQL (Base de datos)
```

Esta arquitectura promueve una clara separación de responsabilidades, escalabilidad y facilidad de mantenimiento.

---

## 3. Equipo de Trabajo

El desarrollo del frontend y su integración con el backend existente estará a cargo del siguiente equipo:

- **Luis Mora** — Project Manager  
- **Juan Espinosa** — Business Analyst  
- **Dara Van Gisel** — UI Designer  
- **Erick Gaona** — Architecture Designer

---

## Conclusión

Este proyecto representa un paso clave hacia la transformación digital del proceso de cotización de seguros. La solución propuesta permitirá reducir tiempos, mejorar la experiencia del cliente y aumentar la eficiencia operativa de los asesores.
