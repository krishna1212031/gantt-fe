import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://gantt-be.onrender.com/graphql",
    cache: new InMemoryCache(),
});

export default client;
