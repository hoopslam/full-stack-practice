import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../gql/mutations/clientMutations";
import { GET_CLIENTS } from "../gql/queries/clientQueries";

export default function ClientRow({ client }) {
    const [ deleteClient ] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
        // refetchQueries: [{ query: GET_CLIENTS }],       if we want to refetch on delete to update front end
        //use cache if we want to visually update front end without refetching after delete
        update(cache, { data: { deleteClient }}) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS });
                cache.writeQuery({
                    query: GET_CLIENTS,
                    data: { clients: clients.filter(client => client.id !== deleteClient.id)},
            });
        }
    });

  return (
    <div><h1>{client.name}</h1><button onClick={deleteClient}>Delete Client</button></div>
  )
}