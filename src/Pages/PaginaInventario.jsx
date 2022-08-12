import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Inventario from '../components/Inventario';

const PaginaInventario = () => {
    return (
        <>
            <Header />
                <Inventario />
            <Footer />
        </>
    );
}

export default PaginaInventario;