---
title: "Platica: Elm Un lenguaje delicioso para webapps"
date: 2017-09-12 11:16 UTC
tags: platica, comunidad
---

Hola, hoy les contare sobre “La platica de elm” que por cierto estuvo excelente, gracias a [@thotmx](https://github.com/thotmx).

### ¿Que es elm?

Elm es un lenguaje funcional que compila JavaScript. Compite con proyectos como React como una herramienta para crear sitios web y aplicaciones web.

### ¿Por qué un lenguaje funcional?

Segun la documentación dice que te olvides de las cosas extrañas que haz escuchado de esto y pienses que elm es:

* No hay errores de ejecución en la práctica. No nulo. No indefinido no es una función.
* Mensajes de error amigables que le ayudan a agregar funciones más rápidamente. (creanme muy amigables)
* Código bien diseñado que se mantiene bien arquitectado a medida que crece tu aplicación.
* Versión automática semántica automática para todos los paquetes de Elm.

Ninguna combinación de bibliotecas de JS puede darle esto, sin embargo, todo es gratis y fácil en Elm

### Requisitos
* Necesitas tener instalado [node](https://nodejs.org/es/download/), lo cual instala npm (es el manejador de paquetes por defecto para Node.js).
* Instalas elm, yo la instale hoy y me intalo la version ```elm@0.18.0``` con la cual trabajaremos.

~~~bash
# El tag -g es para instalarlo de forma global.

npm install -g elm
~~~

### Juega con elm

Algunos ejemplos de lo que puedes hacer con elm, tambien puedes encapsular funciones :P

~~~bash
# En terminal abre una consola interactiva.

$ elm-repl
> 1 / 2
0.5 : Float
> List.length [1,2,3,4]
4 : Int
> String.reverse "stressed"
"desserts" : String
> :exit

~~~

### Servidor de apps elm
~~~bash
# En terminal levanta un servidor para visualizar aplicaciones de elm, donde las devuelve compiladas y listas para probar.

$ elm-reactor
elm-reactor 0.18.0
Listening on http://localhost:8000
~~~

![elm-reactor](../images/2017/0912/elm-reactor.png "elm-reactor")

### Ejemplos

Escribe en un archivo con extensión elm, en mi caso.

~~~bash
-- vim oaxacarb.elm

import Html exposing (text)

main =
  text "Hello, World!"

~~~


### Más de elm

[Visita el gist de @thotmx](https://gist.github.com/thotmx/f0b0a1b5b97ccb4d8f301d482a366fb8/revisions), donde encontraras la platica paso a paso.

Comentamos como te fue...
