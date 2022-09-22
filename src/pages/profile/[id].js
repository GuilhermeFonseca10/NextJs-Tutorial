import axios from 'axios';
import {useRouter} from 'next/router';

function Profile({user = {}}){
   const router = useRouter();

   if (router.isFallback) return <h1>carregando...</h1>

    return <div>
        <p>{user.id}</p>
        <p>{user.name}</p>
        <p>{user.username}</p>
        
    </div>
}

export async function getStaticProps(context){
    //chamar a api
    const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
    {params: {id: context.params.id }}
    );

    const user = await response.data[0];

    
    return {
        //essa props é passada para dentro do componente
        props: { user, revalidate: 1 },
    };
}
//getstaticpath preciso quando usa rotas dinamicas
//essa função exporta um array com varios paramentros
export async function getStaticPaths(){
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
        
        );
        const users = await response.data.slice(0, 5);
        const paths = users.map((user) => {
            return {params: { id: String(user.id)}};
        });
    
    return {
        paths,
        fallback: true,
    };
}
export default Profile;