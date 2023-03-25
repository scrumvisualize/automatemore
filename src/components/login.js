import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import axios from 'axios'

const appUrl = process.env.REACT_APP_URL;


const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loginData, setLoginData] = useState("");
    const [helperText, setHelperText] = useState('');
    const navigate = useNavigate();

    const isDesktopOrLaptop = useMediaQuery({ maxWidth: 1920 })

    const onSubmit = (data) => {
        const fetchData = async () => {
            try {
                const email = data.email;
                const password = data.password;
                const res = await axios.post(`${appUrl}/service/login`, { email, password });
                console.log("Login success message::" + res.data.success);
                if (res.data.success) {
                    localStorage.setItem('loginEmail', email);
                    setLoginData(email);
                    navigate('/admin');
                }
                else {
                    const failMessage = res.data.fail;
                    setHelperText(failMessage);
                }
            } catch (e) {
                console.log(e);
                setHelperText(e.response.data.fail);
            }
        }
        fetchData();
    };
    console.log(errors);

    return (
        <div id="App">
            <section className="row">
                <div className='loginSection'>
                    <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
                        <input
                            id="email"
                            type="email"
                            placeholder='email'
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Please enter a valid email !"
                                }
                            })}
                        />
                        <span className="emailValidationText">
                            {errors.email && errors.email.type === "required" && <span>Email is required !</span>}
                            {errors.email && <span>{errors.email.message}</span>}
                        </span>
                        <input
                            id="password"
                            type="password"
                            placeholder='password'
                            {...register("password", {
                                required: true,
                                minLength: {
                                    value: 5,
                                    message: "Minimum length of 5 letters"
                                },
                                pattern: {
                                    value: /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d][a-zA-Z\d\-#!@~$]+$/,
                                    message: "Password begin with letter, includes number & special character"
                                }
                            })}
                        />
                        <span className="passwordValidationText">
                            {errors.password && errors.password.type === "required" && <span>Password is required !</span>}
                            {errors.password && <span>{errors.password.message}</span>}
                        </span>

                        <label>
                            <span className="loginValidationText">{helperText}</span>
                        </label>
                        <section className="col-low">
                            <input type="submit" />
                        </section>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login;