import React, { useState } from 'react';
import NovaEntradaMaterial from '../../components/NovaEntradaMaterial';

const NovaEntrada = () => {
    const [materiais, setMateriais] = useState([{ material: '', quantidade: '' }]);

    return (
        <NovaEntradaMaterial 
            materiais={materiais}
            setMateriais={setMateriais}
        />
    );
}

export default NovaEntrada;