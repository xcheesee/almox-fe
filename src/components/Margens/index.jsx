import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const Margens = (props) => {
    return (
        <>
            <Header itemsAcabando={props.itemsAcabando} />
            {props.children}
            <Footer />
        </>
    );
}

export default Margens;