import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const USER_URL = '/user';

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(USER_URL);
                setUsers(response.data);
            } catch (err) {
                console.log(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }
        getUsers();
    }, []);


    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => {
                            return <li key={i}>{user?.name}</li>
                        })}
                    </ul>
                )
                : <p>No users to display...</p>
            }
        </article>
    );
}

export default Users;