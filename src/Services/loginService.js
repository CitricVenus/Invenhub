const login = async (credentials) => {
    const res = await fetch("/usrs");
    const data = await res.json();

    const user = data.find(
        (usr) => usr.nombre === credentials.nombre && usr.pass === credentials.pass
    );

    return user ? { nombre: user.nombre, admin: user.admin } : Promise.reject("User not found");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
