import "./exit.css";
import { BiSearch } from "react-icons/bi";
import { AiFillPlusCircle, AiFillStop } from "react-icons/ai";
import { useEffect, useState } from "react";
import DashBackBtn from "../General/DashBackBtn";
import DashSectTtl from "../General/DashSectTtl";

const icoStyle = {
    width: "max-content",
    height: "100%",
    color: "gray",
};

const ItemTable = ({ items, title, list, setList, isInv = false , myQuery}) => {

    
    
    const onClickAdd = (id) => {
        let itemToAdd = items.find((it) => it.id === id);
        if (!itemToAdd) return;
        itemToAdd = { ...itemToAdd };

        const existingItem = list.find((it) => it.id === id);
        if (existingItem) {
            itemToAdd.cantidad = existingItem.cantidad + 1;
            setList(list.map((it) => (it.id === id ? itemToAdd : it)));
        } else {
            itemToAdd.cantidad = 1;
            setList([...list, itemToAdd]);
        }
    };

    const onClickRemove = (id) => {
        let itemToRemove = items.find((it) => it.id === id);
        if (itemToRemove && itemToRemove.cantidad > 1) {
            itemToRemove.cantidad -= 1;
            setList([...list]);
        } else {
            setList(list.filter((it) => it.id !== id));
        }
    };
    return (
        <div className='ext-table-side'>
            <table id='ext-table'>
                <caption>{title}</caption>
                <tbody id='ext-tbody'>
                    <tr className='ext-row'>
                        <th className='ext-col' id='ext-nombre'>
                            Nombre
                        </th>
                        <th className='ext-col' id='ext-uid'>
                            UID
                        </th>
                        <th className='ext-col' id='ext-cantidad'>
                            Cantidad
                        </th>
                        <th className='ext-col' id='ext-precio'>
                            Precio
                        </th>
                        {isInv ? (
                            <th className='ext-col' id='ext-agregar'>
                                Agregar
                            </th>
                        ) : (
                            <th className='ext-col' id='ext-eliminar'>
                                Eliminar
                            </th>
                        )}
                    </tr>

                    {
                    
                    /*items.map((item, i) => (
                        <tr className='ext-row' key={item.id + i}>
                            <td className='ext-col'>{item.nombre}</td>
                            <td className='ext-col'>{item.id}</td>
                            <td className='ext-col'>{item.cantidad}</td>
                            <td className='ext-col'>{"$" + item.precio}</td>
                            {isInv ? (
                                <td className='ext-col'>
                                    <button onClick={() => onClickAdd(item.id)}>
                                        <AiFillPlusCircle style={icoStyle} />
                                    </button>
                                </td>
                            ) : (
                                <td className='ext-col'>
                                    <button onClick={() => onClickRemove(item.id)}>
                                        <AiFillStop style={icoStyle} />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))*/
                    
                    isInv ? items?.filter(post => {
                        if (myQuery === '') {
                        return post;
                        } else if (post.nombre.toLowerCase().includes(myQuery?.toLowerCase())) {
                        return post;
                        }
                    }).map((post, index) => (
                        <tr className='inv-row' key={post.id + index}>
                            <td className='inv-col'>{post.nombre}</td>
                            <td className='inv-col'>{post.id}</td>
                            <td className='inv-col'>{Number(post.cantidad).toLocaleString()}</td>
                            <td className='inv-col'>{"$ " + Number(post.precio).toLocaleString()}</td>
                            {isInv ? <td className='inv-col'>
                                <button onClick={()=> onClickAdd(post.id)}>
                                    <AiFillPlusCircle style={icoStyle} />
                                </button>
                            </td> :
                            <td className='inv-col'>
                                <button onClick={()=> onClickRemove(post.id)}>
                                    <AiFillStop style={icoStyle} />
                                </button>
                            </td>}
                        </tr>
                    )) :
                    list.map((post, index) => (
                        <tr className='inv-row' key={post.id + index}>
                            <td className='inv-col'>{post.nombre}</td>
                            <td className='inv-col'>{post.id}</td>
                            <td className='inv-col'>{Number(post.cantidad).toLocaleString()}</td>
                            <td className='inv-col'>{"$ " + Number(post.precio).toLocaleString()}</td>
                            {isInv ? <td className='inv-col'>
                                <button onClick={()=> onClickAdd(post.id)}>
                                    <AiFillPlusCircle style={icoStyle} />
                                </button>
                            </td> :
                            <td className='inv-col'>
                                <button onClick={()=> onClickRemove(post.id)}>
                                    <AiFillStop style={icoStyle} />
                                </button>
                            </td>}
                        </tr>
                    ))
                    
                    }

                </tbody>
            </table>
        </div>
    );
};

function Exit() {

    
    const [query, setQuery] = useState("")

    const [curList, setCurList] = useState([]);
    const [data, setData] = useState([]);
    const [income,setIncome] = useState(0)

    const fetchIncome = () =>{
        fetch("/income", {
            method: 'GET', // or 'PUT'
        })
        .then(response => response.json())
        .then(d=>{
            setIncome(d.ammount)
        })
    }

    useEffect(() => {
        fetchIncome()
        fetch("/inv").then((res) => {
            return res.json();
        }
        ).then((dat) => {
            setData([...dat]);
        });
    }, [])
    
    
    const pagar = ()=>{
        
        const earnings = curList.reduce((total, it) => Number(total) + Number(it.precio) * Number(it.cantidad), 0)
        setCurList([])
        const itemsToMod = curList.map(it => {
            it.cantidad = data.find(itm => itm.id === it.id).cantidad - it.cantidad
            return it
        })
        
        for(let itm of itemsToMod){
            fetch("/inv/"+itm.id, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itm),
                })
                .then(response => response.json())
                .then(d => {
                    const nData = data.map(it => {
                        if(it.id === itm.id) it.cantidad = itm.cantidad
                        return it
                    })
                    setData([...nData])
                })
                .catch((error) => {
                console.error('Error:', error);
                });
        }
        setIncome(income+earnings)
        const inc = {"ammount":income+earnings}
        fetch("/income", {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inc),
            })
            .catch((error) => {
            console.error('Error:', error);
            });
    }

    return (
        <div className='bg-page' id='ext-holder'>
            <DashBackBtn />
            <DashSectTtl text="Salidas"/>

            <span id='ext-search-bar'>
                <input placeholder="Nombre de item a buscar" onChange={event => setQuery(event.target.value)} />
            </span>

            <div className='ext-tables'>
                <ItemTable
                    items={data}
                    title={"Inventario"}
                    isInv={true}
                    list={curList}
                    setList={setCurList}
                    myQuery={query}
                />
                <ItemTable items={curList} title={"Salida"} list={curList} setList={setCurList} />
            </div>
            <p>Total: $ {curList.reduce((total, it) => total + it.precio * it.cantidad, 0)}</p>
            <button className='ext-btn' onClick={()=>pagar()}>Pagar</button>
        </div>
    );
}

export default Exit;
