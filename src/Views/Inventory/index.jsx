import "./inventory.css";
import { BiSearch } from "react-icons/bi";
import { AiFillPlusCircle, AiFillStop } from "react-icons/ai";
import data from "./testItems.json";

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



function Inventory() {
    let inventoryItems = [...data["inv"]];

    return (
        <div className='bg-page' id='inv-holder'>
            <span id='inv-search-bar'>
                <BiSearch />
                <input type='text' placeholder='Buscar' />
            </span>
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
                    <button onClick={dataFetch}>FETCH</button>
                    
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
