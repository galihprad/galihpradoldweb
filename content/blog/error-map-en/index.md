---
title: "Behind 'Error : Cannot read property 'map' of undefined'"
date: "2022-03-09T00:00:00.000Z"
description: "What happened behind this error?"
---

When we develop a web app using React, we frequently accept an error message:

<!-- Ketika sedang mendevelop aplikasi web berbasis React JS, seringkali kita mendapatkan pesan error seperti berikut : -->

    Error : Cannot read property 'map' of undefined

<!-- Apa sebenarnya yang terjadi, apa penyebabnya, dan bagaimana solusinya?
check it out -->

What’s happened and how to solve it?

<!-- #### Apa penyebabnya? -->

#### What's the cause?

<!-- Pada JavaScript, `map` adalah properti yang **HANYA** dimiliki oleh variabel dengan tipe data _array_. Sehingga jika terdapat variabel selain _array_, lalu dikenai `map` maka akan muncul pesan _error_. Contoh : -->

in Javascript, `map` is a property that is only had by a variable with type _array_. Thus, if there is a non-_array_ variable that meets `.map`, would cause an error.

```js
let hihi = "some string"

hihi.map( ... ) // ERROR

```

```js
let hihi = ["a","b"]

hihi.map( ... ) // NO ERROR

```

<!-- walaupun array kosong, tidak akan menghasilkan _error_ -->

Although the array is empty, it would not cause an error

```js
let hihi = []

hihi.map( ... ) // TIDAK ERROR

```

<!-- Nah, sekarang jika variabel dengan tipe data `undefined` dikenai `map` maka akan muncul pesan error **seperti pada judul artikel ini** .
Seperti pada contoh berikut ini: -->

Thus, when a variable with type undefined meets map, this error message will appear

```js
let hihi = undefined

hihi.map( ... ) // ERROR
// Cannot read property 'map' of undefined
```

<!-- Itulah makna dari kata-kata : -->

That's is the meaning of

    Error : Cannot read property 'map' of undefined

<!-- > Saya sudah meng-assign array ke variabel tersebut, tapi kenapa tetap muncul pesan error tersebut? -->

> I have assigned an array to the variable, why does the error message still appear?

<!-- Kasus-kasus seperti ini yang sering terjadi ketika sedang mendevelop aplikasi web berbasis React JS. Pertanyaanya adalah, mana yang lebih dulu berjalan? Apakah _assign_-nya dulu atau `map` nya dulu? Jangan-jangan ketika `map` nya dijalankan, variablenya belum di-_assign_ dengan sebuah _array_? -->

Such a case frequently happens when we work with React JS. The question is, which one was executed earlier? The assignment or the `map`?

<!-- Mari kita tinjau contoh komponen berikut: -->

Let's observe this component :

```js

  const [fruits, setFruits]=useState(undefined)

  useEffect(() => {
        fetchData...
        setFruits(res.data)   // res.data berisi array
  }, [])

  return (
    <div>
      { fruits.map(item => <li> {item} </li>) }
    </div>
  )

```

<!--
Pada contoh di atas, kita sudah meng-_assign_ variabel `buah` dengan sebuah _array_, namun akan tetap muncul pesan _error_ -->

On the example above, we already assign an array to the `fruits`, but this error message still appear

    Error : Cannot read property 'map' of undefined

<!-- Kenapa bisa begitu? -->

Why?

<!-- > Ingat bahwa pada React JS, `useEffect` baru dieksekusi SETELAH render. -->

> Note that, in React JS, `useEffect` is executed AFTER the component rendered

<!-- Jadi ketika komoponen di atas dipanggil, pertama-tama React akan merender komponen tersebut (termasuk pada bagian `buah.map(...)` ). Setelah render yang pertama, React baru menjalankan `useEffect`. -->

<!--
Sehingga ketika `map` nya dijalankan, variablenya BELUM di-_assign_ dengan sebuah _array_. Itulah mengapa muncul pesan error tersebut -->

As a consequence, when those components are called, React will render the component (including `fruits.map(...)`). After the initial render, React executes `useEffect`

Therefore, when `fruits.map(...)` is executed, the variable `fruits` have not been assigned yet with an _array_. That’s why the error message appeared

#### How to solve?

##### Solution 1

<!-- Gunakan array kosong sebagai _initial value_ . -->

Use empty _array_ as _intial state_

```js
const [buah, setBuah] = useState([])
```

<!-- Karena sebuah _array_ walaupun kosong, tetap memiliki properti `map`. Sehingga tidak akan memunculkan pesan _error_. Array kosong yang dikenai `map` juga tidak akan me-_return_ apapun -->

Since an `array`, even if empty, also has a property `map`. Thus, this would not cause an error. An empty array that is meet map, would return nothing

##### Solution 2

Use `&&` operator

```js
fruits && fruits.map(item => <li> {item} </li>)
```

Thus, JS will check the value of `fruits`. If the value of `fruits` is `undefined`, JS will not continue to execute `fruits.map(...)`. So that would not cause an error.

If the value of `fruits` has been assigned (with array), JS will continue to execute `fruits.map(...)`

<!-- dengan begitu, JS akan melihat terlebih dahulu nilai dari `buah`.
Jika nilai dari `buah` masih `undefined`, JS tidak akan meneruskan untuk menjalakan `buah.map( ... )`. Sehingga tidak akan terjadi error -->

<!-- Jika nilai dari `buah` sudah ada (dalam bentuk array), maka JS akan meneruskan untuk menjalankan `buah.map( ... )` -->

<!-- Hal ini dikarenakan operator `&&` akan mereturn _first falsy value_. Lebih jauh bisa dipahami [disini](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) -->

This is because the `&&` operator always returns the _first falsy value_. You can see [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) for more explanations

##### Solution 3

Use _optional chaining_.

<!-- Sebenarnya ini sama dengan solusi 2, namun penulisannya bisa lebih singkat. -->

Actually, this is same with Solution 2, but with shorter writing

```js
fruits?.map(item => <li> {item} </li>)
```

You can see [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) for more explanations

Hope you enjoyed this blog. Support and comment here 👇👇👇

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Halloo, my first blog post here<a href="https://t.co/6VGwaiQPA1">https://t.co/6VGwaiQPA1</a></p>&mdash; Gal (@gpwisnujati) <a href="https://twitter.com/gpwisnujati/status/1501414602017755137?ref_src=twsrc%5Etfw">March 9, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
