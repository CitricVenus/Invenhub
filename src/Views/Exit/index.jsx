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

const ItemTable = ({ items, title, list, setList, isInv = false }) => {
    const onClickAdd = (uid) => {
        let itemToAdd = items.find((it) => it.UID === uid);
        if (!itemToAdd) return;
        itemToAdd = { ...itemToAdd };

        const existingItem = list.find((it) => it.UID === uid);
        if (existingItem) {
            itemToAdd.cantidad = existingItem.cantidad + 1;
            setList(list.map((it) => (it.UID === uid ? itemToAdd : it)));
        } else {
            itemToAdd.cantidad = 1;
            setList([...list, itemToAdd]);
        }
    };

    const onClickRemove = (uid) => {
        let itemToRemove = items.find((it) => it.UID === uid);
        if (itemToRemove && itemToRemove.cantidad > 1) {
            itemToRemove.cantidad -= 1;
            setList([...list]);
        } else {
            setList(list.filter((it) => it.UID !== uid));
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
                    {items.map((item, i) => (
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
                    ))}
                </tbody>
            </table>
        </div>
    );
};

function Exit() {
    const [curList, setCurList] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        fetch("http://localhost:3000/inv").then((res) => {
            return res.json();
        }
        ).then((dat) => {
            setData([...dat]);
        });
    }, [])

    return (
        <div className='bg-page' id='ext-holder'>
            <DashBackBtn />
            <DashSectTtl text="Salidas"/>
            <span id='ext-search-bar'>
                <BiSearch />
                <input type='text' placeholder='Buscar' />
            </span>
            <div className='ext-tables'>
                <ItemTable
                    items={data}
                    title={"Inventario"}
                    isInv={true}
                    list={curList}
                    setList={setCurList}
                />
                <ItemTable items={curList} title={"Salida"} list={curList} setList={setCurList} />
            </div>
            <p>Total: $ {curList.reduce((total, it) => total + it.precio * it.cantidad, 0)}</p>
            <button className='ext-btn'>Pagar</button>
        </div>
    );
}

export default Exit;
