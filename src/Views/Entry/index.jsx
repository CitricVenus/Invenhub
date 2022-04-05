import "./entry.css";
import { BiDuplicate } from "react-icons/bi";
import { useState } from "react";

const icoStyle = {
    width: "150px",
    height: "max-content",
    color: "gray",
    marginRight: "100px",
};








function Entry() {

    const [Id, setId] = useState(""); 
    const [Nombre, setNombre] = useState("");
    const [Precio, setPrecio] = useState("");
    const [Cantidad, setCantidad] = useState("");
    const [UID, setUID] = useState("");

    const [Error, setError] = useState("");


    async function DataPost(data){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch('http://localhost:3000/inv', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
    
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
                setError(error);
            });
    }


    function handleSubmit(event) {
        event.preventDefault();
        
        const data = {
            nombre: Nombre,
            precio: Precio,
            cantidad: Cantidad,
            UID: UID
        };

        DataPost(data);
        
        //Clean input 
        setNombre("");
        setPrecio("");
        setCantidad("");
        setUID("");
    }

    return (
        <div className='bg-page' id='entry-holder'>
            <BiDuplicate style={icoStyle} />
            <form onSubmit={handleSubmit}>
                <div id='entry-items'>
                   <input type='text' name='nombre' placeholder='Nombre' required onChange={(e) => setNombre(e.target.value)} value={Nombre} />
                   <input type='text' name='precio' placeholder='Precio' required onChange={(e) => setPrecio(e.target.value)} value={Precio} />
                   <input type='text' name='cantidad' placeholder='Cantidad' required onChange={(e)=> setCantidad(e.target.value)} value={Cantidad}/>
                   <input type='text' name='UID' placeholder='UID' required onChange={(e)=> setUID(e.target.value)} value={UID} />
                   <button type='submit'>Agregar</button>
                   {Error && <p>{Error}</p>}
                </div>
            </form>
        </div>
    );
}

export default Entry;
