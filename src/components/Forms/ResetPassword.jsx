import React, { useState, } from 'react'
import forgot from '../../assets/images/login/01s.png'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom';

function ResetPassword() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const userId = searchParams.get('id');
    const token = searchParams.get('token');

    const [formdata, setformData] = useState({
        password: '',
    })

    const [successMessage, setSuccessMessage] = useState({
        success: '',
        danger: ''
    });


    const handleInput = (e) => {
        e.preventDefault();

        setformData({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handlePassword = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`https://processing-management-system-api.vercel.app/api/auth/resetPassword/${userId}/${token}`, formdata)

            setSuccessMessage({
                ...successMessage,
                success: 'Password reset Successfully'
            });

            setTimeout(() => setSuccessMessage({
                success: '',
                danger: ''
            }), 3000);

            setformData({
                password: ''
            })

            navigate('/')

        } catch (error) {

            setSuccessMessage({
                ...successMessage,
                danger: 'Something went wrong !'
            });
            setTimeout(() => setSuccessMessage({
                success: '',
                danger: ''
            }), 3000);
        }
    }
   
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
                                            <h2 className="mb-2">Reset Password</h2>
                                            <p>Enter your email address and we'll send you an email with instructions to reset your password.</p>
                                            <form onSubmit={handlePassword}>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="floating-label form-group">
                                                            <input name="password" className="floating-input form-control" value={formdata.password} type="password" required onChange={handleInput} />
                                                            <label>Password</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Reset</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 content-right">
                                        <img src={forgot} className="img-fluid image-right" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    successMessage.success && (
                        <div className="alert alert-success mt-3" role="alert">
                            {successMessage.success}
                        </div>
                    )
                }
                {
                    successMessage.danger && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {successMessage.danger}
                        </div>
                    )
                }
            </div>
        </section>
    )
}



export default ResetPassword
