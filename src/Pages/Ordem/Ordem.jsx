import React, { useState } from 'react';
import { Box } from '@mui/material';
import { getMateriais, getOrdemProfissionais, getRegistro } from '../../common/utils';
import OrdemServico from '../../components/OrdemServico';
import DialogEditar from '../../components/DialogEditar';
import DialogExcluir from '../../components/DialogExcluir';
import FormOrdemServico from '../../components/OrdemServico/FormOrdemServico';
import DialogConfirmaEdicao from '../../components/DialogConfirmaEdicao';
import DialogDetalhesOrdem from '../../components/DialogDetalhesOrdem';
//import DialogDetalhesBaixa from '../../components/DialogDetalhesBaixa';
import { useAtom, useSetAtom } from 'jotai';
import { excluirAtom, matsAtom, profissionaisAtom, snackbarAtom } from '../../atomStore';

const Ordem = () => {
    const [carregandoEdicao, setCarregandoEdicao] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    const [ordemServico, setOrdemServico] = useState({});
    //const [baixa, setBaixa] = useState({});
    const [cursor, setCursor] = useState('auto');
    const [errors, setErrors] = useState({});
    const [openDetalhes, setOpenDetalhes] = useState(false);
    //const [openBaixa, setOpenBaixa] = useState(false);
    
    const setOpenExcluir = useSetAtom(excluirAtom);
    //const setSnackbar = useSetAtom(snackbarAtom)
    const [materiais, setMateriais] = useAtom(matsAtom);
    const [profissionais, setProfissionais] = useAtom(profissionaisAtom);

    const getSelectedOrdemInfo = async (id, command) => {
        setCursor('progress')
        switch(command) {
        case 'visualizar':
            const [registroData, matsData, profsData] = await Promise.all([
                getRegistro('ordem_servico', id,),
                getMateriais('ordem_servico', id),
                getOrdemProfissionais(id)
            ])
            setOrdemServico( registroData)
            setMateriais(matsData)
            setProfissionais(profsData)
            setOpenDetalhes(true)
            break;
        case 'editar':
            const [registroEditData, matsEditData, profsEditData] = await Promise.all([
                getRegistro('ordem_servico', id),
                getMateriais('ordem_servico', id),
                getOrdemProfissionais(id)
            ])
            setOrdemServico(registroEditData);
            setMateriais(matsEditData);
            setProfissionais(profsEditData);
            setOpenEditar(true)
            break;
        //case 'baixa':
        //    try{
        //        let baixa = await getDados(`ordem_servico/${id}/baixa_json`);
        //        setBaixa(baixa);
        //    } catch(e) {
        //        setSnackbar({
        //            open: true,
        //            severity: "error",
        //            message: `Nao foi possivel recuperar a baixa: ${e.status} (${e.message})`
        //        })
        //        return setCursor('auto')
        //    }
        //    setOpenBaixa(true);
        //    break;
        default:
            break;
        }
        setCursor('auto')
    }

    return (
        <Box sx={{ cursor: cursor }}>
            <OrdemServico 
                getSelectedOrdemInfo={getSelectedOrdemInfo}
                cursor={cursor}
            />
            <DialogEditar
                titulo="Editar ordem de serviço"
                openEditar={openEditar}
                setOpenEditar={setOpenEditar}
                defaultValue={ordemServico}
                carregando={carregandoEdicao}
                setOpenConfirmar={setOpenConfirmar}
                setOpenExcluir={setOpenExcluir}
            >
                <FormOrdemServico 
                    defaultValue={ordemServico} 
                    setCarregando={setCarregandoEdicao}
                    setOpenEditar={setOpenEditar}
                    setOpenConfirmar={setOpenConfirmar}
                    materiais={materiais}
                    profissionais={profissionais}
                    acao="editar"
                    errors={errors}
                    setErrors={setErrors}
                />
            </DialogEditar>

            <DialogConfirmaEdicao
                texto="ordem de serviço"
                id={ordemServico.id}
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                form="nova-ordem"
            />

            <DialogExcluir 
                rota="ordem_servico"
                texto="ordem de serviço"
                id={ordemServico.id}
                setOpenEditar={setOpenEditar}
                setCarregando={setCarregandoEdicao}
                tabelaOrigem="ordemItens"
            />

            <DialogDetalhesOrdem 
                openDetalhes={openDetalhes}
                profissionais={profissionais}
                setOpenDetalhes={setOpenDetalhes}
                ordem={ordemServico}
                materiais={materiais}
            />

            {/*<DialogDetalhesBaixa 
                openBaixa={openBaixa}
                setOpenBaixa={setOpenBaixa}
                baixa={baixa}
            />*/}
        </Box>
    );
}

export default Ordem;
