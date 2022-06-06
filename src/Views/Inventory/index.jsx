import "./inventory.css";
import { BiSearch } from "react-icons/bi";
import { AiFillPlusCircle, AiFillStop } from "react-icons/ai";
import DashBackBtn from "../General/DashBackBtn";
import DashSectTtl from "../General/DashSectTtl";
import { useEffect, useState } from "react";
//import data from "../../../testItems.json";

const icoStyle = {
    width: "max-content",
    height: "100%",
    color: "gray",
};

{/* <button onClick={DataPost}>POST</button> */}
{/* <button onClick={dataFetch}>FETCH</button> */}
//WORKING
/*
<span id='inv-search-bar'>
    <BiSearch />
    <input type='text' placeholder='Buscar' />
</span>
*/
function Inventory() {
    const [query, setQuery] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("/inv").then((res) => {
            return res.json();
        }
        ).then((dat) => {
            setData([...dat]);
        });
    }, [])

    async function DataPost(item,remove){
        if(remove){
            item.cantidad -= 1
        }else{
            item.cantidad += 1
        }
        fetch("/inv/"+item.id, {
        method: 'PUT', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
        })
        .then(response => response.json())
        .then(d => {
            const nData = data.map(it => {
                return it
            })
            setData([...nData])
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }
    

    return (
        <div className='bg-page' id='inv-holder'>
            <DashBackBtn />
            <DashSectTtl text="Inventario"/>
            
            <span id='inv-search-bar'>
                <input placeholder="Nombre de item a buscar" onChange={event => setQuery(event.target.value)} />
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
                    
                    {
                    /*data.map((item, i) => (
                        <tr className='inv-row' key={item.id + i}>
                            <td className='inv-col'>{item.nombre}</td>
                            <td className='inv-col'>{item.id}</td>
                            <td className='inv-col'>{Number(item.cantidad).toLocaleString()}</td>
                            <td className='inv-col'>{"$ " + Number(item.precio).toLocaleString()}</td>
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
                    ))*/

                    data?.filter(post => {
                        if (query === '') {
                        return post;
                        } else if (post.nombre.toLowerCase().includes(query?.toLowerCase())) {
                        return post;
                        }
                    }).map((post, index) => (
                        <tr className='inv-row' key={post.id + index}>
                            <td className='inv-col'>{post.nombre}</td>
                            <td className='inv-col'>{post.id}</td>
                            <td className='inv-col'>{Number(post.cantidad).toLocaleString()}</td>
                            <td className='inv-col'>{"$ " + Number(post.precio).toLocaleString()}</td>
                            <td className='inv-col'>
                            <button onClick={()=>DataPost(post,true)}>
                                <AiFillStop style={icoStyle} />
                            </button>
                            </td>
                            <td className='inv-col'>
                                <button onClick={()=>DataPost(post,false)}>
                                    <AiFillPlusCircle style={icoStyle} />
                                </button>
                            </td>
                            
                        </tr>


                    ))
                    }

                </tbody>
            </table>
        </div>
    );
}



export default Inventory;


//WORKING

{/*}
function App (){
    const [query, setQuery] = useState("")

    const [data, setData] = useState([])

    useEffect(() => {
        fetch("/inv").then((res) => {
            return res.json();
        }
        ).then((dat) => {
            setData([...dat]);
        });
    }, [])


    return(
      <div  className='bg-page' id='inv-holder'> 
        <input placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)} />
        <table id='inv-table'>
                    <tbody id='inv-tbody'>
                        <tr className='inv-row'>
                            <th className='inv-col' id='inv-nombre'>
                                Nombre
                            </th>
                            <th className='inv-col' id='inv-id'>
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

                        {
                        //data.inv?.map((post, index) => (
                        //    <div key={index}>
                        //    <p>{post.nombre}</p>
                        //    <p>{post.precio}</p>
                        //    </div>
                        //))
                        data.inv?.filter(post => {
                            if (query === '') {
                            return post;
                            } else if (post.nombre.toLowerCase().includes(query?.toLowerCase())) {
                            return post;
                            }
                        }).map((post, index) => (
                            <tr className='inv-row' key={index}>
                                <td className='inv-col'>{post.nombre}</td>
                                <td className='inv-col'>{post.id}</td>
                                <td className='inv-col'>{post.cantidad}</td>
                                <td className='inv-col'>{"$" + post.precio}</td>
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


                        ))
                        
                        }
                        
                        
                        
                    </tbody>
                </table>

        
      </div>
    );
  }


export default App;

*/}
