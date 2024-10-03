import React, { Component } from 'react';
import Login from './SignUpPage/SignUp';
import SignUp from './SignUpPage/SignUp';

class SignUpPage extends Component {
    render() {
        return (
            <div>
                <main className="main">
                    <SignUp />
                </main>
            </div>
        );
    }
}

export default SignUpPage;
