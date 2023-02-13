import { createContext,useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({children}) => {

    const [userData, setUserData] = useState("")
    const navigate = useNavigate()


    const UserLogin = async(email, password) => {
        console.log(email, password)
        const data = {
            "email": email,
            "password": password
        }
        const url = "http://127.0.0.1:8000/user/login/";
        const config = { 'content-type': 'application/json' };
        axios.post(url, data, config).then((response) => {
            console.log(response.data, "data");
            if(response.data.status === 200){
                setUserData(response.data)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userid', response.data.id)
                localStorage.setItem('first_name', response.data.first_name)
            }
            else{
                alert(response.data.message)
            }
            
        })
    }

    const UserLogout = () => {
        axios.post("http://127.0.0.1:8000/user/logout/")
            .then((res) => {
                console.log(res.data)
            })
            localStorage.removeItem('token')
            localStorage.removeItem('userid')
            navigate("/")
    }


    let contextData = {
        UserLogin:UserLogin,
        UserLogout:UserLogout,
        // userid:userData.id
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}