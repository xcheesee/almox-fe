import React, { useState } from 'react';
import { Box } from '@mui/material';
import { getDados, getMateriais, getRegistro } from '../../common/utils';
import SaidaTable from '../../components/Saida';
import DialogExcluir from '../../components/DialogExcluir';
import DialogDetalhesBaixa from '../../components/DialogDetalhesBaixa';
import { useSetAtom } from 'jotai';
import { excluirAtom, snackbarAtom } from '../../atomStore';
import DialogDetalhesSaida from '../../components/Saida/DialogDetalhesSaida';
import DialogEditaSaida from '../../components/Saida/DialogEditaSaida';
import { FormEditSaida } from '../../components/Saida/FormSaida';

const Saida = () => {
    const [carregandoEdicao, setCarregandoEdicao] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    const [saida, setSaida] = useState({});
    const [baixa, setBaixa] = useState({});
    const [cursor, setCursor] = useState('auto');
    //const [errors, setErrors] = useState({});
    const [openDetalhes, setOpenDetalhes] = useState(false);
    const [openBaixa, setOpenBaixa] = useState(false);
    const [materiais, setMateriais] = useState([]);
    const [profissionais, setProfissionais] = useState([]);
    
    const setOpenExcluir = useSetAtom(excluirAtom);
    const setSnackbar = useSetAtom(snackbarAtom)

    const getSelectedOrdemInfo = async (id, command) => {
        setCursor('progress')
        switch(command) {
        case 'visualizar':
            const [registroData, matsData, profsData] = await Promise.all([
                getRegistro('saida', id),
                getMateriais('saida', id),
                getDados(`saida/${id}/profissionais`)
            ])
            setSaida(registroData)
            setMateriais(matsData)
            setProfissionais(profsData?.data)
            setOpenDetalhes(true)
            break;
        case 'editar':
            const [registroEditData, matsEditData, profsEditData] = await Promise.all([
                getRegistro('saida', id),
                getMateriais('saida', id),
                getDados(`saida/${id}/profissionais`)
            ])
            setSaida(registroEditData);
            setMateriais(matsEditData)
            setProfissionais(profsEditData?.data)
            setOpenEditar(true)
            break;
        case 'baixa':
            try{
                let baixa = await getDados(`ordem_servico/${id}/baixa_json`);
                setBaixa(baixa);
            } catch(e) {
                setSnackbar({
                    open: true,
                    severity: "error",
                    message: `Nao foi possivel recuperar a baixa: ${e.status} (${e.message})`
                })
                return setCursor('auto')
            }
            setOpenBaixa(true);
            break;
        default:
            break;
        }
        setCursor('auto')
    }

    return (
        <Box sx={{ cursor: cursor }}>
            <SaidaTable
                getSelectedOrdemInfo={getSelectedOrdemInfo}
                cursor={cursor}
            />

            <DialogEditaSaida 
                formId="edit_saida"
                open={openEditar}
                setOpen={setOpenEditar}
                defaultValue={saida}
                carregando={carregandoEdicao}
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                setOpenExcluir={setOpenExcluir}
            >
                <FormEditSaida
                    defaultValue={{...saida, profissionais, materiais}}
                    formId="edit_saida"
                    setCarregando={setCarregandoEdicao}
                    setOpen={setOpenEditar}
                    materi
                />
            </DialogEditaSaida >

            <DialogExcluir 
                rota="saida"
                texto="Saida de Materiais"
                id={saida.id}
                setOpenEditar={setOpenEditar}
                setCarregando={setCarregandoEdicao}
                tabelaOrigem="ordemItens"
            />

            <DialogDetalhesSaida 
                openDetalhes={openDetalhes}
                setOpenDetalhes={setOpenDetalhes}
                saida={saida}
                materiais={materiais}
                profissionais={profissionais}
            />

            <DialogDetalhesBaixa 
                openBaixa={openBaixa}
                setOpenBaixa={setOpenBaixa}
                baixa={baixa}
            />
        </Box>
    );
}

export default Saida;
