import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export  const AuthPage = () =>{
    const message = useMessage()
    const {loading,request,error,ClearError}=useHttp()
    const [form,setForm] = useState({
        email:'',password:''
    })

    useEffect( ()=> {
        message(error)
        ClearError()
    },[error,message,ClearError])

    const changeHandler = event =>{
        setForm({...form,[event.target.name]:event.target.value})
    }

    const registerHandler= async () => {
        try{
            const data= await request('/api/auth/register','POST',{...form})
            console.log('DATA',data)
        }catch (e) {

        }
    }


    return(
        <div className="row">
            <div className="col s6 offset-s3">
                    <h1>Сократи ссылку</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">авторизация</span>
                        <div>
                            <div className="input-field ">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field ">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>

                    </div>
                </div>
            </div>

        </div>
    )
}