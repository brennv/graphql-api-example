# graphql-api-example

Minimal example of a graphql server fusing data from postgres, mongo and a REST api. Adapted from [How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035) and the [apollo-tutorial-kit](https://github.com/apollostack/apollo-tutorial-kit).

## Getting started

Start three containers: postgres, mongo and a graphql server.

```shell
docker-compose up
```

Visit [http://localhost:8080/graphiql](http://localhost:8080/graphiql)

## Example query

Example graphql query:

```graphql
{
  author (firstName: "Edmond", lastName: "Jones") {
    id
    firstName
    lastName
    posts {
      id
      title
      text
      views  
    }
  }
  getFortuneCookie
}
```

The same query via curl to endpoint `/graphql`:

```shell
curl 'http://localhost:8080/graphql' \
  -H "Content-Type:application/json" \
  -d '{
        "query": "{ author (firstName: \"Edmond\", lastName: \"Jones\") { id firstName lastName posts { id title text views  } } getFortuneCookie }"
      }'
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
          "title": "A post by Edmond",
          "text": "Harum ullam pariatur quos est quod. Ea quisquam esse quia et commodi autem. Ut exercitationem maiores et voluptas.",
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

```shell
docker-compose build
docker-compose up
```
