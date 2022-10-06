import Header from "./components/Header";
import { ApolloProvider, ApolloClient } from "@apollo/client";
import Clients from "./components/Clients";
import { cache } from "./gql/cache";
import { useState } from "react";
import AddClientModal from "./components/AddClientModal";
import Projects from "./components/Projects";

const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
  cache: cache,
});

function App() {
  const [active, setActive] = useState(false);

  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <Clients />
          <button onClick={() => setActive(true)}>Add New Client</button>
          <AddClientModal active={active} closeModal={() => setActive(false)} />
          <Projects />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
