import React from "react";

import '../../style/singup/SignUpScreen.css'
let logo_black = require("../../assets/images/logo-turi-black.png")

function SignUpScreen(){
    return(
        <>
            <div className="signup">
                <div className="container">
                    <img src={logo_black} style={{maxWidth: '200px', height: 'auto'}} />
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" name="name" id="name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" name="name" id="name"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpScreen;
