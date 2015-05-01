---
title: "Kata Minitest: Rompiendo la parálisis inicial"
date: 2015-05-01 21:44 UTC
tags: ruby, dojo, kata
---

Algo que suele detener al comenzar algún proyecto, práctica o actividad es la parálisis inicial, esto es, de pensar en todas las cosas que tenemos que hacer, recordar o investigar antes de comenzar la actividad, nos quita la motivación de hacerlo y decidimos posponerlo.

Para evitar esto, sobre todo cuando queremos practicar una Kata con Minitest, pongo los siguientes códigos de ejemplo:

BREAK_ARTICLE

**Ejemplo de Minitest para versión menor a la 5**

<script src="https://gist.github.com/thotmx/fc7bb11da10a96dc5ddf.js"></script>

**Ejemplo de Minitest para versión 5**
<script src="https://gist.github.com/thotmx/3a77697c5aea8324df1e.js"></script>

Lo único que tenemos que hacer es copiar ese código, pegarlo (aunque lo más recomendable es escribirlo de nuevo, pero ya no hay que recordar ni pensar demasiado). Después ejecutar:

```
ruby nombre_archivo.rb
```

Y podemos ver nuestras prueba corriendo. Ahora sólo se comienza a tirar código...

¡Happy Testing!

**Nota:** El código de ejemplo no es el más correcto para las convenciones de Minitest, pero su objetivo es mostrar que cuando se usa **assert_equal** primero se pone el valor, y después el método a ejecutar.
