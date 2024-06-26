import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

export default function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, _setNotification] = useState('');

    const {setNotification} = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want to delete the user?")) {
            return
        }

        axiosClient.delete('/users/' + `${u.id}`)
            .then(() => {
                setNotification('User deleted successfully');
                getUsers();
            })
    }

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/users');
            setUsers(response.data.data);
            setLoading(false);
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Users</h1>
                <Link to="/user/new" className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Create Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {loading ? <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <Link className='btn-edit' to={'/user/' + user.id}>Edit</Link>
                                        <button onClick={ev => onDelete(user)} className="btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        }
                    </table>
                
            </div>
        </div>
    );
}
