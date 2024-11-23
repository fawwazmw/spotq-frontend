import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchCoffeeShops, specificItem } from '../../redux/features/productSlice';

const ProductTitle = () => {
    const product = useSelector((state) => state.products.specificProduct);
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query; // Ambil ID dari parameter URL

    // Fetch ulang jika produk tidak ditemukan
    useEffect(() => {
        if (id) {
            console.log(`Setting title for Product ID: ${id}`); // Debugging log
            const selectedProduct = products.find((p) => p.id === parseInt(id));
            if (selectedProduct) {
                dispatch(specificItem(selectedProduct.id));
            } else {
                console.error(`Product with ID ${id} not found.`);
                dispatch(fetchCoffeeShops());
            }
        }
    }, [id, products, dispatch]);

    // Jika produk tidak ditemukan sama sekali
    if (!product) {
        return (
            <section className="page__title-area pt-85">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="page__title-content mb-50">
                                <h2 className="page__title">Product details not available</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/home">
                                                <a>Home</a>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link href="/product">
                                                <a>Product</a>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Current
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Render halaman jika produk tersedia
    return (
        <section className="page__title-area pt-85">
            <div className="container">
                <div className="row">
                    <div className="col-xxl-12">
                        <div className="page__title-content mb-50">
                            <h2 className="page__title">{product.title}</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link href="/home">
                                            <a>Home</a>
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link href="/product">
                                            <a>Product</a>
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        {product.title}
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductTitle;
