# Pagas API
The backend for Pagas.


## Installation / Run
- Install with `npm install`
- Run with `npm start`
   - Server at **[localhost:5000](http://localhost:5000)**


## Endpoints
URL       | CRUD Abilities | Required Fields | Description | Note
:--------:|:--------------:| :--------------:| :-----------: | :--:
/upload  | POST           |        --       | *Save one file to AWS-s3* | Single file--any type--upload.
/products </br> /products/**id** | GET | -- </br> MongoDB *_id*| -*Get all entries* </br> -*Get specific*
/products/**id** | POST | publicKey[String] </br>  productPrice[String] </br> productTitle[String] </br> productDescription[String] </br> | Create a new product
/products/**id** | DELETE | Mongo specific *id* | Delete a specific entry |
<del>/products/**id** | <del>PUT |<del> Mongo specific *id* | <del>Update a specific entry | Currently not active, do not use.
/memoid/**id** | PUT | Mongo specific *id* | Push memoID to memoId array | Does not replace; appends to array.
/memoidrm/**id** | PUT |  Mongo specific *id* </br> Valid Memo ID | Remove a specific Memo ID from array. | Error if value not found in array.
/pk | GET | -- | Returns ``{count: [Number], data:[ { id: [String], publicKey: [String], memoId:[Array] }, ]}`` |


## Validation
Property  | Validation | Data Type
:--------:|:----------| :--------:
`publicKey` | - **Required**<br>- Max/Min Length = 56<br>- Valid public key.<br>- Danger warning if secret key. | *String*
`productPrice` | - **Required**<br>| *Number*
`productTitle` | - **Required**<br>- Min Length = 5| *String*
`productDescription` | - **Required**<br>- Min Length = 5<br>- Max Length = 5,000 | *String*
`productUrl` | -- | *String*
`memoIds` | -- | *Array*
