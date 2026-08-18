---
title: "Sistema de Seguridad Casero DIY: Guía Completa Paso a Paso"
slug: /seguridad/sistema-seguridad-casero-diy
keyword: "sistema seguridad casero diy"
volumen: 480
kd: 14
intencion: guia
categoria: seguridad
fecha: 2026-08-18
description: "Aprende a montar un sistema de seguridad casero DIY sin cuotas mensuales. Presupuestos desde 200€ con Home Assistant, sensores y sirenas."
keywords: ["sistema seguridad casero", "alarma diy", "home assistant seguridad", "sensores hogar"]
subcategoria: "alarmas"
fechaActualizacion: "2026-08-18"
autor: "Equipo SmartHome"
imagen: null
imagenAlt: null
schema: "Article"
---

# Sistema de Seguridad Casero DIY: Guía Completa Paso a Paso

Montar un sistema de seguridad casero con componentes separados en lugar de una solución todo-en-uno (como ADT o Securitas) te da **control total** sobre la protección de tu hogar, **sin cuotas mensuales** y con la posibilidad de personalizar cada detalle. Un sistema DIY bien diseñado puede ser igual o más fiable que una alarma profesional.

Esta guía te enseña a diseñar, montar y configurar un sistema completo de seguridad casero desde cero, con presupuestos desde €200 hasta €1.000+.

## Por Qué un Sistema DIY

**Sistemas profesionales:**
- Instalación incluida
- Monitoreo 24/7 con centro de alarmas
- Coste: €15-€50/mes + €100-€300 instalación
- Contrato de 12-36 meses
- Dependencia del proveedor

**Sistemas DIY:**
- Tú lo montas
- Tú lo monitoreas (alertas en el móvil)
- Coste: solo el hardware (€200-€1.000)
- Sin contratos ni cuotas
- Control total sobre los datos

## Componentes de un Sistema Completo

### 1. Central (Hub)

La central es el cerebro del sistema. Recibe las señales de todos los sensores y ejecuta las acciones (alertas, sirenas, etc.).

**Opciones recomendadas:**

| Hub | Precio | Protocolos | Ventaja principal |
|---|---|---|---|
| **Home Assistant Yellow** | €124.99 | Zigbee, Z-Wave, Matter | Todo-local, sin nube |
| **Home Assistant Green** | €99.99 | Zigbee, Matter | Plug and play |
| **Aqara M2 Hub** | €59.99 | Zigbee | Barato, compatible HomeKit |
| **SmartThings Station** | €69.99 | Zigbee, Z-Wave, Matter | Ecosistema Samsung |
| **Hubitat Elevation** | €149.99 | Zigbee, Z-Wave | 100% local, robusto |

**Recomendación:** Para un sistema serio de seguridad, **Home Assistant** (Yellow o Green) es la mejor opción. Todo el procesamiento es local, no depende de la nube y tienes control absoluto sobre las automatizaciones.

### 2. Sensores de Movimiento (PIR)

Detectan movimiento en zonas específicas. Son la columna vertebral de cualquier sistema de alarma.

**Opciones:**

| Sensor | Precio | Protocolo | Batería |
|---|---|---|---|
| Aqara Motion Sensor P2 | €29.99 | Matter | CR2450 (2 años) |
| SONOFF SNZB-06P | €12.99 | Zigbee | CR2477 (3 años) |
| Aeotec MultiSensor 7 | €49.99 | Z-Wave | CR123A (3 años) |
| Ring Alarm Motion | €29.99 | Z-Wave | 3 años |

**Cantidad recomendada:** 1 por cada punto de entrada o habitación estratégica.

### 3. Sensores de Puerta/Ventana (Contact Sensors)

Detectan si una puerta o ventana se abre o cierran. Se colocan en cada punto de acceso.

**Opciones:**

| Sensor | Precio | Protocolo | Tamaño |
|---|---|---|---|
| Aqara Door Sensor P2 | €24.99 | Matter | Pequeño |
| SONOFF SNZB-04P | €10.99 | Zigbee | Muy pequeño |
| Aeotec Door/Window 7 | €29.99 | Z-Wave | Compacto |
| Third Reality Smart Sensor | €14.99 | Zigbee | Pequeño |

**Cantidad recomendada:** 1 por cada puerta exterior + ventanas de planta baja.

### 4. Sirena

La sirena es disuasoria y alerta a los vecinos. Debe ser lo suficientemente alta para que el intruso quiera irse.

**Opciones:**

| Sirena | Precio | Volumen | Notas |
|---|---|---|---|
| Aeotec Siren 6 | €49.99 | 105 dB | Z-Wave, 10 tonos |
| HOMEY Siren | €29.99 | 110 dB | Zigbee, batería |
| Sirena DIY (bocina WiFi) | €15.99 | 120 dB | WiFi, configurable |

**Recomendación:** Colocar la sirena en la entrada principal, visible pero fuera de alcance. Si el intruso ve la sirena, es más probable que huya.

### 5. Cámara Interior/Exterior (como complemento)

Las cámaras no son parte del sistema de alarma per se, pero complementan la seguridad.

- **Interior:** TP-Link Tapo C210 (€29.99) o Eufy Indoor 2K (€39.99)
- **Exterior:** Reolink Argus 3 Pro (€129.99)

### 6. Teclado de Control

Permite activar/desactivar la alarma con un código PIN sin necesitar el móvil.

| Teclado | Precio | Protocolo |
|---|---|---|
| Aqara Fingerprint + Keypad | €69.99 | Zigbee/Matter |
| Ring Alarm Keypad | €49.99 | Z-Wave |
| DIY con ESP32 | €10-15 | WiFi/Zigbee |

## Presupuestos por Nivel

### Presupuesto Básico (€200-€350)

| Componente | Cantidad | Precio |
|---|---|---|
| Home Assistant Green | 1 | €99.99 |
| SONOFF Motion Sensor | 3 | €38.97 |
| SONOFF Door Sensor | 5 | €54.95 |
| Sirena WiFi | 1 | €15.99 |
| **Total** | | **€209.90** |

Cubre: 1 entrada principal + 3 habitaciones + 5 puntos de acceso.

### Presupuesto Medio (€400-€600)

| Componente | Cantidad | Precio |
|---|---|---|
| Home Assistant Yellow | 1 | €124.99 |
| Aqara Motion Sensor P2 | 4 | €119.96 |
| Aqara Door Sensor P2 | 6 | €149.94 |
| Aeotec Siren 6 | 1 | €49.99 |
| Aqara Keypad | 1 | €69.99 |
| **Total** | | **€514.87** |

Cubre: Sistema completo con keypad, sirena profesional y sensores premium.

### Presupuesto Premium (€700-€1.000)

| Componente | Cantidad | Precio |
|---|---|---|
| Home Assistant Yellow | 1 | €124.99 |
| Aeotec MultiSensor 7 | 5 | €249.95 |
| Aeotec Door/Window 7 | 8 | €239.92 |
| Aeotec Siren 6 | 2 | €99.98 |
| Tapo C210 (cámaras) | 2 | €59.98 |
| **Total** | | **€774.82** |

Cubre: Casa grande con múltiples puntos de entrada, cámaras y redundancia.

## Configuración en Home Assistant

### Paso 1: Instalar Home Assistant

1. Descargar la imagen de Home Assistant para tu dispositivo
2. Grabar en tarjeta SD o SSD
3. Arrancar el dispositivo y acceder vía navegador
4. Completar el asistente de configuración

### Paso 2: Integrar sensores

1. Ir a **Settings > Devices & Services > Add Integration**
2. Seleccionar el protocolo de tus sensores (Zigbee, Matter, etc.)
3. Poner los sensores en modo de emparejamiento
4. Home Assistant los detectará automáticamente

### Paso 3: Crear la alarma

En Home Assistant, la alarma se configura con el componente `alarm_control_panel`:

```yaml
alarm_control_panel:
  - platform: manual
    name: Alarma Casa
    code: "1234"
    disarm_after_trigger: true
    trigger_time: "00:05:00"
```

### Paso 4: Crear automatizaciones

Ejemplo: Si se detecta movimiento en el jardín + una puerta abierta → activar sirena + enviar notificación:

```yaml
automation:
  - alias: "Alerta intrusión jardín"
    trigger:
      - platform: state
        entity_id: binary_sensor.movimiento_jardin
        to: "on"
    condition:
      - condition: state
        entity_id: alarm_control_panel.alarma_casa
        state: "armed_away"
    action:
      - service: siren.turn_on
        target:
          entity_id: siren.sirena_principal
      - service: notify.mobile_app
        data:
          message: "ALERTA: Movimiento detectado en el jardín"
```

### Paso 5: Notificaciones en el móvil

1. Instalar la app **Home Assistant Companion** (iOS/Android)
2. Configurar la integración de notificaciones
3. Crear automatizaciones con `notify.mobile_app_tu_dispositivo`

## Estrategia de Seguridad por Zonas

```
┌─────────────────────────────────────┐
│            EXTERIOR                  │
│  ┌─────────┐  ┌─────────┐          │
│  │ Sensor  │  │ Sensor  │          │
│  │ PIR     │  │ PIR     │          │
│  │ Jardín  │  │ Garaje  │          │
│  └────┬────┘  └────┬────┘          │
│       │            │                │
│  ═════╪════════════╪══════════════  │
│       │   PUERTA   │                │
│  ┌────┴────────────┴────┐           │
│  │  Sensor contacto     │           │
│  │  Cerradura intelig.  │           │
│  │  Teclado PIN         │           │
│  └──────────┬───────────┘           │
│             │                       │
│       ENTRADA PRINCIPAL             │
│                                     │
│  ┌─────────────────────┐            │
│  │  SENSOR PIR pasillo │            │
│  │  + SENSOR MOVIMIENTO│            │
│  └─────────┬───────────┘            │
│            │                        │
│  ┌─────────┴──────────────────┐     │
│  │  Cámaras interiores       │     │
│  │  (configurar alertas)     │     │
│  └────────────────────────────┘     │
└─────────────────────────────────────┘
```

## Mantenimiento del Sistema

- **Mensual:** Verificar baterías de todos los sensores
- **Trimestral:** Probar sirena y simular intrusión
- **Semestral:** Actualizar firmware de sensores y Home Assistant
- **Anual:** Revisar cobertura de sensores, reemplazar baterías

## Conclusión

Un sistema de seguridad casero DIY es la opción más inteligente para quien quiere protección real sin depender de empresas de seguridad ni pagar cuotas mensuales. Con €200-€500 puedes montar un sistema que rivaliza con soluciones profesionales de €3.000+.

Home Assistant como central ofrece la flexibilidad de crecer con el tiempo: añadir cámaras, cerraduras, sensores de agua, humo, etc., todo integrado en un solo sistema.

**Lectura relacionada:**
- [Cerraduras inteligentes para puerta principal](/seguridad/cerraduras-inteligentes-puerta-principal)
- [Alarmas inteligentes sin cuota mensual](/seguridad/alarmas-inteligentes-sin-cuota)
- [Home Assistant: guía completa de instalación](/asistentes-hubs/home-assistant-guia-instalacion)
