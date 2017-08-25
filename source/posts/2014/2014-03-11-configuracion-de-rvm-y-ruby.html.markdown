---
title: Configuración del entorno de trabajo Ruby con RVM
date: 2014-03-11 16:13 UTC
tags: rvm, ruby
---
Muchas veces, al trabajar con un lenguaje interpretado (como ruby o python) es necesario instalar varias librerías, pero siempre queda el miedo de romper algo con tanta instalación; es deseable poder tener múltiples configuraciones independientes, incluso por proyecto. Para eso tenemos [RVM](https://rvm.io/).

En palabras del autor, **Ruby Version Manager** (RVM) se puede describir de la siguiente manera:

> Una herramienta que permite fácilmente instalar, gestionar y trabajar con múltiples entornos ruby, desde versiones del intérprete hasta sets de gemas.

#### Instalación de RVM

Para instalar RVM en nuestro sistema **Linux**, hay que seguir los siguientes pasos:

Descargamos e instalamos RVM

``\curl -sSL https://get.rvm.io | bash``

Al final de la instalación, veremos un mensaje que nos pide copiar cierto contenido a nuestro archivo ``.bash_profile`` (archivo oculto ubicado en nuestro directorio home), seguimos la recomendación para obtener un archivo parecido a lo siguiente:

``. $HOME/.bashrc``

``[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"``

``source ~/.profile``

Luego, cargamos la nueva configuración de bash en nuestra sesión actual (o reiniciamos nuestra consola, lo que gusten)

``source ~/.bash_profile``

Listo, ya tenemos RVM instalado, lo podemos comprobar con el comando ``rvm -v``, lo que nos debe de mostrar la versión de RVM instalada en nuestro sistema.

#### Instalación de Ruby

Ya que tenemos instalado RVM, instalar Ruby es tan fácil como correr un comando, indicándole la versión deseada (recomendamos la *2.1.0*)

    rvm install ruby-2.1.0

Nos sentamos unos momentos a esperar a que termine la instalación...

#### Configuración de RVM por proyecto

RVM es lo suficientemente "inteligente" como para identificar las versiones que requerimos dentro de un proyecto, agrupando las librerias requeridas en **gemsets**, para ésto, requerimos tener un par de archivos dentro de nuestro directorio de trabajo: ``.ruby-version`` y ``.ruby-gemset`` (ambos archivos ocultos).

Para crear y configurar un nuevo directorio de proyecto, creamos los dos archivos mencionados anteriormente denotando la versión de ruby y el nombre del gemset deseado:

``mkdir proyecto && cd proyecto``

``echo '2.1.0' > .ruby-version``

``echo 'proyecto' > .ruby-gemset``

Esto creará un gemset llamado *proyecto* que utiliza la versión *2.1.0* de ruby, denotado como **ruby-2.1.0@proyecto**, ahora, cada que entremos al directorio ``proyecto``, RVM cargará automáticamente la configuración deseada, y todas las librerías (gemas) que instalemos en dicho proyecto quedarán aisladas en el mismo.

Si aún estamos dentro de nuestra carpeta *proyecto*, ejecutamos el comando ``cd .`` (punto):

``=> ruby-2.1.0 - #gemset created ruby-2.1.0@proyecto``

``=> ruby-2.1.0 - #generating proyecto wrappers.......``

Por último, comprobamos que todo se encuentre en orden, verificamos la versión de ruby en uso con el comando:

``rvm list``

``=* ruby-2.1.0 [ x86_64 ]``

Y el gemset cargado actualmente:

``rvm gemset list``

``=> proyecto``

Listo, ruby 2.1.0 instalado y gemset creado, estamos listos para trabajar.
