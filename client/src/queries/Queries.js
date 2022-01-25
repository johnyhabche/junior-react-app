import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';  

const client = new ApolloClient({
    uri:'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  })
  
  
const Fetch_CURRENCY_QUERY = client.query({
    query: gql`
    {
       currencies {
          label
           symbol
          }
        }
    `
})


const Fetch_PRODUCTS_QUERY  = client.query({
    query: gql`
    {
      category {
        name
        products {
          id
          name
          inStock
          brand
          description
          gallery
          category
          attributes {
            name
            items {
              displayValue
            }
          }
          prices {
            amount
            currency {
              label
              symbol
            }
          }
        }
    
      }
    }
    `
  })

const Fetch_CATEGORIES_LINKS_QUERY  = client.query({
    query: gql`
    {
      categories {
      name
    }
  }
    `
  })

      
export { Fetch_CURRENCY_QUERY, Fetch_PRODUCTS_QUERY, Fetch_CATEGORIES_LINKS_QUERY};