import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../gql/mutations/clientMutations";
import { GET_CLIENTS } from "../gql/queries/clientQueries";

export default function AddClient({ active, closeModal }) {
  const [ name, setName ] = useState(``);
  const [ email, setEmail ] = useState(``);
  const [ phone, setPhone ] = useState(``);

  const [ addClient ] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update( cache, { data: { addClient }}) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [ ...clients, addClient ]},
      });
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if( name === `` || email === `` || phone === ``) {
      return alert(`Please fill in all fields`);
    }

    addClient(name, email, phone);

    setName(``);
    setEmail(``);
    setPhone(``);
    closeModal();
  }

  return (
    <form className={`modal ${active ? `` : `hidden`}`} onSubmit={onSubmit}>
      <button type="button" onClick={closeModal}>Close Modal</button>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      <label htmlFor="email">email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>  
      <label htmlFor="phone">Phone:</label>
      <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
      <button type="submit">Add Client</button>
    </form>
  )
}