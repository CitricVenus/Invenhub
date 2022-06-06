import "./dashboard.css";
import { BiBookBookmark, BiWallet, BiPackage } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const icoStyle = {
    height: "max-content",
    width: "70%",
    color: "gray",
    backgroundColor: "white",
    padding: "10%",
    overflow: "visible",
    borderRadius: "100%",
    marginBottom: "25px",
    display: "flex",
};

function Dashboard({ setUser, user }) {
    const navigate = useNavigate();
    const [income, setIncome] = useState(0)

    const handleClick = (route) => {
        navigate(route);
    };

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
    }, [])
    

    return (
        <div className='bg-page' id='dash-holder'>
            <button
                className='dash-btn'
                onClick={() => {
                    handleClick("/");
                    setUser(null);
                }}
            >
                Log out
            </button>
            {user.admin && 
            <button
                className='dash-btn'
                onClick={() => {
                    handleClick("/createusr");
                }}
            >
                Create User
            </button>}
            <div className='dash-ttl-holder'>
                <span id='income'>Income: ${income}</span>
                <h1 id='dash-ttl'>Dashboard</h1>
            </div>
            <section id='dash-opts'>
                <button className='dash-opt' onClick={() => handleClick("/entry")}>
                    <BiPackage style={icoStyle} />
                    <h3>Entradas</h3>
                </button>

                <button className='dash-opt' onClick={() => handleClick("/exit")}>
                    <BiWallet style={icoStyle} />
                    <h3>Salidas</h3>
                </button>
                
                <button className='dash-opt' onClick={() => handleClick("/inventory")}>
                    <BiBookBookmark style={icoStyle} />
                    <h3>Inventario</h3>
                </button>
            </section>
        </div>
    );
}

export default Dashboard;
