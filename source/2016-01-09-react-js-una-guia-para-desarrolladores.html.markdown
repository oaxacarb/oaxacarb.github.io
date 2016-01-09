---
title: React.js - Una guía para desarrolladores
date: 2016-01-09 19:05 UTC
tags: rails, react, frontend, javascript
published: false
---

_Este artículo es una traducción; la versión original se puede leer en [airpair](https://www.airpair.com/reactjs/posts/reactjs-a-guide-for-rails-developers)_.

## Introducción a React.js

React.js es el nuevo chico popular de la cuadra de los "Frameworks Javascript", y resalta por su simplicidad. Donde otros frameworks implementan un framework MVC completo, podríamos decir que React sólo implementa la V (de hecho, algunos reemplazan la V de su framework con React). Las aplicaciones React son construidas sobre dos principios importantes: Componentes y Estados. Los compomentes se pueden formar de otros componentes más pequeños, empotrados o personalizados; el Estado {dirige} lo que los chicos en Facebook llaman one-way reactive data flow, que significa que nuestro UI reaccionará a cada cambio de estado.

Una de las cosas buenas sobre React es que no requiere dependencias adicionales, por lo que puede trabajar prácticamente con cualquier otra biblioteca de JavaScript. Aprovechando esta característica, vamos a incluirlo en nuestro stack de Rails para construir una aplicación enfocada a frontend, o, como se podría decir, Rails con esteroides.

## Una aplicación {mock} de seguimiento de gastos

Para esta guía, vamos a construir una pequeña aplicación desde cero para hacer un seguimiento de nuestros gastos; cada registro consistirá en una fecha, un título y una cantidad. Un registro se tratará como crédito si su cantidad es mayor que cero, en caso contrario se tratará como débito. Aquí una maqueta del proyecto:


Resumiendo, la aplicación se comportará como sigue:

     Cuando el usuario cree un nuevo registro a través del formulario, éste se añadirá a la tabla de registros
     El usuario podrá editar {en línea} cualquier registro existente
     Al hacer clic en cualquier botón "Borrar" se eliminará el registro asociado de la tabla
     Al agregar, editar o eliminar un registro existente, se actualizarán las cantidades en la parte superior de la página

## Inicializando nuestro proyecto React.js en Rails

Primero lo primero: tenemos que crear nuestro nuevo proyecto Rails; le llamaremos Accounts:


Para la interfaz de usuario de este proyecto, vamos a usar Twitter Bootstrap. El proceso de instalación está fuera del alcance de este post, pero se puede instalar la gema oficial de bootstrap-sass siguiendo las instrucciones desde el repositorio oficial de GitHub.

Una vez que hayamos creado nuestro proyecto, se procede a incluir React. Para este post decidí incluirlo mediante la gema oficial react-rails porque vamos a aprovechar algunas características interesantes de la gema, pero hay otras formas, como Rails assests o incluso descargar el paquete desde la página oficial y pegarlo en nuestra carpeta de javascripts.

Si has desarrollado aplicaciones Rails antes, sabes lo fácil que es instalar una gema: Añade rails-react a tu Gemfile.


Entonces, hay que decirle (amablemente) a Rails que instale las nuevas gemas:
react-rails viene con un script de instalación, lo que creará un archivo components.js y un directorio de componentes bajo app/assests/javascripts donde vivirán nuestros componentes React.
Si ves el archivo `application.js` después de ejecutar el instalador, te darás cuenta de que hay tres nuevas líneas:

Básicamente, incluye la biblioteca de React, el archivo manifiesto de componentes y un archivo familiar que termina en ujs. Como ya habrás adivinado por el nombre del archivo, react-rails incluye un driver JavaScript no instrusivo que nos ayudará a montar nuestros componentes React y también se encargará de eventos Turbolinks.

## Creación del recurso

Vamos a construir un recurso Record, que incluirá una fecha, un título y una cantidad. En lugar de utilizar el generador de `scaffold`, vamos a utilizar el generador de `resource`, ya que no vamos a utilizar todos los archivos y métodos creados por el scaffold. Otra opción podría ser ejecutar el `scaffold` y luego eliminar los archivos/métodos no utilizados, pero nuestro proyecto podría quedar muy revuelto después de esto. Dentro de tu proyecto, ejecuta el siguiente comando:


Después de un poco de magia, terminamos con un nuevo modelo `Record`, con su controlador y rutas. Sólo tenemos que crear nuestra base de datos y ejecutar migraciones pendientes.


Como agrergado, puedes crear un par de registros desde la consola de Rails:


No se olvide de iniciar el servidor con `rails server`.

¡Listo! Estamos listos para escribir algo de código.

## Anidando componentes: Listado de registros {records}

Para nuestra primera tarea, tenemos que _renderear_ todos los registro existentes dentro de una tabla. Primero, tenemos que crear una acción `index` dentro de nuestro `RecordsController`:


Después, tenemos que crear un nuevo archivo `index.html.erb` en `apps/views/records/`, este archivo servirá como un puente entre nuestra aplicación Rails y nuestros componentes React. Para lograr esto, vamos a utilizar el método _helper_, `react_component`, que recibe el nombre del componente React que queramos _renderear_, junto con los datos que queremos pasar.



Vale la pena mencionar que este _helper_ es proporcionado por la gema `rails-react`, si decides utilizar otro tipo de integración con React, este _helper_ no estará disponible.

Ahora puede navegar hasta localhost:3000/records. Obviamente, esto todavía no va a funcionar, debido a la falta de un componente React `Records`, pero si vemos el HTML generado dentro de la ventana del navegador, podemos ver algo como el siguiente código


Cada componente requiere un método `render`, que será el encargado de _renderear_ el propio componente. El método `render` debe devolver una instancia de `ReactComponent`, de esta manera, cuando React ejecuta un _re-render_, se comportará de forma óptima (en cuando React detecte la existencia de nuevos nodos en la construcción de un DOM virtual en la memoria). En el fragmento anterior creamos una instancia de `h2`, un `ReactComponent` empotrado.

NOTA: Otra forma de crear una instancia `ReactComponents` dentro del método `render` es a través de la sintaxis JSX. El siguiente fragmento es equivalente al anterior:




Personalmente, cuando trabajo con CoffeeScript, prefiero usar la sintaxis React.DOM sobre JSX porque el código se estructura jerárquicamente por sí sólo, como en HAML. Por otro lado, si estás tratando de integrar React en una aplicación existente construida con erb, tienes la opción de reutilizar el código erb existente y convertirlo en JSX.

Ahora puedes refrescar tu navegador.



¡Perfecto! Hemos _rendereado_ nuestro primer componente React. Ahora, es tiempo de mostrar nuestros registros.

Además del método `render`, los componentes React hacen uso de `properties` para comunicarse con otros componentes y `states` para detectar si se requiere o no _re-renderear_. Necesitamos inicializar el estado y las propiedades de nuestro componente con los valores deseados:




El método `getDefaultProps` inicializa las propiedades de nuestros componentes en caso de que olvidemos enviar los datos al instanciarlos, y el método `getInitialState` genera el estado inicial de nuestro componente. Ahora tenemos que mostrar los registros provistos realmente por nuestra vista Rails.

Parece que vamos a necesitar un método _helper_ para formatear cadenas de cantidad. Podemos implementar un sencillo formateador de cadenas y hacerlo accesible para todos nuestros archivos `coffeescript`. Crea un nuevo archivo `utils.js.coffee` en `javascripts/` con el siguiente contenido:



Tenemos que crear un nuevo componente `Record` para mostrar cada registro individual. Crea un nuevo archivo `record.js.coffee` bajo el directorio `javascripts/components` e insertar el siguiente contenido:


El componente `Record` mostrará una fila que contiene las información de cada atributo del registro. No te preocupes por esos valores `null`s en las llamadas del `React.DOM.*`, significan que no estamos enviando atributos a los componentes. Ahora actualiza el método `render` dentro del componente `Records` con el siguiente código:



¿Viste qué pasó? Hemos creado una tabla con una fila como encabezado, y en el cuerpo de la tabla creamos un elemento `Record` por cada registro existente. En otras palabras, estamos anidando compomentes React ya existentes y personalizados. Bien, ¿cierto?

Cuando trabajamos con {contenido} dinámico (en este caso, registros), necesitamos proporcionar una propiedad `key` a los elementos generados dinámicamente para que React no tenga problemas al refrescar nuestra UI, es por eso que enviamos `key: record.id` junto con el propio registro al crear elementos `Record`. Si no hacemos esto, recibiremos un mensaje de advertencia en la consola JS del navegador (y probablemente algunos dolores de cabeza en un futuro cercano).



Puedes echar un vistazo al código resultante de esta sección aquí, o sólo los cambios introducidos por esta sección aquí.


## La comunicación padre-hijo: Creación de registros

Ahora que estamos mostrando todos los registros existentes, sería bueno incluir un formulario para crear nuevos registros. Agrerguemos esta nueva característica a nuestra aplicación React/Rails.

Primero, tenemos que añadir el método de `create` a nuestros controlador Rails (no te olvides de utilizar _strongparams_ ):



Luego, tenemos que construir un componente React para manejar la creación de nuevos registros. El componente tendrá su propio estado para almacenar la fecha, título y la cantidad. Crear un nuevo archivo `record_form.js.coffee` en `javascripts/components` con el siguiente código:


Nada pretencioso, sólo un sencillo formulario Bootrap _in line_. Observa cómo estamos definiendo el atributo `value` para _setear_ el valor de entrada y el atributo `onChange` para agrergar un método que será llamado cada que se presione una tecla; el método `handleChange` utilizará el atributo `nombre` para detectar qué entrada disparó el evento y actualizar el valor relacionado `state`:


Sólo stamos usando interpolación de cadenas para definir dinámicamente {los identificadores} de los objetos, equivalente a `@setState title: e.target.value` cuando `name` es igual a `title`. Pero, ¿por qué tenemos que utilizarset `@setState`? ¿Por qué no podemos simplemente _setear_ el valor deseado de `@state` como solemos hacer en objetos normales en JS? Porque `@setState` realizará 2 acciones:

    * Actualizar el estado del componente
    * Agendar de una verificación/repintado de la UI basado en el nuevo estado

Es muy importante tener en cuenta esta información cada vez que utilizamos `state` dentro de nuestros componentes.

Veamos el botón de enviar, justo al final del método `render`:


Definimos un atributo `disabled` con el valor de `!valid()`, Lo que significa que vamos a implementar un método `valid` para evaluar si los datos ingrersados por el usuario son correctos.


Por simplicidad sólo vamos a validar cadenas vacías para atributos `state`. De esta manera, cada vez que el estado se actualice, el botón "Crear registro" se activará/desactivará dependiendo de la validez de los datos.


Ahora que tenemos nuestro controlador y formulario en su lugar, es momento de _submitear_ nuestro nuevo registro al servidor. Tenemos que manejar el evento `submit` del formulario. Para lograr esto, tenemos que añadir un atributo `onSubmit` a nuestro formulario y un nuevo método `handleSubmit` (de la misma forma que manejamos los eventos `onChange` antes):

Revisemos el nuevo método línea por línea:

    * Evitar el submit HTTP del formulario
    * Hacer POST de la nueva información de `record` al URL actual
    * Callback de éxito

El _callback_ `success` es la clave de este proceso. Después de crear el nuevo registro exitosamente, _alguien_ será notificado sobre esta acción y `state` se restaura a su valor inicial. ¿Recuerdas cuando mencioné que los componentes se comunican con otros componentes a través de propiedades (`@props`)? Bueno, es esto. Nuestro componente actual envía datos al componente padre a través de `@props.handleNewRecord` apra notificar de la existencia de un nuevo registro.

Como ya habrán adivinado, donde quiera que creemos nuestro elemento `RecordForm`, tenemos que pasarle una propiedad `handleNewRecord` con la referencia de un método, algo así como `React.createElement RecordForm, handleNewRecord:addRecord`. Bueno, el componente padre `Records` es el "donde quiera". Dado que tiene un estado con todos los registros existentes, necesitamos actualizar su estado con el registro recién creado.

Añade el nuevo método `addRecord` dentro `records.js.coffee` y crea el nuevo elemento `RecordForm`, justo después `h2` (dentro del método `render`).



Refresca tu navegador, rellena el formulario con un nuevo registro, haz clic en "Crete record"... Sin suspenso esta vez, se añadió el registro casi de inmediato y el formulario se limpia después del _submit_. Refrezca de nuevo sólo para asegurarse que el servidor ha almacenado la nueva información.



Si has utilizado otros frameworks JS junto con Rails (por ejemplo, angularjs) para construir cosas similares, es posible que hayas tenido problemas porque sus peticiones POST no incluyen el token CSRF que Rails necesita, así que, ¿por qué no tuvimos el mismo problema? Fácil, porque estamos usando `jQuery` para interactuar con nuestro backend y el driver `jquery_ujs` de rails incluye automáticamente el token `CSRF` en cada petición AJAX por nosotros. ¡Bien!

Puedes revisar el código resultante de esta sección aquí, o sólo los cambios introducidos por esta sección aquí.



## Componentes reutilizables: Indicadores de Cantidad

¿Qué sería de una aplicación sin algunos (bonitos) indicadores? Añadamos algunas recuadros en la parte superior de la ventana con un poco de información útil. Nuestro objetivo de esta sección es mostrar tres valores: cantidad total de crédito, cantidad total de débito y el balance. Esto parece un trabajo para tres componentes, ¿o tal vez sólo uno con propiedades?

Podemos construir un nuevo componente `AmountBox` que recibirá tres propiedades: `amount`, `text` y `type`. Crea un nuevo archivo llamado `amount_box.js.coffee` en javascripts/componentes/ y pega el siguiente código:



Estamos usando elemento de panel de Bootrap para mostrar la información en forma de bloques, y _seteamos_ el color mediante la propiedad `type`. También hemos incluido un método muy simple para formatear la cantidad llamado `amountFormat` que lee la propiedad `amount` y la muestra en formato de moneda.

Para tener una solución completa, necesitamos crear este elemento (tres veces) dentro de nuestro componente principal, mandando las propiedades requeridas dependiendo de los datos que queremos mostrar. Construyamos primero los métodos para calcular. Abre el componente `Records` y añade los siguientes métodos:



`credits` suma todos los registros con una cantidad mayor a 0, `debits` suma todos los registros con una cantidad menor que 0 y balance no necesita explicación. Ahora que tenemos los métodos para hacer cálculos en su lugar, sólo tenemos que crear los elementos `AmountBox` dentro del método `render` (justo arriba del componente `RecordForm`):



Hemos terminado con esta funcionalidad! Refresca el navegador, deberías ver tres recuadros que muestran las cantidades que hemos calculado anteriormente. ¡Pero espera! ¡Hay más! Crea un nuevo registro y ve la magia...



Puedes ver el código resultante de esta sección aquí, o sólo los cambios introducidos por esta sección aquí.


## `setState`/`replaceState`: Eliminación de registros

La siguiente funcionalidad en nuestra lista es poder eliminar registros. Necesitamos una nueva columna `Actions` en nuestra tabla de registros, esta columna tendrá un botón "Delete" para cada registro, con una UI bastante estándar. Al igual que en el ejemplo anterior, tenemos que crear el método `destroy` en nuestro controlador Rails:


Ese es todo el código del lado del servidor que necesitaremos para esta funcionalidad. Ahora, abre tu componente React `Records` y añade la columna _Actions_ en la posición más a la derecha de la cabecera de la tabla:


Y, por último, abre el componente `Record` y añade una columna adicional con un link a _Delete_:


Guarde el archivo, refreca tu navegador y ... ¡Tenemos un botón inútil sin eventos asociados a él!



Añadamos funcionalidad. Como hemos aprendido de nuestro componente `RecordForm`, el camino a seguir es:

    Detectar un evento dentro del componente `Record` hijo (onClick)
    Realizar una acción (enviar una solicitud DELETE al servidor en este caso)
    Notificar al componente padre `Records` acerca de esta acción (envío/recepción de un método a través de _props_)
    Actualizar el estado del componente `Record`

Para implementar el paso 1, podemos agregar un manejador para `onClick` a `Registro` de la misma manera que añadimos un manejador para `onSubmit` a `RecordForm` para crear nuevos registros. Afortunadamente para nosotros, React implementa la mayoría de los eventos de navegadores comunes de una forma normalizada, por lo que no tenemos que preocuparnos por la compatibilidad entre navegadores (puedes vera la lista de eventos completos aquí).

Re-abre el componente `Record`, añade un nuevo método `handleDelete` y un atributo `onClick` a nuestro botón "inútil", como se ve a continuación:


Cuando el botón de borrado recibe el clic, `handleDelete` envía una petición AJAX al servidor para borrar el registro en el _backend_ y, después de esto, se notifica al componente padre de esta acción a través del manejador `handleDeleteRecord` disponibles a mediante _props_. Esto significa que tenemos que ajustar el creación de elementos `Record` en el componente padre para incluir la propiedad extra `handleDeleteRecord`, y también implementar el método para manejar, en el padre:


Básicamente, nuestro método `deleteRecord` copia el estado del compmente `records` actual, realiza una búsqueda del registro que desea borrar, {splices it from the array} y actualiza el estado del componente, operaciones estándar de JavaScript.

Hemos introducido una nueva forma de interactuar con el Estado, `replaceState`; la principal diferencia entre `setstate` y `replaceState` es que el primero sólo actualizará {un atributo} del objeto _state_, el segundo sobreescribe completamente el estado actual del componente con cualquier nuevo objeto que le enviamos.

Después de la actualización de esta última pieza de código, refrescamos la ventana del navegador y tratamos de eliminar un registro. Deben de suceder un par de cosas:

    * Los registros deben desaparecer de la tabla y ...
    * Los indicadores deben actualizar las cantidades de inmediato, no se requiere ningún código adicional


Casi terminamos con nuestra aplicación, pero antes implementar nuestra última funcionalidad, podemos aplicar un pequeño refactor y, al mismo tiempo, introducir una nueva funcionaldad de React.

Puedes ver el código resultante de esta sección aquí, o sólo los cambios introducidos por esta sección aquí.


# Refactor: _Helpers_ de estado

Hasta aquí, tenemos un par de métodos donde el estado se actualiza sin dificultad dado que nuestros datos no son precisamente "complejos", pero imagina una aplicación más compleja con un estado JSON multi-nivel. Puedes imaginarte realizando copias profundas y malabares con tus datos de estado. React incluye algunos bonitos _helpers_ para el estado que ayudan con parte del trabajo pesado, sin importar qué tan profundo es el estado, estos _helpers_ te permitirán manipularlo con más libertad utilizando un lenguaje de consulta de tipo de de MongoDB (o al menos eso es de lo que dice la documentación de React).

Antes de utilizar estos _helpers_, primero tenemos que configurar nuestra aplicación Rails para incluirlos. Abre el archivo de configuración `appication.rb` de tu proyecto y añade `config.react.addons = true` en la parte inferior del bloque `Aplicación`:

          

Para que los cambios surtan efecto, reinicia el servidor de Rails. Repito, *reinicia el servidor de Rails*. Ahora tenemos acceso a los _helpers_ de estado mediante `React.addons.update`, que procesará nuestro objeto de estado (o cualquier otro objeto que enviamos a él) y aplicará los comandos proporcionados. Los dos comandos que usaremos son `$push` y `$splice` (tomo prestada la explicación de estos comandos de la documentación oficial de Rails):

    * {$push: array} push() all the items in array on the target.
    * {$splice: array of arrays} for each item in arrays call splice() on the target with the parameters provided by the item.


Estamos a punto de simplificar `addRecord` y `deleteRecord` del componente `Record` usando estos _helpers_, como sigue:


Más corto, más elegante y con los mismos resultados. Puedes refrescar el navegador y asegurarte que nada se rompió.

Puedes ver el código resultante de esta sección aquí, o sólo los cambios introducidos por esta sección aquí.


# Flujo reactivo de datos: Edición de registros

Para la funcionalidad final, añadiremos un botón extra de edición, al lado del botón Borrar en nuestra tabla de registros. Cuando se haga clic en este botón Editar, se cambiará toda la fila de un estado de sólo lectura a un estado editable, mostrando un formulario en línea en el que el usuario pueda actualizar el contenido del registro. Después de enviar el contenido actualizado o cancelar la acción, la fila del registro volverá a su estado inicial de sólo lectura.

Como ya habrán adivinado por el párrafo anterior, tenemos que manejar datos mutables para alternar el estado de cada registro dentro de nuestro componente `Record`. Este es un caso de uso de lo que React llama _flujo reactivo de datos_. Añadamos una bandera de edición y un método `handleToggle` a `record.js.coffee`:


La bandera `edit` por defecto a `false` y `handleToggle` cambiará `edit` de falso a verdadero y viceversa, sólo tenemos que disparar `handleToggle` de un evento `onClick` del usuario.

Ahora, tenemos que manejar dos versiones de filas (de formulario y de sólo lectura) y mostrarlas de forma condicional dependiendo de `edit`. Por suerte para nosotros, siempre y cuando nuestro método `render` devuelva un elemento React, podemos llevar a cabo cualquier acción en él; podemos definir un par de métodos auxiliares `recordRow` y `recordForm` y llamarlos condicionalmente dentro de `render` en función del contenido de `@state.edit`.

Ya tenemos una primera versión de `recordRow`, es nuestro método `render` actual. Pasemos el contenido de `render` a nuestro nuevo método `recordRow` y añadamos algo de código adicional:



Sólo agregamos un elemento `React.DOM.a` adicional que escucha eventos `onClick` para llamar `handleToggle`.

En el futuro, la implementación de `recordForm` tendría una estructura similar, pero con campos de entrada en cada celda. Utilicemos un nuevo atributo `ref` para hacer accesibles nuestras entradas. Ya que este componente no maneja un estado, este nuevo atributo permitirá que nuestro componente lea los datos provistos por el usuario por medio de `@refs`:
          

No tengas miedo, este método puede parecer grande, pero es sólo nuestra sintaxis tipo HAML. Nota que llamamos a `@handleEdit` cuando el usuario hace clic en el botón "Update". Utilicemos un flujo similar a la implementación para eliminar registros.

¿Notas algo diferente en cómo se están creando `React.DOM.inputs`? Estamos utilizando `defaultValue` en lugar de `value` para asignar los valores de entrada iniciales, esto es porque el usar `valule` sin `onChange` acabará creando entradas de sólo lectura.

Por último, el método `render` se reduce al siguiente código:
          

Puedes refescar tu navegador para jugar con el nuevo comportamiento, pero no presentará ningún cambio todavía ya que no hemos implementado la funcionalidad real.

Para manejar las actualizaciones de registros, tenemos que añadir el método `update` a nuestro controlador Rails:

          

De regreso a nuestro componente `Record`, tenemos que implementar el método `handleEdit` que enviará una petición AJAX al servidor con la información actualizada de `record`, después notificará al componente padre enviando de la versión actualizada del registro a través del método `handleEditRecord`, este método se recibirá a través de `@props`, de la misma manera que lo hicimos antes, al eliminar de registros:

          

Para simplificar, no vamos a validar los datos del usuario, sólo los leeremos por medio de `React.findDOMNode(@refs.fieldName).value` y los enviaremos tal cual al backend. Actualizar el estado para cambiar al modo de edición en `success` no es obligatorio, pero el usuario nos lo agradecerá.

Por último, pero no menos importante, sólo tenemos que actualizar el estado del componente `Records` para sobrescribir el registro anterior con la nueva versión del registro hijo y dejar que React realice su magia. La aplicación podría verse así:


Como hemos aprendido en la sección anterior, usar `React.addons.update` para cambiar nuestro estado podría resultar en métodos más concretos. El enlace final entre `Records` y `Record` es el método `updateRecord` enviado a través de la propiedad `handleEditRecord`.

Refresca el navegador por última vez y trata de actualizar algunos registros existentes, observa cómo las recuadros de cantidad en la parte superior de la página mantienen un seguimiento de cada cambio en los registros.


¡Hemos terminado! Sonrie, ¡acabamos de construir una pequeña aplicación Rails + React desde cero!

Puedes ver el código resultante de esta sección aquí, o sólo los cambios introducidos por esta sección aquí.

# Comentarios finales: React.js simplicidad y flexibilidad

Hemos examinado algunas de las funcionalidades de React y hemos aprendido que apenas si introduce nuevos conceptos. He escuchado comentarios de gente diciendo X o Y marco JavaScript tiene una curva de aprendizaje empinada debido a todos los nuevos conceptos que introduce, pero no es el caso React, que implementa conceptos básicos de JavaScript, como controladores de eventos y {bindings}, por lo que es fácil de adoptar y aprender. Una vez más, uno de sus puntos fuertes es su sencillez.

También aprendimos cómo integrarlo en el pipeline de Rails y lo bien que se entiende con CoffeeScript, jQuery, Turbolinks, y el resto de la orquesta Rails. Pero esta no es la única forma de lograr los resultados deseados. Por ejemplo, si no usas Turbolinks (por lo tanto, no es necesario `react_ujs`) puedes utilizar assets en lugar de la gema rails-react; podrías utilizar JBuilder para construir respuestas JSON más complejas en lugar de la prestación de los objetos JSON, y cosas por el estilo, y seguir obteniendo los mismos maravillosos resultados.

React definitivamente aumentará tus habilidades de frontend, lo que la hace una gran biblioteca para tener entre tus herramientas Rails.
