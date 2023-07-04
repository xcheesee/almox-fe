import React, { useState } from 'react';
import { 
    Box,
    Switch,
    FormGroup,
    FormControlLabel
} from '@mui/material';
import BoxMateriais from '../../BoxMateriais';
import BoxProfissionais from '../../BoxProfissionais';
import { getOrdemDados, getProfissionais } from '../../../common/utils';
import { deptoAtom, snackbarAtom } from '../../../atomStore';
import { useAtom, useSetAtom } from 'jotai';
import OSAutocomplete from '../../OSAutocomplete';
import SaidaOSCard from '../../SaidaOSCard';
import SaidaSemOsForm from './saidaSemOsForm';
import OrdemMatsCard from '../../OrdemMatsCard';
import OrdemProfsCard from '../../OrdemProfsCard';

const FormSaida = (props) => {

    const { 
        setCarregando, 
        setOpenConfirmar, 
        errors,
        setErrors,
        //baseSelecionada,
        //setBaseSelecionada,
    } = props;

    const [local, setLocal] = useState()
    const [isNoOSForm, setIsNoOSForm] = useState(false);
    const [ordemServico, setOrdemServico] = useState()
    const [ordemMats, setOrdemMats] = useState()
    const [ordemProfs, setOrdemProfs] = useState()
    const [isLoadingDados, setIsLoadingDados] = useState(false)
    const [baseSelecionada, setBaseSelecionada] = useState()
    const [profissionaisDisponiveis, setProfissionaisDisponiveis] = useState('')
    const [profissionaisEmpregados, setProfissionaisEmpregados] = useState([{
        nome: '',
        id: '',
        ["data_inicio"]: '',
        ["horas_empregadas"]: '',
    }])

    const [deptoSelecionado, setDeptoSelecionado] = useAtom(deptoAtom)
    //const setSnackbar = useSetAtom(snackbarAtom)

    async function clearForm () {
        setOrdemServico()
        setOrdemMats()
        setOrdemProfs()
        setLocal()
        setBaseSelecionada()
        setDeptoSelecionado()

    }

    async function setOrdemFromOptions (value) {
        if (!value) return
        setIsLoadingDados(true)
        setOrdemServico(value)
        setBaseSelecionada(value.origem_id)
        setDeptoSelecionado(value.departamento_id)
        setLocal(value.local_servico_id)
        const [profRes, matsRes] = await Promise.all([getOrdemDados(value.id, "profissionais"), getOrdemDados(value.id, "items")])
        if(!profRes || profRes.length === 0) {
            const profsDispRes = await getProfissionais(value.local_servico_id, value.departamento_id)
            setProfissionaisDisponiveis(profsDispRes.data)
        }
        setOrdemMats(matsRes)
        setOrdemProfs(profRes)
        setIsLoadingDados(false)
    }

    return (
        <>
            <Box className='flex flex-col pt-8'>
                <OSAutocomplete 
                    disabled={isNoOSForm}
                    setOrdemServico={setOrdemFromOptions}
                    clearForm={clearForm}
                />

                <Box className='flex'>
                    <FormGroup>
                        <FormControlLabel  
                            control={
                                <Switch 
                                    checked={isNoOSForm} 
                                    onChange={() => {
                                        setIsNoOSForm(prev => !prev)
                                        clearForm()
                                    }}
                                />
                            } 
                            label="Saida sem O.S." 
                        />
                    </FormGroup>
                </Box>
            </Box>
            {isNoOSForm
                ?<><SaidaSemOsForm 
                    setOpenConfirmar={setOpenConfirmar}
                    setCarregando={setCarregando}
                    baseSelecionada={baseSelecionada}
                    setLocal={setLocal}
                    setBaseSelecionada={setBaseSelecionada}
                    setProfissionaisDisponiveis={setProfissionaisDisponiveis}
                    errors={errors}
                    setErrors={setErrors}
                />
                <BoxProfissionais
                    label= "Profissionais empregados"
                    // baseSelecionada={baseSelecionada}
                    // deptoSelecionado={deptoSelecionado}
                    profissionaisDisponiveis={profissionaisDisponiveis}
                    profissionaisEmpregados={profissionaisEmpregados}
                    setProfissionaisEmpregados={setProfissionaisEmpregados}
                    departamento={deptoSelecionado}
                    local={local}
                />

                <BoxMateriais
                    label="Material utilizado"
                    baseSelecionada={baseSelecionada}
                    deptoSelecionado={deptoSelecionado}
                />
                </>
                :<SaidaOSCard ordemServico={ordemServico} />
            }
                {!isNoOSForm && (!ordemMats || ordemMats.length === 0) && !isLoadingDados
                    ?<BoxMateriais
                        label="Material utilizado"
                        baseSelecionada={baseSelecionada}
                        deptoSelecionado={deptoSelecionado}
                    />
                    :<OrdemMatsCard 
                        materiais={ordemMats} 
                        isLoading={isLoadingDados}
                    />
                }
                {!isNoOSForm && (!ordemProfs || ordemProfs.length === 0) && !isLoadingDados
                    ?<BoxProfissionais
                        label= "Profissionais empregados"
                        // baseSelecionada={baseSelecionada}
                        // deptoSelecionado={deptoSelecionado}
                        profissionaisDisponiveis={profissionaisDisponiveis}
                        profissionaisEmpregados={profissionaisEmpregados}
                        setProfissionaisEmpregados={setProfissionaisEmpregados}
                        departamento={deptoSelecionado}
                        local={local}
                    />
                    :<OrdemProfsCard 
                        profissionais={ordemProfs}
                        isLoading={isLoadingDados}
                    />
                }
        </>
    );
}
    

export default FormSaida;
