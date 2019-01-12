# Apollo Server with subscriptions

![Alt text](screenshot.png?raw=true "Optional Title")



## getUser Query

```javascript
query getUser($id: Int) {
  getUser(id: $id) {
    id
    firstName
    lastName
  }
}
```

Query Variables:

```JSON
{
  "id": 0
}
```

## addUser Mutation

```javascript
mutation addUser($input: UserInput) {
  addUser(input: $input) {
    id
    firstName
    lastName
  }
}
```
Query Variables:

```JSON
{
  "input": {
  	"firstName":"Jonny",
  	"lastName": "Doe"
	}
}
```


## userAdded Subscription

```javascript
subscription {
  userAdded {
    id
    firstName
    lastName
  }
}
```

## userCreated subscription with filter

```javascript
subscription userCreated($firstName: String) {
  userCreated (firstName:$firstName){
    id
    firstName
    lastName
  }
}

```

Query Variables:

```JSON
{
  "firstName": "John"
}
```