const login = async (credentials) => {
    const res = await fetch("http://localhost:3000/usrs");
    const data = await res.json();

    const user = data.find(
        (usr) => usr.nombre === credentials.nombre && usr.pass === credentials.pass
    );

    return user ? { nombre: user.nombre, admin: user.admin } : Promise.reject("User not found");
};

export default { login };
