---

title: Editor markdown con vue.js
date: 2018-03-20
tags: [vuejs, javascript]

---

Regresando con el tema de Vue.js que vimos en un [post anterior](http://oaxacarb.org/posts/vuejs-primeros-pasos-en-vuejs.html) y como lo mencione ahi haremos un editor markdown.

* Aquí tenemos el [editor markdown](http://oaxacarb.org/markdown.html) funcionando.
* Aquí tenemos el [código](https://github.com/oaxacarb/markdown-editor), lo subi conforme explicó en el post.
* Usamos la [librería](https://github.com/markedjs/marked) para pasar el texto plano a markdown.


### Comenzamos
El editor se divide en tres partes, **Root, Editor, Preview**.

**Root** es la instancia de vue donde se *“aloja”* el componente Editor y dentro de Editor se *“aloja”* el componente Preview.

**Editor** es el **componente** donde se escribe en markdown. (Izquierda)

**Preview** es el **componente** donde **visualiza** lo escrito en markdown pero **transformado**. (Derecha)

### Plugin Vuejs
Puedes apoyarte de la [extensión](https://github.com/vuejs/vue-devtools) para visualizar los componentes y sus propiedades.

![editor](../../images/2018/0320/root.png)


###1. Estructura inicial

Creó la estructura inicial cargando la librería de vue.js


###2. Instancia de vue

La instancia es la llamada a Vue y hace referencia que es carga en el identificador *#app*

~~~ javascript
let app = new Vue({
    el: '#app',
})

~~~


###3. Creación del componente Editor

El componente **Editor** se encuentra en la variable **let Editor** y tiene a su disposición la propiedad **text** dentro de **data()** y su *html* declarado en **template**,

Por lo tanto lo que escribamos en el **textarea** se verá reflejado en la propiedad **text** y viceversa.

![editor](../../images/2018/0320/editor.png)


###4. Creación del componente Preview

El componente **Preview** se encuentra dentro del componente **Editor** a esto se le conoce como *componente hijo*, al igual que el componente **Editor** cuenta con su *html* declarado en **template**

El *componente hijo* se declara dentro del *componente padre*. Como podemos ver en el plugin de chrome Preview está dentro de Editor

![editor](../../images/2018/0320/preview.png)


###5. Agregar estilos css

Se encuentra en el **header** del archivo.

![editor](../../images/2018/0320/css.png)


###6. Props en componente Preview

Cada componente tiene su propio alcance **data**. Esto significa que no puede y no debería hacer referencia directa a los datos principales de un componente hijo, los datos se pueden pasar a los componentes hijos usando **props**

**v-bind** o **:** permite pasar **data** del componente padre al hijo y el componente hijo lo toma a través de **props**.

![editor](../../images/2018/0320/props.png)

~~~javascript
    // Los ":" es shortcut de v-bind:

    <preview v-bind:text="text"></preview>
    <preview :text="text"></preview>
~~~


###7. Computed property en componente Preview

*Computed property* reacciona al **cambio** de una propiedad, en nuestro caso es **text**, cuando a text se le asigna un **valor** nuevo, **markdownText** se lanza y ejecuta la función donde se encuentre dicha propiedad.

![editor](../../images/2018/0320/computed.png)


###8. Implementando marked

Implementamos marked y sucede algo inesperado

~~~javascript
computed: {
    markdownText() {
        return marked(this.text, { sanitize: true })
    }
}
~~~

En el componente **Preview** *imprime las etiquetas html*, esto sucede porque vuejs automáticamente **escapa** las **etiquetas html** cuando usamos la sintaxis **doble corchete** ```{{}}```

~~~html
 <div class="editor__preview">{{ markdownText }}</div>
~~~

~~~html
<p>Párrafo</p><p>#h1</p>
~~~

![editor](../../images/2018/0320/parrafo.png)

Para **solucionar** el escape de html vuejs cuenta con una etiqueta **v-html** la cual implementaremos.

~~~html
 <div class="editor__preview" v-html="markdownText"></div>
~~~

*Vuejs por ser reactivo a través de la etiqueta **v-model** es two data binding (el valor “viaja” en dos sentidos)*

* [Vuejs](https://vuejs.org/)
* [v-model](https://vuejs.org/v2/guide/forms.html#v-model-with-Components)
* [Props](https://vuejs.org/v2/guide/components.html#Props)
* [Computed property](https://vuejs.org/v2/guide/computed.html)
