---
title: "Cómo Configurar Home Assistant con Amazon Alexa"
slug: /asistentes-hubs/como-configurar-home-assistant-alexa
keyword: "configurar Home Assistant Alexa"
volumen: 590
kd: 9
intencion: tutorial
categoria: asistentes-hubs
fecha: 2026-08-18
description: "Tutorial paso a paso para conectar Home Assistant con Alexa. Control por voz de tus dispositivos domóticos con Nabu Casa o configuración manual."
keywords: ["home assistant alexa", "alexa home assistant", "nabu casa alexa", "control voz domótica"]
subcategoria: "asistentes"
fechaActualizacion: "2026-08-18"
autor: "Equipo SmartHome"
imagen: null
imagenAlt: null
schema: "Article"
---

# Cómo Configurar Home Assistant con Amazon Alexa

Controlar Home Assistant por voz con Alexa te permite usar comandos como **"Alexa, enciende las luces del salón"** o **"Alexa, ¿cuántos grados hay en el dormitorio?"** sin tocar el móvil. Hay dos formas de hacerlo: a través de Home Assistant Cloud (la más fácil) o configuración manual (la más técnica).

## Opción 1: Home Assistant Cloud (Recomendada)

Home Assistant Cloud (Nabu Casa) es un servicio de pago que facilita la conexión con Alexa y Google Home. **Cuesta €6.50/mes** y soporta directamente al proyecto Home Assistant.

### Pasos

1. **Crear cuenta** en [nabu.casa](https://nabu.casa)
2. **Vincular tu instancia** de Home Assistant
3. En Home Assistant, ir a **Settings > Home Assistant Cloud**
4. Iniciar sesión con tu cuenta Nabu Casa
5. Activar **"Alexa"** en la sección de integraciones
6. Abrir la app Alexa > **Skills > Buscar "Home Assistant Cloud"**
7. Activar la skill e iniciar sesión
8. **Descubrir dispositivos** en Alexa

**Ventajas:**
- Configuración en 5 minutos
- Sin abrir puertos en el router
- Soporte técnico incluido
- Funciona sin configuración de red

## Opción 2: Configuración Manual (Gratis)

Si no quieres pagar Nabu Casa, puedes configurar Alexa manualmente usando la **integración de Alexa Smart Home**. Requiere conocimientos de red.

### Pasos

1. En Home Assistant, ir a **Settings > Devices & Services > + Add Integration**
2. Buscar **"Amazon Alexa"**
3. Seguir las instrucciones para configurar la cuenta de developer de Amazon
4. Crear una skill de Alexa Smart Home
5. Configurar el endpoint (URL de tu Home Assistant)
6. Vincular la skill en la app Alexa

**Nota:** Esta opción requiere que tu Home Assistant sea accesible desde internet (con HTTPS y dominio).

## Exponer Dispositivos a Alexa

Una vez conectado, debes configurar qué dispositivos de Home Assistant están disponibles en Alexa.

### En Home Assistant

Ir a **Settings > Devices & Services > Alexa > Expose**

Selecciona los dispositivos que quieres controlar por voz:

- `light.salón` → "Alexa, enciende la luz del salón"
- `climate.termostato` → "Alexa, sube la temperatura"
- `sensor.temperatura_dormitorio` → "Alexa, ¿cuántos grados hay en el dormitorio?"
- `switch.aspiradora` → "Alexa, enciende la aspiradora"

### Configurar nombres amigables

Los dispositivos de Home Assistant tienen nombres técnicos (`light.living_room`). Para que Alexa entienda mejor, configura **names amigables**:

```yaml
entity_id: light.living_room
name: "Luz del salón"
friendly_name: "Luz del salón"
```

## Comandos Útiles

| Comando | Acción |
|---|---|
| "Alexa, enciende la luz del salón" | Encender luz |
| "Alexa, apaga todas las luces" | Apagar todas |
| "Alexa, sube la luz del dormitorio al 50%" | Ajustar brillo |
| "Alexa, pon la luz en rojo" | Cambiar color |
| "Alexa, ¿cuántos grados hay?" | Leer sensor temperatura |
| "Alexa, sube la temperatura a 22 grados" | Ajustar termostato |
| "Alexa, activa la escena cena" | Activar escena |
| "Alexa, abre la persiana" | Controlar persiana |

## Crear Escenas y Rutinas

### Escena "Cine" en Home Assistant

```yaml
scene:
  - name: "Cine"
    entities:
      light.salon:
        state: "on"
        brightness: 20
        color_temp_kelvin: 2700
      light.tira_led_tv:
        state: "on"
        brightness: 15
        rgb_color: [0, 0, 50]
```

### Rutina "Buenos días" en Alexa

1. Abrir Alexa > **Routines**
2. Crear nueva rutina
3. **Trigger:** "Alexa, buenos días"
4. **Acción 1:** Controlar dispositivo → Home Assistant → Encender luz cocina
5. **Acción 2:** Weather → Decir el clima
6. **Acción 3:** Calendar → Decir próximos eventos

## Solución de Problemas

### "Alexa no encuentra dispositivos"

1. Verificar que la skill de Home Assistant está activada
2. Pedir a Alexa que "descubra dispositivos nuevos"
3. Verificar que los dispositivos están expuestos en Home Assistant
4. Reiniciar Home Assistant y Alexa

### "Alexa no entiende el nombre"

1. Usar nombres amigables simples en Home Assistant
2. Evitar nombres con caracteres especiales
3. Probar con el nombre exacto configurado

### "Respuesta lenta o sin respuesta"

1. Verificar que Home Assistant tiene acceso a internet
2. Si usas Nabu Casa, verificar el estado del servicio
3. Si es configuración manual, verificar HTTPS y firewall

## Conclusión

Conectar Home Assistant con Alexa combina la potencia de la domótica local con la comodidad del control por voz. Nabu Casa (€6.50/mes) es la opción más fácil y fiable. Con esta configuración, puedes controlar cualquier dispositivo de tu casa con la voz, sin depender de ecosistemas cerrados.

**Lectura relacionada:**
- [Home Assistant: guía completa](/asistentes-hubs/home-assistant-guia-instalacion)
- [Alexa vs Google Home vs Siri](/asistentes-hubs/alexa-vs-google-home-siri)
- [Zigbee vs Z-Wave vs WiFi vs Thread](/asistentes-hubs/zigbee-vs-zwave-vs-wifi)
