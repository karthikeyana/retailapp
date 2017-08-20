Prerequisites
=============

* node 4.2.3 or above
* npm
* mongoDB

Installation
============

From the root folders of the project execute:

```bash
npm install 
```

Configuration
=============

Edit config.json to mtach your enviornment.

```bash
gulp nodemon
```

api details:
============

1) add items

url: localhost:9999/retail/create-product

params: 

{
  "product_name": "Ether-2",
  "color": "Yello",
  "type": "striped T-shirt",
  "size": "L",
  "qty": 1,
  "code": 23413
}

response:

{
  "success": true,
  "message": "product created successfully"
}

2) add customer

url: localhost:9999/retail/create-customer

params: 

{
  "first_name": "user2",
  "last_name": "B",
  "gender": "Male",
  "date_of_birth": "1991-05-31",
  "mobile_number": 9551544692,
  "location": "Chennai",
  "email_id": "user2@live.com",
  "order": []
}

response:

{
  "success": true,
  "message": "customer created successfully"
}

3) Place order

url: localhost:9999/retail/place-order

params:

{
  "email_id": "user3@live.com", 
  "order":{
    "amount": 1000,
    "items": 2,
    "item_id": 23412
  }
}

response:

{
    "success": true,
    "message": "order placed successfully",
    "data": {
        "reference_id": "0668d7bd-91e3-404c-baba-c74d62dad3b3"
    }
}
