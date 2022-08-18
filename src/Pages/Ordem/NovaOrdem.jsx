import React, { useState } from 'react';
import NovaOrdemServico from '../../components/NovaOrdemServico';

const NovaOrdem = () => {
    const [materiais, setMateriais] = useState([{ material: '', quantidade: '' }]);
    
    return (
        <NovaOrdemServico 
            materiais={materiais}
            setMateriais={setMateriais}
        />
    );
}

export default NovaOrdem;