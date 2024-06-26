import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/contextProvider";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext();

    if (id) {
        useEffect(() => {

            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                }).catch((error) => {
                    console.error(error);
                    setLoading(false);
                });

        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (user.id) {
            console.log('ID : ', user.id);
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    //TODO show notification
                    setNotification("User was successfully updated");
                    navigate('/user');
                })
                .catch((err) => {
                    const response = err.response;

                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                        console.error(errors);
                    }

                    console.error(errors);
                })
        }
        else {
            axiosClient.post(`/users`, user)
                .then(() => {
                    setNotification("User was successfully created");
                    //TODO show notification
                    navigate('/user');
                })
                .catch((err) => {
                    const response = err.response;

                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        }

        // Handle form submission here
    };

    return (
        <div>
            {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading ? <div className="text-center">Loading...</div> :
                    <div>
                        {errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>}

                        <form onSubmit={onSubmit}>
                            <input
                                value={user.name}
                                onChange={ev => setUser({ ...user, name: ev.target.value })}
                                placeholder="Name"
                            />
                            <input
                                value={user.email}
                                onChange={ev => setUser({ ...user, email: ev.target.value })}
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                onChange={ev => setUser({ ...user, password: ev.target.value })}
                                placeholder="Password"
                            />
                            <input
                                type="password"
                                onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })}
                                placeholder="Confirm Password"
                            />
                            <button className='btn'>Save</button>
                        </form>
                    </div>}
            </div>
        </div>
    );
}
