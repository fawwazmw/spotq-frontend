import Image from 'next/image';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("jwt");

            if (storedUser && storedToken) {
                try {
                    const response = await axios.get("http://localhost:1337/api/users/me", {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    });

                    if (response.data) {
                        setUser(response.data);
                    } else {
                        // Token tidak valid, hapus data dari localStorage
                        localStorage.removeItem("user");
                        localStorage.removeItem("jwt");
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    // Token tidak valid, hapus data dari localStorage
                    localStorage.removeItem("user");
                    localStorage.removeItem("jwt");
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkUserLoggedIn();
    }, []);

    // Handle Google Sign-In (optional)
    const handleGoogleSignIn = async () => {
        // Implementasi Google Sign-In
    };

    // Register a new user
    const handleRegister = async (name, email, password, reset) => {
        try {
            const response = await axios.post("http://localhost:1337/api/auth/local/register", {
                username: name,
                email: email,
                password: password,
            });

            if (response.data.user) {
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("jwt", response.data.jwt);
                reset();
                alert("Pendaftaran berhasil!");
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan pada saat pendaftaran.");
        }
    };

    // Login an existing user
    const loginUser = async (email, password, reset) => {
        try {
            const response = await axios.post("http://localhost:1337/api/auth/local", {
                identifier: email,
                password: password,
            });

            if (response.data.jwt) {
                const { jwt, user } = response.data;
                localStorage.setItem("jwt", jwt);
                localStorage.setItem("user", JSON.stringify(user));

                setUser(user);
                reset();

                console.log("Logged in user:", user);
                router.push("/");
            } else {
                let errorMessage = "Maaf, terjadi kesalahan saat login. Silakan coba lagi.";
                if (response.data && response.data.error && response.data.error.message) {
                    errorMessage = response.data.error.message;
                }
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
                throw new Error(error.response.data.error.message);
            } else {
                throw error;
            }
        }
    };

    // Handle password reset email
    const passwordResetEmail = async (email) => {
        try {
            const response = await axios.post("http://localhost:1337/api/auth/forgot-password", {
                email: email,
            });
            alert("Email reset password telah dikirim.");
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan saat mengirim email reset password.");
        }
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        setUser(null);
        console.log("Logged out user.");
        router.push("/login"); // Redirect ke halaman login setelah logout
    };

    return {
        user,
        loading,
        handleGoogleSignIn,
        handleRegister,
        loginUser,
        passwordResetEmail,
        logout,
    };
};

export default useAuth;