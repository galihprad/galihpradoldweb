---
title: "Dibalik 'Error : Cannot read property 'map' of undefined'"
date: "2022-03-09T00:00:00.000Z"
description: "Ada apa dibalik error tersebut?"
---

Ketika sedang mendevelop aplikasi web berbasis React JS, seringkali kita mendapatkan pesan error seperti berikut :

    Error : Cannot read property 'map' of undefined

Apa sebenarnya yang terjadi, apa penyebabnya, dan bagaimana solusinya?
check it out

#### Apa penyebabnya?

Pada JavaScript, `map` adalah properti yang **HANYA** dimiliki oleh variabel dengan tipe data _array_. Sehingga jika terdapat variabel selain _array_, lalu dikenai `map` maka akan muncul pesan _error_. Contoh :

```js
let hihi = "some string"

hihi.map( ... ) // ERROR

```

```js
let hihi = ["a","b"]

hihi.map( ... ) // TIDAK ERROR

```

walaupun array kosong, tidak akan menghasilkan _error_

```js
let hihi = []

hihi.map( ... ) // TIDAK ERROR

```

Nah, sekarang jika variabel dengan tipe data `undefined` dikenai `map` maka akan muncul pesan error **seperti pada judul artikel ini** .
Seperti pada contoh berikut ini:

```js
let hihi = undefined

hihi.map( ... ) // ERROR
// Cannot read property 'map' of undefined
```

Itulah makna dari kata-kata :

    Error : Cannot read property 'map' of undefined

> Saya sudah meng-assign array ke variabel tersebut, tapi kenapa tetap muncul pesan error tersebut?

Kasus-kasus seperti ini yang sering terjadi ketika sedang mendevelop aplikasi web berbasis React JS. Pertanyaanya adalah, mana yang lebih dulu berjalan? Apakah _assign_-nya dulu atau `map` nya dulu? Jangan-jangan ketika `map` nya dijalankan, variablenya belum di-_assign_ dengan sebuah _array_?

Mari kita tinjau contoh komponen berikut:

```js

  const [buah, setBuah]=useState(undefined)

  useEffect(() => {
        fetchData...
        setBuah(res.data)   // res.data berisi array
  }, [])

  return (
    <div>
      { buah.map(item => <li> item </li>) }
    </div>
  )

```

Pada contoh di atas, kita sudah meng-_assign_ variabel `buah` dengan sebuah _array_, namun akan tetap muncul pesan _error_

    Error : Cannot read property 'map' of undefined

Kenapa bisa begitu?

> Ingat bahwa pada React JS, `useEffect` baru dieksekusi SETELAH render.

Jadi ketika komoponen di atas dipanggil, pertama-tama React akan merender komponen tersebut (termasuk pada bagian `buah.map(...)` ). Setelah render yang pertama, React baru menjalankan `useEffect`.

Sehingga ketika `map` nya dijalankan, variablenya BELUM di-_assign_ dengan sebuah _array_. Itulah mengapa muncul pesan error tersebut

#### Bagaimana solusinya?

##### Solusi 1

Gunakan array kosong sebagai _initial value_ .

```js
const [buah, setBuah] = useState([])
```

Karena sebuah _array_ walaupun kosong, tetap memiliki properti `map`. Sehingga tidak akan memunculkan pesan _error_. Array kosong yang dikenai `map` juga tidak akan me-_return_ apapun

##### Solusi 2

Gunakan operator `&&`

```js
buah && buah.map(item => <li> item </li>)
```

dengan begitu, JS akan melihat terlebih dahulu nilai dari `buah`.
Jika nilai dari `buah` masih `undefined`, JS tidak akan meneruskan untuk menjalakan `buah.map( ... )`. Sehingga tidak akan terjadi error

Jika nilai dari `buah` sudah ada (dalam bentuk array), maka JS akan meneruskan untuk menjalankan `buah.map( ... )`

Hal ini dikarenakan operator `&&` akan mereturn _first falsy value_. Lebih jauh bisa dipahami [disini](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)

##### Solusi 3

Gunakan _optional chaining_.
Sebenarnya ini sama dengan solusi 2, namun penulisannya bisa lebih singkat.

```js
buah?.map(item => <li> item </li>)
```

Lebih jauh tentang _optional chaining_ bisa dilihat [disini](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).

Sekian artikel kali ini, semoga bermanfaat, terimakasih.
Support dan diskusi disini 👇👇👇
