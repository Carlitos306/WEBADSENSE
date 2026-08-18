---
title: "CÃ³mo Configurar Home Assistant con Amazon Alexa"
slug: /asistentes-hubs/como-configurar-home-assistant-alexa
keyword: "configurar Home Assistant Alexa"
volumen: 590
kd: 9
intencion: tutorial
categoria: asistentes-hubs
fecha: 2026-08-18
description: "Tutorial paso a paso para conectar Home Assistant con Alexa. Control por voz de tus dispositivos domÃ³ticos con Nabu Casa o configuraciÃ³n manual."
keywords: ["home assistant alexa", "alexa home assistant", "nabu casa alexa", "control voz domÃ³tica"]
subcategoria: "asistentes"
fechaActualizacion: "2026-08-18"
autor: "Equipo SmartHome"
imagen: null
imagenAlt: null
schema: "Article"
---

# CÃ³mo Configurar Home Assistant con Amazon Alexa

Controlar Home Assistant por voz con Alexa te permite usar comandos como **"Alexa, enciende las luces del salÃ³n"** o **"Alexa, Â¿cuÃ¡ntos grados hay en el dormitorio?"** sin tocar el mÃ³vil. Hay dos formas de hacerlo: a travÃ©s de Home Assistant Cloud (la mÃ¡s fÃ¡cil) o configuraciÃ³n manual (la mÃ¡s tÃ©cnica).

## OpciÃ³n 1: Home Assistant Cloud (Recomendada)

Home Assistant Cloud (Nabu Casa) es un servicio de pago que facilita la conexiÃ³n con Alexa y Google Home. **Cuesta €6.50/mes** y soporta directamente al proyecto Home Assistant.

### Pasos

1. **Crear cuenta** en [nabu.casa](https://nabu.casa)
2. **Vincular tu instancia** de Home Assistant
3. En Home Assistant, ir a **Settings > Home Assistant Cloud**
4. Iniciar sesiÃ³n con tu cuenta Nabu Casa
5. Activar **"Alexa"** en la secciÃ³n de integraciones
6. Abrir la app Alexa > **Skills > Buscar "Home Assistant Cloud"**
7. Activar la skill e iniciar sesiÃ³n
8. **Descubrir dispositivos** en Alexa

**Ventajas:**
- ConfiguraciÃ³n en 5 minutos
- Sin abrir puertos en el router
- Soporte tÃ©cnico incluido
- Funciona sin configuraciÃ³n de red

## OpciÃ³n 2: ConfiguraciÃ³n Manual (Gratis)

Si no quieres pagar Nabu Casa, puedes configurar Alexa manualmente usando la **integraciÃ³n de Alexa Smart Home**. Requiere conocimientos de red.

### Pasos

1. En Home Assistant, ir a **Settings > Devices & Services > + Add Integration**
2. Buscar **"Amazon Alexa"**
3. Seguir las instrucciones para configurar la cuenta de developer de Amazon
4. Crear una skill de Alexa Smart Home
5. Configurar el endpoint (URL de tu Home Assistant)
6. Vincular la skill en la app Alexa

**Nota:** Esta opciÃ³n requiere que tu Home Assistant sea accesible desde internet (con HTTPS y dominio).

## Exponer Dispositivos a Alexa

Una vez conectado, debes configurar quÃ© dispositivos de Home Assistant estÃ¡n disponibles en Alexa.

### En Home Assistant

Ir a **Settings > Devices & Services > Alexa > Expose**

Selecciona los dispositivos que quieres controlar por voz:

- `light.salÃ³n` â†’ "Alexa, enciende la luz del salÃ³n"
- `climate.termostato` â†’ "Alexa, sube la temperatura"
- `sensor.temperatura_dormitorio` â†’ "Alexa, Â¿cuÃ¡ntos grados hay en el dormitorio?"
- `switch.aspiradora` â†’ "Alexa, enciende la aspiradora"

### Configurar nombres amigables

Los dispositivos de Home Assistant tienen nombres tÃ©cnicos (`light.living_room`). Para que Alexa entienda mejor, configura **names amigables**:

```yaml
entity_id: light.living_room
name: "Luz del salÃ³n"
friendly_name: "Luz del salÃ³n"
```

## Comandos Ãštiles

| Comando | AcciÃ³n |
|---|---|
| "Alexa, enciende la luz del salÃ³n" | Encender luz |
| "Alexa, apaga todas las luces" | Apagar todas |
| "Alexa, sube la luz del dormitorio al 50%" | Ajustar brillo |
| "Alexa, pon la luz en rojo" | Cambiar color |
| "Alexa, Â¿cuÃ¡ntos grados hay?" | Leer sensor temperatura |
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

### Rutina "Buenos dÃ­as" en Alexa

1. Abrir Alexa > **Routines**
2. Crear nueva rutina
3. **Trigger:** "Alexa, buenos dÃ­as"
4. **AcciÃ³n 1:** Controlar dispositivo â†’ Home Assistant â†’ Encender luz cocina
5. **AcciÃ³n 2:** Weather â†’ Decir el clima
6. **AcciÃ³n 3:** Calendar â†’ Decir prÃ³ximos eventos

## SoluciÃ³n de Problemas

### "Alexa no encuentra dispositivos"

1. Verificar que la skill de Home Assistant estÃ¡ activada
2. Pedir a Alexa que "descubra dispositivos nuevos"
3. Verificar que los dispositivos estÃ¡n expuestos en Home Assistant
4. Reiniciar Home Assistant y Alexa

### "Alexa no entiende el nombre"

1. Usar nombres amigables simples en Home Assistant
2. Evitar nombres con caracteres especiales
3. Probar con el nombre exacto configurado

### "Respuesta lenta o sin respuesta"

1. Verificar que Home Assistant tiene acceso a internet
2. Si usas Nabu Casa, verificar el estado del servicio
3. Si es configuraciÃ³n manual, verificar HTTPS y firewall

## ConclusiÃ³n

Conectar Home Assistant con Alexa combina la potencia de la domÃ³tica local con la comodidad del control por voz. Nabu Casa (€6.50/mes) es la opciÃ³n mÃ¡s fÃ¡cil y fiable. Con esta configuraciÃ³n, puedes controlar cualquier dispositivo de tu casa con la voz, sin depender de ecosistemas cerrados.

**Lectura relacionada:**
- [Home Assistant: guÃ­a completa](/asistentes-hubs/home-assistant-guia-instalacion)
- [Alexa vs Google Home vs Siri](/asistentes-hubs/alexa-vs-google-home-siri)
- [Zigbee vs Z-Wave vs WiFi vs Thread](/asistentes-hubs/zigbee-vs-zwave-vs-wifi)
