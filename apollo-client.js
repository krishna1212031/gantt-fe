import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://countries.trevorblades.com", // this url we will update once server is ready.
    cache: new InMemoryCache(),
});

export default client;
