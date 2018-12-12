import './static/css/index.css'


interface Cat {
    name: String,
    age: Number
}

function cat(cat: Cat) {
    console.log('iao', cat.name)
    alert(cat.age)
}

cat({
    name: "gxx",
    age: 123
})