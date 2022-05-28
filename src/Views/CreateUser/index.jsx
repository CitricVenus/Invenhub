import encBase64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';
import React, { useState } from 'react'
import DashBackBtn from '../General/DashBackBtn';
import DashSectTtl from '../General/DashSectTtl';
import "./createuser.css";

function CreateUser() {

  const [usr, setUsr] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);

  const [Error, setError] = useState("");

  async function DataPost(data){

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    fetch('/usrs', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            setError("");

        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            setError(error);
        });
}

  function handleSubmit(event) {
    event.preventDefault();

    if(pass!==confPass){
        setError("Las contraseñas no coinciden");
        return;
    }
    
    const nUser = {
        nombre: usr,
        pass:sha256(pass).toString(encBase64),
        admin: isAdmin,
    };

    DataPost(nUser);
    
    //Clean input
    setUsr("");
    setPass("");
    setConfPass("");
    setIsAdmin(false);
  }

  return (
    <div className='bg-page' id='create-holder'>
        <DashBackBtn />
        <DashSectTtl text="Crear usuario"/>
        <form onSubmit={handleSubmit} className="create-form">
            <input type='text' name='usuario' placeholder='Nombre' required onChange={(e) => setUsr(e.target.value)} value={usr} />
            <input type='password' name='contra' placeholder='Contraseña' required onChange={(e) => setPass(e.target.value)} value={pass} />
            <input type='password' name='cantidad' placeholder='Confirmar contraseña' required onChange={(e)=> setConfPass(e.target.value)} value={confPass}/>
            <div className='create-admin'>
                Admin
                <input type='checkbox' name='isAdmin' checked={isAdmin} onChange={()=>setIsAdmin(!isAdmin)}/>
            </div>
            <button type='submit'>Crear</button>
            {Error && <p className='error'>{Error}</p>}
        </form>
    </div>
  )
}

export default CreateUser