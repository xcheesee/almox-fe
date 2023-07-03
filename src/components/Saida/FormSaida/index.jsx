import React, { useEffect, useRef, useState } from 'react';
import { 
    MenuItem,
    TextField,
    Box,
    Typography, 
    Paper,
    Switch,
    FormGroup,
    FormControlLabel
} from '@mui/material';
import FormContainer from '../../FormContainer';
import Selecao from '../../Selecao';
import CampoLocais from '../../CampoLocais';
import BoxMateriais from '../../BoxMateriais';
import BoxProfissionais from '../../BoxProfissionais';
import { enviaEdicao, enviaNovoForm, getOrdemDados, getProfissionais, getStatusEnum, setFormSnackbar } from '../../../common/utils';
import { deptoAtom, matTipoListAtom, snackbarAtom } from '../../../atomStore';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import TituloTexto from '../../TituloTexto';
import { useLocation } from 'react-router-dom';
import OSAutocomplete from '../../OSAutocomplete';
import SaidaOSCard from '../../SaidaOSCard';
import SaidaSemOsForm from './saidaSemOsForm';
import OrdemMatsCard from '../../OrdemMatsCard';
import OrdemProfsCard from '../../OrdemProfsCard';

const FormSaida = (props) => {

    const { 
        //defaultValue, 
        setCarregando, 
        //setOpenEditar, 
        setOpenConfirmar, 
        //navigate, 
        //acao, 
        //materiais,
        //profissionais,
        errors,
        setErrors,
        //baseSelecionada,
        //setBaseSelecionada,
    } = props;

    //const statusEnum = useQuery(['statusEnum'], getStatusEnum)
    //const firstLoad = useRef(true);

    //const [status, setStatus] = useState(defaultValue?.status ?? "A iniciar")
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
    const setSnackbar = useSetAtom(snackbarAtom)

    //useEffect(() => {
    //        //setBaseSelecionada(ordemServico?.origem_id ?? null)
    //        //setDeptoSelecionado(ordemServico?.departamento_id ?? null )
    //        //setLocal(ordemServico?.local_servico_id ?? null)
    //        (async () => {
    //            const res = await getProfissionais(ordemServico?.local_servico_id, ordemServico?.departamento_id)
    //            setProfissionaisDisponiveis(res)
    //        })();
    //}, [ordemServico])

    async function setOrdemFromOptions (value) {
        setIsLoadingDados(true)
        setOrdemServico(value)
        setBaseSelecionada(value.origem_id)
        setDeptoSelecionado(value.departamento_id)
        const [profRes, matsRes] = await Promise.all([getOrdemDados(value.id, "profissionais"), getOrdemDados(value.id, "items")])
        console.log(profRes)
        setOrdemMats(matsRes)
        setOrdemProfs(profRes)
        setIsLoadingDados(false)
        //setProfissionaisDisponiveis(profRes.data)
    }

    return (
        <>
            <Box className='flex flex-col pt-8'>
                <OSAutocomplete 
                    disabled={isNoOSForm}
                    setOrdemServico={setOrdemFromOptions}
                    setBaseSelecionada={setBaseSelecionada}
                    setDeptoSelecionado={setDeptoSelecionado}
                    setProfissionaisDisponiveis={setProfissionaisDisponiveis}
                />

                <Box className='flex'>
                    <FormGroup>
                        <FormControlLabel  
                            control={
                                <Switch 
                                    checked={isNoOSForm} 
                                    onChange={() => {
                                        setIsNoOSForm(prev => !prev)
                                        setOrdemServico()
                                        setOrdemMats()
                                        setOrdemProfs()
                                        setBaseSelecionada()
                                        setDeptoSelecionado()
                                    }}
                                />
                            } 
                            label="Saida sem O.S." 
                        />
                    </FormGroup>
                </Box>
            </Box>
            {isNoOSForm
                ?<SaidaSemOsForm 
                    setOpenConfirmar={setOpenConfirmar}
                    setCarregando={setCarregando}
                    baseSelecionada={baseSelecionada}
                    setBaseSelecionada={setBaseSelecionada}
                    setProfissionaisDisponiveis={setProfissionaisDisponiveis}
                    errors={errors}
                    setErrors={setErrors}
                />
                :<SaidaOSCard ordemServico={ordemServico} />
            }
            { isNoOSForm || (!ordemMats && !ordemServico)
                ?<>
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
                :<></>/*<Box className='py-4'>
                    <OrdemMatsCard 
                        materiais={ordemMats} 
                        isLoading={isLoadingDados}
                    />
                </Box>*/
            }
            {ordemMats && ordemMats.length !== 0
                ?<Box className='py-4'>
                    <OrdemMatsCard 
                        materiais={ordemMats} 
                        isLoading={isLoadingDados}
                    />
                </Box>
                :<></>
            }
            {ordemProfs && ordemProfs.length !== 0
                ?<Box className='py-4'>
                    <OrdemProfsCard 
                        profissionais={ordemProfs}
                        isLoading={isLoadingDados}
                    />
                </Box>
                :<></>}
        </>
    );
}
    

export default FormSaida;
