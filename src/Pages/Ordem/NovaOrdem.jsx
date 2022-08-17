import React, { useState } from 'react';
import Margens from '../../components/Margens';
import NovaOrdemServico from '../../components/NovaOrdemServico';

const NovaOrdem = () => {
    const [materiais, setMateriais] = useState([{ material: '', quantidade: '' }]);
    
    return (
        <Margens>
            <NovaOrdemServico 
                materiais={materiais}
                setMateriais={setMateriais}
            />
        </Margens>
    );
}

export default NovaOrdem;