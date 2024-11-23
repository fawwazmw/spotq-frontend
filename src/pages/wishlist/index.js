import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import BgShape from '../../components/common/BgShape';
import Breadcrumb from '../../components/common/Breadcrumb';
import Footer from '../../components/Home/Footer';
import Header from '../../components/Home/Header';
import SEO from '../../components/seo';
import WishListArea from '../../components/wishlist/WishListArea';
import useAuth from '../../hooks/useAuth';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishList = () => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) {
            return;
        }

        if (!user) {
            toast.error('Anda harus login untuk mengakses halaman wishlist.', {
                onClose: () => router.push('/login'),
            });
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <>
            <SEO pageTitle={'Wishlist'} />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Zoom}
            />
            <Header />
            <BgShape />
            <Breadcrumb name="Your Wishlist" title="Wishlist" />
            <WishListArea />
            <Footer />
        </>
    );
};

export default WishList;