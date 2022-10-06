import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../gql/queries/projectQueries";

function Projects() {

    const { loading, error, data } = useQuery(GET_PROJECTS)
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>

    if (data?.projects && data.projects.length) {
        return <>
            {data.projects.map(({id, name, description, status}) => 
            <div key={id}>
                <p>{name}</p>
                <p>{description}</p>
                <p>{status}</p>
            </div>)}
        </>
    }  
    return <p>No Projects</p>
}

export default Projects