const getUser = () =>{
    return JSON.parse(localStorage.getItem("user"))
};

const setUser  = (user) =>{
    //เก็บข้อมูล user
    localStorage.setItem("user",JSON.stringify(user))
};

const getLocalAccessToken = () =>{
    const user = getUser();
    return user?.token; //ป้องกัน an defind
};

//private
const removeUser = () =>{
    localStorage.removeItem("user")
};

const TokenService = {
    getLocalAccessToken,
    getUser,
    setUser,
    removeUser,
};
export default TokenService;