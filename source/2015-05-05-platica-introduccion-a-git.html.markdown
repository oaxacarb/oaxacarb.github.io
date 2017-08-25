---
title: "Plática: Introducción a Git"
date: 2015-05-05 03:19 UTC
tags: platicas, comunidad
---

El día sábado 2 de Mayo de 2015, se llevó acabo la plática introductoria a [Git](http://git-scm.com/).
La cual, dio a conocer las ventajas de usarlo en los diferentes proyectos que se realizan día con día.

Con [Git](http://git-scm.com/) se puede llevar un mejor control en los proyectos, y más cuando el proyecto es realizado por varias
personas, porque [Git](http://git-scm.com/) lleva un registro de todos los cambios que se hacen y quiénes los hacen, y si por algún motivo se realizan cambios no deseados, estos cambios se pueden deshacer.

Ahora veamos como iniciar un proyecto con [Git](http://git-scm.com/) y algunos de los principales comandos.

Lo primero que debemos de hacer es crear una carpeta la cual sera el directorio para el proyecto,
posteriormente accedemos a ella.

![introducción-a-git](/images/2015/0505/crear-directorio.png)

Hasta estos momentos sería el directorio de un proyecto normal, Ahora con el comando **git init** le indicaremos que
usaremos git como controlador de versiones en este directorio.

![introducción-a-git](/images/2015/0505/git-init.png)

Si se ejecuta el comando **git status** (el cual indica el estado del directorio de trabajo), se observa que el directorio esta vacío.

![introducción-a-git](/images/2015/0505/git-status.png)

Ahora iniciamos el proyecto creando  un archivo **README**, el cual indica de qué trata el proyecto

![introducción-a-git](/images/2015/0505/archivo-readme.png)

Antes de continuar, hay algo que se debe tener en cuenta, al usar un controlador de versiones, en este caso **Git**, los archivos o directorios del proyecto
pueden ser catalogados en 3 estados,

1. **Working directory**
    (en el que actualmente se encuentra el archivo **README**)
2. **Staging area**
3. **Repository**

Ahora si volvemos a ejecutar el comando **git status** se observa que git ha detectado el archivo **README** el cual lo cataloga como **Untracked file**
porque aún no ha sido agregado ese cambio.

![introducción-a-git](/images/2015/0505/git-status2.png)

Git nos indica que debemos hacer uso del comando **git add**.
Ejecutamos **git add README** para agregar el cambio del proyecto, en este caso se ha creado el archivo **README**
y nuevamente ejecutamos el comando **git status** y se observa que **git** a detectado un nuevo archivo **README**
Ahora el archivo **README** se encuentra en el **Staging area**

![introducción-a-git](/images/2015/0505/git-add-readme.png)

Para pasar el cambio del **Staging area** al **repositorio** en este caso es un **repositorio local**
se necesita ejecutar el comando **git commit** con la opción **-m** se puede pasar un mensaje al ejecutar el comando el cual indica
cual ha sido el cambio en el proyecto.
Y nuevamente ejecutamos el comando **git status** y se observa que los cambios han sido guardados en el repositorio local,

![introducción-a-git](/images/2015/0505/git-commit.png)

Otro comando muy útil es **git log** el cual muestra los **commit** que se han ejecutado en todo el proyecto, mostrando el usuario y fecha en que se llevo acabo el commit. Por ahora solo tenemos uno, donde se guardó el cambio (la creación del archivo **README**).

![introducción-a-git](/images/2015/0505/git-log.png)

Ahora crearemos un archivo **prueba.rb** el cual solo mostrara un mensaje
y si hacemos **git status** se observa que git lo detecta como archivo **untracked file**
para guardar los cambios tenemos que ejecutar el comando anterior

1. **git add**

![introducción-a-git](/images/2015/0505/archivo-prueba.png)


![introducción-a-git](/images/2015/0505/git-add-prueba.png)

Ejecutamos **git status** y se observa que git lo detecta como un archivo nuevo

![introducción-a-git](/images/2015/0505/git-status3.png)


Actualmente el archivo **prueba.rb** se encuentra en el **Staging area** si queremos modificar el archivo **prueba.rb** por que nos falto agregar algo
y después guardarlo como un solo cambio. Se puede ejecutar **git reset prueba.rb** este comando quitará el archivo del **Staging area** y ahora su estado será **Working directory**.

Si ejecutamos **git status** se observa que git lo detecta como un **untracked file**

![introducción-a-git](/images/2015/0505/git-reset-prueba.png)


1. Editamos el archivo **prueba.rb**

![introducción-a-git](/images/2015/0505/editando-prueba.png)

2. Agregamos el cambio **git add prueba.rb** pasandolo al **Staging area**
3. Para guardar los cambio en el repositorio ejecutamos
    **git commit -m "Agregando archivo de prueba.rb"**
4. Ejecutamos **git status** y se observa que ya los cambios han sido guardados


![introducción-a-git](/images/2015/0505/git-commit-prueba.png)

También se puede observar que los cambios han sido guardados con ayuda del plugin [vim-airline](https://github.com/bling/vim-airline)
el cual muestra el nombre de la rama en este caso **master** y cuando hay cambios, uno se percata que aparece una **✗** y cuando los cambios han sido guardados aparece una **✓**

Ahora si ejecutamos **git log** se observa que aparecen dos commit, indicando los cambios, también se puede usar la opción **-p** la cual
da información más detallada con respecto a los cambios.

![introducción-a-git](/images/2015/0505/git-log-p.png)


![introducción-a-git](/images/2015/0505/git-log-p2.png)

Si editamos un archivo y queremos descartar los cambios, se puede ejecutar **git checkout "nombre del archivo"**, omitiendo las comillas,
esto siempre y cuando el archivo esté en **Working area**. Si ya se encuentra en **Staging area** debemos ejecutar el comando antes visto
**git reset "nombre del archivo"** y posteriormente **git checkout "nombre del archivo"**, veamos un ejemplo

1. Editar el archivo

![introducción-a-git](/images/2015/0505/editando-prueba2.png)

2. **git status** se observa que el archivo ha sido modificado
3. **git checkout prueba.rb** se borran los cambios hechos al archivo
4. **git status** se observa que ya no hay ningún cambio

![introducción-a-git](/images/2015/0505/git-checkout-prueba.png)

Esto fue una introducción a git, realmete faltan muchos comandos y como referencia pongo el libro [Git Pro](http://git-scm.com/book/en/v2) el cual se encuentra como documentación de git, que les ayudara a entender más a fondo  [Git](http://git-scm.com/)
