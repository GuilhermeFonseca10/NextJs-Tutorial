import { useEffect, useState } from "react"
import axios from 'axios';
import Link from 'next/link';

// SSR - Server Side Rendering
 function Users({users}){
  /*  //renderizando do lado do cliente
    const [users, setUsers] = useState([]);
    //consumir api
    const fetchUsers = async() => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const data = await response.data;

        setUsers(data);
    };

    console.log(users);

    useEffect( () => {
        fetchUsers()
    }, []);
*/
    return (
        <div>
            {users.map((user) => (
                <div>
                    <Link href="/profile/[id]" as={`/profile/${user.id}`}><a>{user.name}</a></Link></div>
            ))}
        </div>
    );
  
}

export async function getServerSideProps(context){
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    const data = await response.data;

    return {
        props: { users: data }
    };
}

export default Users;

//SSG - Static Site Generation 