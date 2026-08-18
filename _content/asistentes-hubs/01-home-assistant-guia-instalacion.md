---
title: "Home Assistant 2026: Guía Completa de Instalación y Uso"
slug: /asistentes-hubs/home-assistant-guia-instalacion
keyword: "Home Assistant guía instalación"
volumen: 3600
kd: 22
intencion: guia
categoria: asistentes-hubs
fecha: 2026-08-18
description: "Guía completa de Home Assistant 2026: instalación, configuración, automatizaciones y control por voz. Desde cero hasta dominar tu domótica."
keywords: ["home assistant", "instalar home assistant", "domótica local", "hub inteligente"]
subcategoria: "hubs"
fechaActualizacion: "2026-08-18"
autor: "Equipo SmartHome"
imagen: null
imagenAlt: null
schema: "Article"
---

# Home Assistant 2026: Guía Completa de Instalación y Uso

Home Assistant es la plataforma de domótica de código abierto más potente del mundo. Con ella puedes controlar **cualquier dispositivo** de casa inteligente, independientemente de la marca o protocolo, desde una única interfaz. Es la herramienta que usan los entusiastas serios de la domótica.

## ¿Qué es Home Assistant?

Home Assistant es un software gratuito y de código abierto que actúa como **cerebro central** de tu casa inteligente. Recopila datos de todos tus dispositivos, los muestra en un panel de control y permite crear automatizaciones complejas.

**Qué puede hacer:**
- Conectar dispositivos Zigbee, Z-Wave, WiFi, Bluetooth, Matter, etc.
- Crear automatizaciones complejas (si X entonces Y)
- Mostrar dashboards personalizados
- Ejecutar en hardware dedicado (Raspberry Pi, mini PC)
- Funcionar 100% local (sin depender de la nube)

## Hardware Recomendado

### Opción 1: Home Assistant Green (principiantes)

**Precio:** €99.99

El Home Assistant Green es el dispositivo oficial "plug and play". Solo conectas el cable Ethernet y el de alimentación, y en 5 minutos tienes Home Assistant funcionando.

**Especificaciones:**
- Procesador: ARM Cortex-A55 quad-core
- RAM: 4 GB
- Almacenamiento: 32 GB eMMC
- Conectividad: Ethernet Gigabit, WiFi 6, Bluetooth 5.2
- Protocolos: Zigbee, Matter (via Thread)

**Ideal para:** Principiantes que quieren empezar sin complicaciones.

### Opción 2: Home Assistant Yellow (intermedios)

**Precio:** €124.99

El Yellow es más potente que el Green y permite añadir un disco SSD para mayor almacenamiento.

**Especificaciones:**
- Procesador: Amlogic S905X4 quad-core
- RAM: 4 GB (expandible a 8 GB)
- Almacenamiento: NVMe SSD (no incluido)
- Conectividad: Ethernet, WiFi 6, Bluetooth 5.2
- Slot M.2 para radio Zigbee/Thread

**Ideal para:** Usuarios que quieren expandir su sistema con almacenamiento y radios adicionales.

### Opción 3: Raspberry Pi 5 (DIY)

**Precio:** €60-€80 (solo placa) + €30-50 (accesorios)

El Raspberry Pi 5 sigue siendo una opción popular por su versatilidad. Necesitas añadir carcasa, alimentación, tarjeta SD/SSD y posiblemente un dongle Zigbee.

**Coste total:** €100-€150

**Ideal para:** Usuarios técnicos que ya tienen un Pi o quieren un proyecto DIY.

### Opción 4: Mini PC (avanzados)

Un mini PC (Intel N100 o similar) ofrece la máxima potencia. Puedes ejecutar Home Assistant junto con otros servicios (Plex, Docker, etc.).

**Coste:** €150-€300

## Paso a Paso: Instalación

### Método 1: Home Assistant OS (recomendado)

1. **Descargar** la imagen de Home Assistant OS para tu dispositivo desde [home-assistant.io](https://home-assistant.io)
2. **Grabar** la imagen en tarjeta SD o SSD usando Balena Etcher
3. **Insertar** la tarjeta en tu dispositivo
4. **Conectar** Ethernet y alimentación
5. **Esperar** 10-15 minutos a que se instale
6. **Acceder** desde el navegador: `http://homeassistant.local:8123`
7. **Crear** tu cuenta de administrador
8. **Completar** el asistente de configuración

### Método 2: Docker (avanzados)

Si ya tienes un servidor con Docker:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=America/New_York \
  -v /path/to/config:/config \
  -v /run/dbus:/run/dbus:ro \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

### Método 3: Supervised (intermedios)

Instalación completa con supervisor en Debian/Ubuntu. Requiere conocimientos de Linux.

## Configuración Inicial

### 1. Descubrir dispositivos

Home Assistant detecta automáticamente dispositivos en tu red:
- Philips Hue (via Bridge)
- TP-Link Tapo/Kasa
- IKEA Tradfri
- Eufy
- Y cientos más

Ve a **Settings > Devices & Services** para ver los dispositivos detectados.

### 2. Instalar integraciones

Para dispositivos que no se detectan automáticamente:

1. Ve a **Settings > Devices & Services > + Add Integration**
2. Busca la marca de tu dispositivo
3. Sigue las instrucciones de configuración

### 3. Configurar Zigbee/Matter

Si usas sensores Zigbee o Matter:

1. Conecta un dongle Zigbee (Sonoff Zigbee 3.0 USB Dongle Plus, €20)
2. Ve a **Settings > Devices & Services > + Add Integration**
3. Selecciona **"ZHA"** (Zigbee Home Automation)
4. Selecciona el dongle COM
5. Los dispositivos Zigbee se emparejan presionando su botón

## Crear tu Primer Dashboard

Un dashboard es el panel de control principal. Ve a **Overview** en el menú lateral para personalizar.

### Ejemplo de dashboard básico

```yaml
views:
  - title: Casa
    cards:
      - type: light
        entity: light.salón
      - type: thermostat
        entity: climate.termostato
      - type: camera
        entity: camera.entrada
      - type: sensor
        entity: sensor.temperatura_dormitorio
```

### Tarjetas útiles

- **Light:** Control de luces con interruptor y slider de brillo
- **Thermostat:** Control de climatización
- **Camera:** Feed de cámara en vivo
- **Sensor:** Temperatura, humedad, consumo
- **Media Player:** Control de música
- **Map:** Ubicación de dispositivos móviles

## Automatizaciones: El Corazón de Home Assistant

### Ejemplo 1: Luces al atardecer

```yaml
automation:
  - alias: "Luces al atardecer"
    trigger:
      - platform: sun
        event: sunset
        offset: "+00:00:00"
    action:
      - service: light.turn_on
        target:
          entity_id: light.todas_las_luces_exterior
        data:
          brightness_pct: 80
          color_temp_kelvin: 2700
```

### Ejemplo 2: Alerta de intrusión

```yaml
automation:
  - alias: "Intrusión detectada"
    trigger:
      - platform: state
        entity_id: binary_sensor.movimiento_jardin
        to: "on"
    condition:
      - condition: state
        entity_id: alarm_control_panel.alarma
        state: "armed_away"
    action:
      - service: siren.turn_on
        target:
          entity_id: siren.sirena
      - service: notify.mobile_app
        data:
          title: "ALERTA"
          message: "Movimiento detectado en el jardín"
          data:
            image: /local/captura.jpg
```

### Ejemplo 3: Bienvenida automática

```yaml
automation:
  - alias: "Bienvenida a casa"
    trigger:
      - platform: state
        entity_id: device_tracker.movil
        to: "home"
    action:
      - service: light.turn_on
        target:
          entity_id: light.pasillo
      - service: media_player.play_media
        target:
          entity_id: media_player.echo
        data:
          media_content_id: "bienvenida.mp3"
          media_content_type: music
```

## Control por Voz

### Alexa
1. Instalar la skill **"Home Assistant Cloud"** o configurar Nabu Casa
2. Los dispositivos se descubren automáticamente
3. Control por voz completo

### Google Home
1. Configurar **Home Assistant Cloud** o integración manual
2. Los dispositivos aparecen en Google Home
3. "Hey Google, enciende las luces del salón"

### Siri (HomeKit)
1. Usar la integración **HomeKit Bridge** en Home Assistant
2. Configurar accesorios a exponer
3. Control total desde iPhone/HomePod

## Consejos para Principiantes

1. **Empieza simple:** Una luz, un sensor, una automatización
2. **Documenta:** Crea notas con los nombres de tus dispositivos
3. **Usa grupos:** Agrupa luces por habitación
4. **Backups:** Configura backups automáticos (Settings > System > Backups)
5. **Comunidad:** El foro de Home Assistant es muy activo y helpful

## Conclusión

Home Assistant es la herramienta más potente del mundo para domótica. Con una curva de aprendizaje moderada, ofrece un control total que ninguna plataforma comercial puede igualar. La inversión en hardware (€99-€150) se amortiza rápidamente al no depender de suscripciones ni ecosistemas cerrados.

**Lectura relacionada:**
- [Zigbee vs Z-Wave vs WiFi vs Thread](/asistentes-hubs/zigbee-vs-zwave-vs-wifi)
- [Matter protocol explicado](/asistentes-hubs/matter-protocol-domotica)
- [Alexa vs Google Home vs Siri](/asistentes-hubs/alexa-vs-google-home-siri)
