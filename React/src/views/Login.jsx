import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import axiosClient from "../axios-client";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();

        setErrors(null);

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };


        console.log("Payload:", payload);

        axiosClient.post('/login', payload)
            .then(({ data }) => {
                console.log("Response Data:", data);
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;

                if (response && response.status === 422) {
                    setMessage(response.data.message)
                }
            });
    };

    return (
        <div className='login-signup-form animated fadeInDown'>

            {message && <div className="alert">
                <p>{message}</p>
            </div>}
            
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Login
                    </h1>
                    <input ref={emailRef} type='email' placeholder="Email"></input>
                    <input ref={passwordRef} type='password' placeholder="Password"></input>

                    <button className='btn btn-block'>Login</button>
                    <p className="message">
                        Not Registered? <Link to='/signup'>Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}