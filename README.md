# str-hgk-sajat-munka

## Test api
### Create
```Javascript
fetch('http://localhost:3000/person', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({firstName: 'John', lastName: 'Doe', vaccine: 'Astra'})
}).then( r=> r.json() )
.then( d => console.log(d) );
```

### Update
```Javascript
fetch('http://localhost:3000/person/6/Szputnyik', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({firstName: 'Jane', lastName: 'Doe', vaccine: 'Szputnyik'})
}).then( r=> r.json() )
.then( d => console.log(d) );
```

### Delete
```Javascript
fetch('http://localhost:3000/person/Szputnyik', {
    method: 'DELETE',
}).then( r=> r.json() )
.then( d => console.log(d) );
```