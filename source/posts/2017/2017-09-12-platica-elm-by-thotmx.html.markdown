---
title: "Platica: Elm Un lenguaje delicioso para webapps"
date: 2017-09-12 11:16 UTC
tags: platica, comunidad, elm
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

[Visita el gist de @thotmx](https://gist.github.com/thotmx/f0b0a1b5b97ccb4d8f301d482a366fb8/revisions), donde encontraras la plática paso a paso.

### Enlaces recomendados (escrito por @thotmx)
 
 * [Sitio oficial de Elm](http://elm-lang.org/) - Esta es la entrada al mundo de Elm. Un sitio con buenos recursos y excelente documentación. Puedes probar Elm directamente en un editor en la web.

 * [Tutorial de Elm](https://www.elm-tutorial.org/en/) - Un tutorial de Elm que aborda detalles de lenguaje y arquitectura. Muy fácil de seguir y muy explicativo.

 * [Elm in Action](https://www.manning.com/books/elm-in-action) - Libro sobre Elm escrito por un miembro relevante de la comunidad Elm.

 * [Elm, Building web apps](https://pragmaticstudio.com/courses/elm) - Curso de Pragmatic Studio, vale mucho la pena, es muy concreto, los videos son muy cortos pero abordan temas relevantes en cada video. El curso consta de 22 videos. También es recomendable revisar los recursos gratuitos de Pragmatic Studio relacionados con Elm.

 * [Phoenix with Elm](http://www.cultivatehq.com/posts/phoenix-elm-1/) - Un tutorial sumamente interesante de integración de Elm con Phoenix (Elixir). Nos lleva a construir una aplicación de reservación de asientos en un autobús. Aunque la versión de Elm que utiliza el tutorial es antigua, en mi [cuenta de github](https://github.com/thotmx) se puede encontrar un repositorio con el tutorial con la versión 0.18 de Elm.

Coméntanos como te fue...
