import encBase64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";
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
                    name='usuario'
                    onChange={(evt) => setName(evt.target.value)}
                    value={name}
                />
                <input
                    type='password'
                    name='contra'
                    placeholder='Contraseña'
                    onChange={(evt) => setPass(evt.target.value)}
                    value={pass}
                />
                <button name="submit-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        onSubmit({ nombre: name, pass:sha256(pass).toString(encBase64) });
                    }}
                >
                    Ingresar
                </button>
            </form>
            <p className="error">{hasError ? "Los datos ingresados son incorrectos" : ""}</p>
        </div>
    );
}

export default Login;
