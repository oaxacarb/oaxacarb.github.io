---
title: Como subir un Post
date: 2014-04-16 16:11 UTC
tags:
---
Para subir un post es muy sencillo solo debes seguir los siguientes pasos y asi aportar conocimiento a la comunidad Ruby de Oaxaca

El primer paso es crear un cuenta [Github](https://github.com) si esque aun no la tienen.

Si acabas de crear la cuenta de **Github** debes crear tus llaves [SSH](https://help.github.com/articles/generating-ssh-keys).

Mandar un correo con tu nombre de usuario de **Github** al correo **oaxacarb@gmail.com** y esperar el correo de confirmacion de que te has unido al grupo. 

#### Clonar el proyecto

**En terminal** 

Clona el proyecto

``git clone git@github.com:oaxacarb/oaxacarb.github.io.git``

Entras a la carpeta de tu proyecto

``cd oaxacarb.github.io``

Cambiate a la rama Source

``git checkout source``

> La rama source es donde se subira el codigo para que este pueda ser deployado a el servidor.

#### Crear el articulo

Para crear el articulo desde terminal puedes chacer

``middleman article "nombre de tu articulo"``

> Este comando creara un archivo con una estampa de tiempo para que empieces a trabajar sobre el, tendra el siguiente formato. Ejemplo de este Post "2014-03-04-como-subir-un-post.html.markdown"

Dentro de tu IDE favorito puedes editar el contenido del articulo con sintaxis [Markdown](http://daringfireball.net/projects/markdown/syntax)

Puedes ver tus cambios reflejados antes de subirlos dentro de tu localhost en el puerto 4567 con el comando

``middleman server``

Ya que tu articulo esta listo, debes subir tus cambios al repositorio de **Github** para posteriormente subirlo al servidor.

Agregar tus cambios al commit que se va subir a Github

``git add . -A``

Agregar el comentario al commit

``git commit -m "comentario"``

Subir los cambios a github

``git push origin source`` 

> Es importante que el push se haga hacia source porque ahi es donde se tendra el codigo

Finalmente hacer subirlo a servidor

``middleman deploy``

Nota: Las veces posteriores que subas un Post debes descargar las actualizaciones que tenga el proyecto, que algun otro miembro de la comunidad haya subido un post, cambios de diseño, etc., con el siguiente comando

``git pull`` 
