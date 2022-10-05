import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../gql/queries/clientQueries";
import ClientRow from "./ClientRow";

function Clients() {

    const { loading, error, data } = useQuery(GET_CLIENTS)
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>

    if (data?.clients && data.clients.length) {
        return <>
            {data.clients.map(client => <ClientRow client={client} key={client.id} />)}
        </>
    }  
    return <p>No Clients</p>
}

export default Clients