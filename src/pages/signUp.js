import Head from 'next/head';
import styles from '../styles/login.module.css';
import { useState } from "react";

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('User created successfully:', data);
            // Redirect or show a success message
            setErrorMessage('User created successfully!');
        } catch (error) {
            console.error('Failed to create user:', error);
            setErrorMessage(error.message || 'Failed to create user');
        }
    };

    const isFormValid = password === confirmPassword && username && password;


    return (
        <div className={styles.loginContainer}>
            <Head>
                <title>Sign up</title>
            </Head>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                <button type="submit" disabled={!isFormValid}>Confirm</button>
                <div className={styles.btnContainer}>
                <a href="/" className={styles.goBackBtn}>Go back</a>
                </div>
            </form>
        </div>
    );
}