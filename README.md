# graphql-api-example

Minimal example of a graphql server fusing data from postgres, mongo and a REST api. Adapted from the [How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035) and the [apollo-tutorial-kit](https://github.com/apollostack/apollo-tutorial-kit).

## Getting started

Start three containers: postgres, mongo and a grapql server.

```
docker-compose up
```

Visit [http://localhost:8080/graphiql](http://localhost:8080/graphiql)

## Example query

Example graphql query:

```
{
  author (firstName: "Edmond", lastName: "Jones") {
    id
    firstName
    lastName
    posts {
      id
      text
      title
      views  
    }
  }
  getFortuneCookie
}
```

Expected response:

```json
{
  "data": {
    "author": {
      "id": 2,
      "firstName": "Edmond",
      "lastName": "Jones",
      "posts": [
        {
          "id": 2,
          "text": "Harum ullam pariatur quos est quod. Ea quisquam esse quia et commodi autem. Ut exercitationem maiores et voluptas.",
          "title": "A post by Edmond",
          "views": 31
        }
      ]
    },
    "getFortuneCookie": "Diligence is the mother of good luck."
  }
}
```

## Redeploying changes

After making changes:

```
docker-compose build
docker-compose up
```
