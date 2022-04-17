import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../Services/loginService";
import "./login.css";

function Login({ setUser }) {
    const navigate = useNavigate();

    const [hasError, setHasError] = useState(false);
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    const onSubmit = async (credentials) => {
        try {
            const user = await loginService.login(credentials);
            setUser(user);
            navigate("/dash");
        } catch {
            setHasError(true);
            setName("");
            setPass("");
            setUser(null);
        }
    };

    return (
        <div className='bg-page' id='login-holder'>
            <h1 id='lg-ttl'>InvenHub</h1>
            <form className='lg-form'>
                <input
                    type='text'
                    placeholder='Usuario'
                    onChange={(evt) => setName(evt.target.value)}
                    value={name}
                />
                <input
                    type='password'
                    placeholder='Contraseña'
                    onChange={(evt) => setPass(evt.target.value)}
                    value={pass}
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onSubmit({ nombre: name, pass });
                    }}
                >
                    Ingresar
                </button>
            </form>
            <p>{hasError ? "Los datos ingresados son incorrectos" : ""}</p>
        </div>
    );
}

export default Login;
