import "./inventory.css";
import { BiSearch } from "react-icons/bi";
import { AiFillPlusCircle, AiFillStop } from "react-icons/ai";
import data from "./testItems.json";
import DashBackBtn from "../General/DashBackBtn";
import DashSectTtl from "../General/DashSectTtl";

const icoStyle = {
    width: "max-content",
    height: "100%",
    color: "gray",
};

function dataFetch() {
    fetch("http://localhost:3000/inv").then((res) => {
        return res.json();
    }
    ).then((data) => {
        console.log(data);
    });
}
async function DataPost(){

    const data = { id: "1", nombre: "test", precio: "1", cantidad: "1", UID: "1" };

    fetch("http://localhost:3000/inv", {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function Inventory() {
    let inventoryItems = [...data["inv"]];

    return (
        <div className='bg-page' id='inv-holder'>
            <DashBackBtn />
            <DashSectTtl text="Inventario"/>
            <span id='inv-search-bar'>
                <BiSearch />
                <input type='text' placeholder='Buscar' />
            </span>
            <button onClick={DataPost}>POST</button>
            <button onClick={dataFetch}>FETCH</button>
            <table id='inv-table'>
                <tbody id='inv-tbody'>
                    <tr className='inv-row'>
                        <th className='inv-col' id='inv-nombre'>
                            Nombre
                        </th>
                        <th className='inv-col' id='inv-uid'>
                            UID
                        </th>
                        <th className='inv-col' id='inv-cantidad'>
                            Cantidad
                        </th>
                        <th className='inv-col' id='inv-precio'>
                            Precio
                        </th>
                        <th className='inv-col' id='inv-eliminar'>
                            Eliminar
                        </th>
                        <th className='inv-col' id='inv-agregar'>
                            Agregar
                        </th>
                    </tr>
                    
                    {inventoryItems.map((item, i) => (
                        <tr className='inv-row' key={item.UID + i}>
                            <td className='inv-col'>{item.nombre}</td>
                            <td className='inv-col'>{item.UID}</td>
                            <td className='inv-col'>{item.cantidad}</td>
                            <td className='inv-col'>{"$" + item.precio}</td>
                            <td className='inv-col'>
                                <button>
                                    <AiFillStop style={icoStyle} />
                                </button>
                            </td>
                            <td className='inv-col'>
                                <button>
                                    <AiFillPlusCircle style={icoStyle} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Inventory;
