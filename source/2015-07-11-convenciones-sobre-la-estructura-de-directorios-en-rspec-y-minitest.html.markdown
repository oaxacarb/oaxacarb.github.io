---
title: Convenciones sobre la estructura de directorios en RSpec y Minitest
date: 2015-07-11 15:31 UTC
tags: [ruby, rspec, minitest]
---

Al crear un nuevo proyecto en Ruby, la estructura básica es poner el código en un directorio llamado `lib`. Además, podemos agregar un directorio `test` o `spec` para nuestros archivos de prueba. No es obligatorio, pero es una convención que deberíamos seguir, no solo porque nuestra estructura de directorios será más intuitiva, sino también porque algunos frameworks de testing así lo asumen.

Si queremos usar Rspec, el directorio se debe llamar `spec`. Si queremos usar Minitest, podemos nombrarlo de cualquier forma, pero es común nombrarlo `test` o también `spec`.

## RSpec

Veamos un ejemplo básico con RSpec.

Estructura de directorios:

~~~
fizz_buzz_rspec
├── lib
│   └── fizz_buzz.rb
└── spec
    └── fizz_buzz_spec.rb
~~~

El contenido de los archivos:

~~~ruby
#spec/fizz_buzz_spec.rb
require 'fizz_buzz'

describe FizzBuzz do
  it 'returns "1" when receives 1' do
    expect(FizzBuzz.new.convert(1).to eq '1'
  end
end

#lib/fizz_buzz.rb
class FizzBuzz
  def convert(n)
    '1'
  end
end
~~~

Es sólo la primera prueba para un proyecto fizz buzz.

Ahora, simplemente podemos ejecutar `rspec`:

~~~
[fizz_buzz_rspec]$ rspec
.

Finished in 0.00151 seconds (files took 0.1615 seconds to load)
1 example, 0 failures
~~~

Estoy empezando con una prueba en verde porque el resultado no es tan verboso como si la prueba fallara, pero ya sabemos que debemos empezar una prueba en rojo, ¿cierto? ¿Cierto? :)

Como vemos, no necesitamos ninguna configuración extra. En nuestro archivo `fizz_buzz_spec` requerimos el archivo `fizz_buzz` y nada más. De hecho, no necesitamos requerir la biblioteca `rspec` y no necesitamos especificar dónde están nuestros archivos de prueba. Simplemente ejecutamos el comando `rspec` desde la línea de comandos dentro de nuestro proyecto y Rspec se encargó del resto.

¿Qué hubiera pasado si nuestro directorio `spec` fuera nombrado de manera distinta? Digamos

~~~
fizz_buzz_rspec
├── lib
│   └── fizz_buzz.rb
└── my_testing_directory
    └── fizz_buzz_spec.rb
~~~

Bien, en test caso, si ejecutamos el comando `rspec`, no se encontrará ninguna prueba para ejecutar.

~~~
[fizz_buzz_rspec]$ rspec
No examples found.


Finished in 0.00031 seconds (files took 0.07711 seconds to load)
0 examples, 0 failures
~~~

Debemos ejecutar el comando indicando el directorio.

~~~
[fizz_buzz_rspec]$ rspec my_testing_directory
.

Finished in 0.00151 seconds (files took 0.1615 seconds to load)
1 example, 0 failures
~~~

Además, es importante seguir la convención de nombres del archivo spec. RSpec espera que todos los archivos de pruebas termien con `_spec`. En nuestro caso, `fizz_buzz_spec.rb`. Si lo renombramos, RSpec no lo ejecutará. Veamos:

~~~
fizz_buzz_rspec
├── lib
│   └── fizz_buzz.rb
└── spec
    └── fizz_buzz_testing_file.rb
~~~

Intentemos ejecutar:

~~~
[fizz_buzz_rspec]$ rspec
No examples found.


Finished in 0.00031 seconds (files took 0.07711 seconds to load)
0 examples, 0 failures
~~~

De nuevo, RSpec no cargó nuestro archivo porque no sigue la convención de nombrado. Si lo renombramos de nuevo `fizz_buzz_spec.rb`, funcionará.

Si observamos el archivo de pruebas, podemos ver que no necesitamos ninguna configuración especial para cargar el archivo `fizz_buzz.rb`, además de requerirlo claro está. RSpec asume que nuestro código está en el directorio `lib` y por eso es que puede carglo correctamente. Intentemos renombrar el directorio `lib` y veamos qué pasa.

~~~
fizz_buzz_rspec
├── main
│   └── fizz_buzz.rb
└── spec
    └── fizz_buzz_spec.rb
~~~

Si tratamos de ejecutar `rspec`.

~~~
[fizz_buzz_rspec]$ rspec
[...]core_ext/kernel_require.rb:54:in `require': cannot load such file -- fizz_buzz (LoadError)
...
[...]spec/fizz_buzz_spec.rb:1:in `<top (required)>'
...
~~~

Falla por el `require` (la primera línea del archivo de pruebas). No encuentra un archivo `fizz_buzz.rb`, que presupone en el directorio `lib` (que nosotros acabamos de renombrar). Así que, lo renombramos de nuevo `lib` y todo funciona de nuevo.

Como podemos ver, es mejor apegargse a las convenciones cuando usamos RSpec.

### `spec_helper`

Es común usar un archivo `spec_helper`. Cuando nuestro proyecto crece, necesitamos incluir más bibliotecas de pruebas, o agregar más tareas para hacer antes o después de ejecutar la prueba. Por ejemplo, podríamos querer incluir `shoulda`, o limpiar la base de datos. Estas tareas afectan muchos archivos de pruebas, así que, es mejor tenerlas en su propio archivo e incluirlo en los otros archivos. Nuestro ejemplo no necesita nada más, pero quiero mostrar cómo sería si lo necesitase.

Digamos que queremos usar la gema `rspec-given`. Después de instarlar, necesitamos agregar esta línea al archivo `fizz_buzz_spec.rb`:

~~~ruby
#spec/fizz_buzz_spec.rb
require 'rspec/given'
~~~

En nuestro proyecto sólo tenemos un archivo, pero si tuviéramos más, tendríamos que agregar esta línea a cada archivo de pruebas. Para evitar eso, podemos unar un `spec_helper`.

Primero necesitamos crear un archivo `spec_helper.rb` en nuestro directorio `spec`.

~~~
fizz_buzz_rspec
├── lib
│   └── fizz_buzz.rb
└── spec
    ├── fizz_buzz_spec.rb
    └── spec_helper.rb
~~~

Ahora necesitamos cambiar el archivo de pruebas.

~~~ruby
#spec/fizz_buzz_spec.rb
require 'spec_helper'
require 'fizz_buzz'

describe FizzBuzz do
  Given(:fizz_buzz) { FizzBuzz.new }
  When(:result) { fizz_buzz.convert(1) }
  Then { result == '1' }
end
~~~

Si lo ejecutamos ahora, se ejecuta correctamente. No importa dónde está nuestro archivo de pruebas (por ejemplo, podría estar en `spec/models/inbox/fizz_buzz_spec.rb`), siempre podrá requerir el archivo `spec_helper` con `require 'spec_helper'`.

En proyectos más grandes, la ventaja de un archivo `spec_helper` es más notorio. Veamos un archivo `spec_helper` de Rails, sólo como ejemplo:

~~~ruby
#rails_project/spec/spec_helper.rb
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'shoulda-matchers'
require 'rspec/autorun'

RSpec.configure do |config|
  config.use_transactional_fixtures = true
  config.order = "random"
end
~~~

Carga todas las bibliotecas que necesita para trabajar y configura RSpec para usar _fixtures_ transaccionales y ejecutar las pruebas en orden aleatorio.

Nota que en esta ocasión, `spec_helper` es sólo un archivo más, puede ser nombrado de diferente manera y seguirá funcionando siempre y cuando sea requerido con el nombre correcto.

## Minitest

Minitest nos permite nombrar nuestros directorios de la forma que queramos, pero necesitamos tenerlo en cuenta porque es importante cuando ejecutemos nuestras pruebas.

Sólo para seguir las convenciones, creé el proyecto con una estructura muy similar a la de RSpec.

~~~
fizz_buzz_minitest
├── lib
│   └── fizz_buzz.rb
└── test
    └── fizz_buzz_test.rb
~~~

El contenido de los archivos:

~~~ruby
#test/fizz_buzz_test.rb
require 'minitest/autorun'
require 'fizz_buzz'

describe FizzBuzz do
  it 'returns "1" when receives 1' do
    assert '1', FizzBuzz.new.convert(1)
  end
end

#lib/fizz_buzz.rb
class FizzBuzz
  def convert(n)
    '1'
  end
end
~~~

Lo primero que me gustaría señalar es que en Minitest es obligatorio requerir la bibilioteca Minitest, específicamente `minitest/autorun`, que provee de todo lo que necesitamos para ejecutar la prueba (por ejemplo, los métodos de aserciones y la capacidad de que el archivo se ejecute automáticamente). Nota que estoy usando la sintaxis _spec_ aquí, pero también es posible usar la clásica sintaxis de minitest. Puedes ver un poco de las bases en el post de la [Kata Minitest: Rompiendo la parálisis inicial](/2015/05/01/kata-minitest-rompiendo-la-paralisis-inicial.html).

Ahora, tristemente, no tenemos un comando `minitest` para ejecutar, como lo teníamos con RSpec. Minitest is un framework de pruebas muy básico (pero muy poderoso). Una de sus fortalezas es que que no es un DSL como RSpec, sino Ruby puro (aunque por la sintaxis que estamos usando nostros, sí hacemos uso de un DSL). De cualquier forma, para ejecutar nuestras pruebas, solo necesitamos ejecutar Ruby.

~~~
[fizz_buzz_minitest]$ ruby test/fizz_buzz_test.rb
[...]core_ext/kernel_require.rb:54:in `require': cannot load such file -- fizz_buzz (LoadError)
...
        from test/fizz_buzz_test.rb:1:in `<main>'
~~~

Humm, al parecer, sí ejecutó algo, pero no funcionó correctamente. Lo que pasó aquí es que no fue posible cargar el archivo `fizz_buzz`. Afortunadamente, es algo fácil de solucionar. Ruby incluye `require_relative` para requerir un archivo especificando una ruta relativa. Esta ruta debe ser construida con base en la ruta del archivo actual. En nuestro caso, nuestro archivo de pruebas está dentro de un directorio `test`, así que tenemos que indicar que nos moveremos un directorio atrás (esto se hace con dos puntos `..`) para llegar al directorio base del proyecto y entonces agregar la ruta al archivo requerido.

Nuestro archivo de prueba ahora se ve de esta manera:

~~~ruby
#test/fizz_buzz_test.rb
require 'minitest/autorun'
require_relative '../lib/fizz_buzz'

describe FizzBuzz do
  it 'returns "1" when receives 1' do
    assert '1', FizzBuzz.new.convert(1)
  end
end
~~~

Podemos ejecutar nuestras pruebas de nuevo.

~~~
[fizz_buzz_minitest]$ ruby test/fizz_buzz_test.rb
Run options: --seed 21470

# Running:

.

Finished in 0.000718s, 1393.3787 runs/s, 1393.3787 assertions/s.

1 runs, 1 assertions, 0 failures, 0 errors, 0 skips
~~~

Ahora funciona. Nota que el comando se debe ejecutar desde el directorio base del proyecto, no desde `lib` o `test`.

Sin embargo, hay un pequeño problema con esta aproximación. Si reordenamos la estructura de directorios, ya sea `test` o `lib`, necesitaremos cambiar también las rutas relativas que hayamos utilizado. Por ejemplo:

~~~
fizz_buzz_minitest
├── lib
│   └── models
│       └── fizz_buzz.rb
└── test
    └── models
        └── fizz_buzz_test.rb
~~~

Entonces necesitamos cambiar la ruta relativa a:

~~~ruby
require_relative '../../lib/models/fizz_buzz'
~~~

En nuestro ejemplo, tenemos sólo un archivo, pero en un proyecto real, esto sería un gran problema.

Afortunadamente, tenemos una alternativa. Podemos ejecutar nuestra archivo de pruebas especificando en la línea de comandos dónde debe Ruby buscar los archivos requeridos. Es decir, desde la línea de comandos podemos indicar que directorios deben ser precargados. Con nuestra estructua inicial, podemos ejecutar la prueba de esta manera:

~~~
[fizz_buzz_minitest]$ ruby -I lib test/fizz_buzz_test.rb
Run options: --seed 2633

# Running:

.

Finished in 0.000820s, 1220.1178 runs/s, 1220.1178 assertions/s.

1 runs, 1 assertions, 0 failures, 0 errors, 0 skips
~~~

Usamos la opción `-I`, indicando que Ruby debe cargar de inicio el directorio `lib`.

Nota que con minitest, no importa cómo se nombran los directorios, simplemente funciona. Ejemplo:

~~~
fizz_buzz_minitest
├── my_own_directory
│   └── fizz_buzz.rb
└── my_testing_directory
    └── fizz_buzz_test.rb
~~~

Ejecutamos la prueba:

~~~
[fizz_buzz_minitest]$ ruby -I my_own_directory test/fizz_buzz_testing_file.rb
Run options: --seed 31542

# Running:

.

Finished in 0.000719s, 1389.9584 runs/s, 1389.9584 assertions/s.

1 runs, 1 assertions, 0 failures, 0 errors, 0 skips
~~~

Todo funciona. Esto es porque no estamos ejecutando el conjunto completo de pruebas, como lo hacemos con RSpec. En este aso, estamos sólo ejecutando un archivo y especificamos qué directorio debe ser cargado.

### `test_helper`

De la misma manera que usamos un archivo `spec_helper`, podemos usar un `test_helper` en minitest. Nota que el nombre del archivo no importa, pero `test_helper` es un nombre ampliamente usado cuando se trabaja con minitest.

Podemos crear un archivo `test_helper.rb` en nuestro directorio `test`.

~~~
fizz_buzz_minitest
├── lib
│   └── fizz_buzz.rb
└── test
    ├── fizz_buzz_test.rb
    └── test_helper.rb
~~~

El contenido de nuestro `test_helper` será un poco mejor que el `spec_helper`, porque ahora podemos agregar un poco de código al menos.

~~~ruby
require 'minitest/autorun'
require 'minitest/pride'
~~~

Extrajimos el `rquire` del autorun de Minitest al `test_helper`, y además requerimos `pride`, una pequeña biblioteca de Minitest que colorea la salida.

Ahora necesitamos cambiar el `require` de nuestro archivo de pruebas.

~~~ruby
#spec/fizz_buzz_test.rb
require 'test_helper'
require 'fizz_buzz'

describe FizzBuzz do
  it 'returns "1" when receives 1' do
    assert '1', FizzBuzz.new.convert(1)
  end
end
~~~

Y tratamos de ejecutarlo:

~~~
[fizz_buzz_minitest]$ ruby -I lib test/fizz_buzz_test.rb

[...]core_ext/kernel_require.rb:54:in `require': cannot load such file -- test_helper (LoadError)
...
        from spec/fizz_buzz_test.rb:1:in `<main>'
~~~

Ups, algo falló.

La razón es que el archivo requerido no pudo se cargado. Indicamos a Ruby que debía cargar el directorio `lib`, pero `test_helper` no está ahí, sino en el directorio `test`. Bien, para este caso, podemos usar `require_relative`, pero podemos tener el mismo problema potencial: si movemos los archivos a otros directorios, todos las rutas pasadas a `require_relative` deben ser actualizadas también.

De nuevo, la mejor opción es especificar que Ruby debe cargar otro directorio cuando ejecute nuestro archivo de prueba. Podemos hacerlo agregando el directorio `test` a la lista (separado por dos puntos `:`).

~~~
[fizz_buzz_minitest]$ ruby -I lib:test test/fizz_buzz_test.rb
Run options: --seed 64180

# Running:

.

Fabulous run in 0.000797s, 1254.2865 runs/s, 1254.2865 assertions/s.

1 runs, 1 assertions, 0 failures, 0 errors, 0 skips
~~~

Y... todo funciona de nuevo.

Como podemos ver, Minitest no asume una estructura de directorios específica porque podemos indicar sus dependencias como opciones en línea de comandos. Sin embargo, se recomienda usar la estructura que hemos visto aquí porque es una muy difundida. Cualquier desarrollador podría imaginar dónde encontrar qué archivos y es fácil de crecer si queremos usar rake (por ejemplo) para ejecutar nuestras pruebas en lotes. Aunque esto último es un tema que dejaremos para un siguiente post.
