import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import { api } from "../api/api"

const SignUp = () => {
    const [error,setError] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (e.target.password != e.target.password2.value){
            setError("Пароли не совпадают")
            return
        } 
        const user = {
            username: e.target.username,
            email: e.target.email,
            password: e.target.password
        }

        try {
            const data = await api.registerUser(user)
            console.log (data);
        } catch (error) {
            setError(error.message)
            console.error(error)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Регистрация</h1>
                {error.length > 0 && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <Input 
                    id="username"
                    name="username"
                    type="text"
                    label = "Имя пользователя"
                    required
                    placeholder="Введите имя пользователя"
                    />
                    <Input 
                    id="email"
                    name="email"
                    type="email"
                    label = "Введите почту"
                    required
                    placeholder="example@gmail.com"
                    />
                    <Input 
                    id="password"
                    name="password"
                    type="password"
                    label = "Пароль"
                    required
                    placeholder="Введите пароль"
                    />
                    <Input 
                    id="password2"
                    name="password2"
                    type="password"
                    label = "Подтверждение пароля"
                    required
                    placeholder="Введите пароль"
                    />
                    <Button>Зарегестрироваться</Button>
                </form>
            </div>
        </div>
    )
}
export default SignUp