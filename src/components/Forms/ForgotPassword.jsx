import React, { useState } from 'react'
import forgot from '../../assets/images/login/01s.png'
import axios from 'axios'

function ForgotPassword() {

    const [formdata, setformData] = useState({
        email: ''
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

            await axios.post('https://processing-management-system-api.vercel.app/api/auth/requestPasswordReset', formdata)

            setSuccessMessage({
                ...successMessage,
                success: 'You  recieved email to reset password'
            });

            setTimeout(() => setSuccessMessage({
                success: '',
                danger: ''
            }), 3000);

            setformData({
                email: ''
            })


        } catch (error) {

            setSuccessMessage({
                ...successMessage,
                danger: 'User does not exist'
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
                                            <h2 className="mb-2">Forgot Password</h2>
                                            <p>Enter your email address and we'll send you an email with instructions to reset your password.</p>
                                            <form onSubmit={handlePassword}>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="floating-label form-group">
                                                            <input name="email" className="floating-input form-control" value={formdata.email} type="email" required onChange={handleInput} />
                                                            <label>Email</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Submit</button>
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

export default ForgotPassword