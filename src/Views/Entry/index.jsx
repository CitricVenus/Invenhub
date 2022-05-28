import "./entry.css";
import { BiDuplicate } from "react-icons/bi";
import { useState } from "react";
import DashBackBtn from "../General/DashBackBtn";
import DashSectTtl from "../General/DashSectTtl";

const icoStyle = {
    width: "150px",
    height: "max-content",
    color: "gray",
    marginRight: "100px",
};

function Entry() {

    const [Nombre, setNombre] = useState("");
    const [Precio, setPrecio] = useState(0);
    const [Cantidad, setCantidad] = useState(0);

    const [Error, setError] = useState("");
    const [msg, setMsg] = useState("");


    async function DataPost(data){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch('/inv', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                setMsg('Producto agregado!');
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                setError(error);
            });
    }


    function handleSubmit(event) {
        event.preventDefault();
        setMsg('')
        setError('')

        if (!Precio || !Cantidad){
            setError('Campos inválidos')
            return
        }
        
        const data = {
            nombre: Nombre,
            precio: Number(Precio),
            cantidad: Number(Cantidad),
        };

        DataPost(data);
        
        //Clean input 
        setNombre("");
        setPrecio("");
        setCantidad("");
    }

    return (
        <div className='bg-page' id='entry-holder'>
            <DashBackBtn />
            <DashSectTtl text="Entradas"/>
            <div className="entry-items-holder">
                <BiDuplicate style={icoStyle} />
                <form onSubmit={handleSubmit}>
                    <div id='entry-items'>
                        <h3 className="entry-items-label">Nombre</h3>
                        <input type='text' name='nombre' placeholder='Nombre' required onChange={(e) => setNombre(e.target.value)} value={Nombre} maxLength={20}/>
                        <h3 className="entry-items-label">Precio</h3>
                        <input type='number' name='precio' placeholder='Precio' required onChange={(e) => {if(e.target.value.length<11) setPrecio(e.target.value)}} value={Precio}/>
                        <h3 className="entry-items-label">Cantidad</h3>
                        <input type='number' name='cantidad' placeholder='Cantidad' required onChange={(e)=> {if(e.target.value.length<11)setCantidad(e.target.value)}} value={Cantidad}/>
                        <button type='submit'>Agregar</button>
                        {Error && <p className="error">{Error}</p>}
                        {msg && <p>{msg}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Entry;
