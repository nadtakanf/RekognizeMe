/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const todos = /* GraphQL */ `
  query Todos {
    todos {
      id
      name
      description
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
    }
  }
`;
export const getCoins = /* GraphQL */ `
  query GetCoins($limit: Int, $start: Int) {
    getCoins(limit: $limit, start: $start) {
      id
      name
      symbol
      price_usd
    }
  }
`;
export const fetchImage = /* GraphQL */ `
  query FetchImage($imageName: String!, $type: String!) {
    fetchImage(imageName: $imageName, type: $type) {
      id
      name
    }
  }
`;
