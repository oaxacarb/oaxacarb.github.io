---
title: Clases extendiendo las clases
date: 2014-05-07 20:42 UTC
tags: ruby
---
Todas las cosas que utilizamos en Ruby son objetos.
En Ruby podemos ver diferentes tipos o clases de objetos: textos, enteros, flotantes, matrices, y algunos objetos especiales (true, false y nil). 
En Ruby, estas clases están siempre en mayúsculas: String, Integer, Float, Array, etc. 
Bién, ahora mensionaré después de esta breve explicación de las Clases como es que podemos EXTENDER de las clases en Ruby.
En Ruby las clases nunca se consideran cerradas, y se pueden modificar añadiendo métodos, variables, por ejemplo, 
vamos a añadir una nueva funcionalidad a la Clase Integer:

~~~

class Integer
   def to_romano
      if self == 5
         romano = 'V'
      else
         romano = 'X'
      end
      romano
   end
end
~~~

Probaremos esto con un par de números:

~~~

puts 5.to_romano
puts 10.to_romano
~~~

Resultado:

~~~
V
~~~

~~~
X
~~~
