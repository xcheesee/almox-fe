import React, { useState } from 'react';
import Margens from '../../components/Margens';
import NovaEntradaMaterial from '../../components/NovaEntradaMaterial';

const NovaEntrada = () => {
    const [materiais, setMateriais] = useState([{ material: '', quantidade: '' }]);

    return (
        <Margens>
            <NovaEntradaMaterial 
                materiais={materiais}
                setMateriais={setMateriais}
            />
        </Margens>
    );
}

export default NovaEntrada;