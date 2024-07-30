import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Contexts/Context";
import signIn from '../../assets/images/logo.png'
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";


function SignIn() {

    const navigate = useNavigate();

    const { setUserName } = useContext(Context)

    const [value, setValue] = useState({
        open: false,
        error: null
    });

    const [formData, setformData] = useState({
        email: "",
        password: "",
    });

    const handleInput = (e) => {
        e.preventDefault();

        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios
                .post(
                    "https://processing-management-system-api.vercel.app/api/auth/login",
                    formData
                )

            // Basic client-side validation
            if (!formData.email.trim() || !formData.password.trim()) {
                setValue({
                    ...value,
                    danger: "Please enter both email and password."
                });
                return;
            }


            localStorage.setItem("userId", response.data.result._id);

            setUserName(response.data.result.name)

            // Store token in local storage
            localStorage.setItem('token', response.data.token);

            setformData({
                email: "",
                password: "",
            });

            setValue({
                ...value,
                open: true,
            })

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);

        } catch (error) {
            setValue({
                ...value,
                error: 'Email and Password are invalid !'
            })

        }
    };

    return (
        <section className="login-content">
            <div className="container">
                <div className="row align-items-center justify-content-center height-self-center">
                    <div className="col-lg-8">
                        <div className="card auth-card">
                            <div className="card-body p-0">
                                <div className="d-flex align-items-center auth-content">
                                    <div className="col-lg-7 align-self-center">
                                        <div className="p-3">
                                            <h2 className="mb-2">Sign In</h2>
                                            <p>Login to stay connected.</p>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="floating-label form-group">
                                                            <input
                                                                className="floating-input form-control"
                                                                name="email"
                                                                value={formData.email}
                                                                type="email"
                                                                placeholder=" "
                                                                onChange={handleInput}
                                                                required
                                                            />
                                                            <label>Email</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="floating-label form-group">
                                                            <input
                                                                className="floating-input form-control"
                                                                name="password"
                                                                value={formData.password}
                                                                type="password"
                                                                placeholder=" "
                                                                onChange={handleInput}
                                                                required
                                                            />
                                                            <label>Password</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 justify-content-end">
                                                        <Link to="/forgotPassword">Forgot Password?</Link>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary">
                                                    Sign In
                                                </button>
                                                <p className="mt-3">
                                                    Create an Account{" "}
                                                    <Link to="/signUp" className="text-primary">
                                                        Sign Up
                                                    </Link>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 content-right">
                                        <img
                                            src={signIn}
                                            className="img-fluid image-right"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Snackbar */}
            <Snackbar
                open={value.open}
                autoHideDuration={2000}
                onClose={() => setValue({
                    ...value,
                    open: false,
                })}
            >
                <Alert onClose={() => setValue({
                    ...value,
                    open: false,
                })} severity="success">
                    You are logged in! Redirecting to dashboard...
                </Alert>
            </Snackbar>

            {/* Error Snackbar */}
            {value.error && (
                <Snackbar
                    open={!!value.error}
                    autoHideDuration={6000}
                    onClose={() => setValue({
                        ...value,
                        error: null,
                    })}
                >
                    <Alert onClose={() => setValue({
                        ...value,
                        error: null,
                    })} severity="error">
                        {value.error}
                    </Alert>
                </Snackbar>
            )}
        </section>
    );
}

export default SignIn;
