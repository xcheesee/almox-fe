import React, { useState } from 'react';
import { 
    Box,
    Switch,
    FormGroup,
    FormControlLabel
} from '@mui/material';
import BoxProfissionais from '../../BoxProfissionais';
import { enviaNovaSaida, getOrdemDados, setFormSnackbar, formatProfissional } from '../../../common/utils';
import { profissionaisAtom, snackbarAtom } from '../../../atomStore';
import { useAtom, useSetAtom } from 'jotai';
import OSAutocomplete from '../../OSAutocomplete';
import SaidaOSCard from '../SaidaOSCard';
import { FormSemOs } from '.';
import OrdemMatsCard from '../../OrdemMatsCard';
import OrdemProfsCard from '../../OrdemProfsCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FormContainer from '../../FormContainer';
import { useNavigate } from 'react-router-dom';
import CampoTipoServicos from '../../CampoTipoServicos';
import MateriaisBox from '../../MateriaisBox';

export default function FormNovaSaida ({ 
    setCarregando, 
    setOpenConfirmar, 
    errors,
    setErrors,
    formId,
}) {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [_, setLocal] = useState()
    const [isNoOSForm, setIsNoOSForm] = useState(false);
    const [ordemServico, setOrdemServico] = useState()
    const [ordemMats, setOrdemMats] = useState()
    const [ordemProfs, setOrdemProfs] = useState()
    const [isLoadingDados, setIsLoadingDados] = useState(false)
    const [baseSelecionada, setBaseSelecionada] = useState("")

    const [deptoSelecionado, setDeptoSelecionado] = useState("")
    const setSnackbar = useSetAtom(snackbarAtom)
    const [profissionais, setProfissionais] = useAtom(profissionaisAtom)

    async function clearForm () {
        setOrdemServico()
        setOrdemMats()
        setOrdemProfs()
        setLocal("")
        setBaseSelecionada("")
        setDeptoSelecionado("")
        setProfissionais([])
    }

    async function setOrdemFromOptions (value) {
        if (!value) return
        setIsLoadingDados(true)
        setOrdemServico(value)
        setBaseSelecionada(value.origem_id)
        setDeptoSelecionado(value.departamento_id)
        setLocal(value.local_servico_id)
        const [profRes, matsRes] = await Promise.all([getOrdemDados(value.id, "profissionais"), getOrdemDados(value.id, "items")])
        //if(!profRes || profRes.length === 0) {
        //    const profsDispRes = await getProfissionais(value.local_servico_id, value.departamento_id)
        //}
        setOrdemMats(matsRes)
        setOrdemProfs(profRes)
        setProfissionais(formatProfissional(profRes))
        setIsLoadingDados(false)
    }

    //confere se a o.s. nao possui tanto profissionais quanto materiais,
    //nao eh uma saida sem ordem e nao esta em carregamento
    function isBasicOS() {
        return (isNoOSForm 
            || ((!ordemProfs || ordemProfs.length === 0)
            && (!ordemMats || ordemMats.length === 0)
            && !isLoadingDados
            && ordemServico)
        )
    }

    function formatOrdemForSaida(ordem) {
        if(!ordem) return {}
        const saida = {}
        saida.departamento_id = ordem.departamento_id
        saida.origem_id = ordem.origem_id
        saida.local_servico_id = ordem.local_servico_id
        saida.ordem_servico_id = ordem.id
        saida.especificacao = ordem.especificacao
        saida.observacoes = ordem.observacoes

        return saida
    }

    const addMutation = useMutation( async ({ formData }) => {
        setOpenConfirmar(false)
        setCarregando(true)
        try {
            await enviaNovaSaida({ formData })
        } catch(e) {
            throw e
        }
    }, { onSuccess: async () => {
            setCarregando(false)
            queryClient.invalidateQueries(['saidas'])
            setFormSnackbar(setSnackbar, "Saida de Materiais")
            navigate(`/saida`, { replace: true });
        }, onError: async (res) => {
            setCarregando(false)
            if(res.status === 422) { setErrors(res?.errors) }
            setSnackbar({
                open: true,
                severity: "error",
                message: res.message
            })
        }
    })

    function formataSaida({formData}) {

        if(isBasicOS()) {
            formData.append("saida_profissionais", JSON.stringify(profissionais))
        }

        let saida = formatOrdemForSaida(ordemServico)
        saida.almoxarife_nome = localStorage.getItem('username')
        saida.almoxarife_email = localStorage.getItem('usermail')

        Object.entries(saida).forEach( keyVal => {
            formData.append(keyVal[0], keyVal[1])
        })

        return formData
    }

    return (
            <FormContainer
                id={formId}
                onSubmit={(e) => { 
                    e.preventDefault()
                    const formData = new FormData(e.target)

                    const formFormatado = formataSaida({ formData })

                    return addMutation.mutate({formData: formFormatado})
                }}
            >
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
                    ?<FormSemOs 
                            setOpenConfirmar={setOpenConfirmar}
                            setCarregando={setCarregando}
                            baseSelecionada={baseSelecionada}
                            deptoSelecionado={deptoSelecionado}
                            setDeptoSelecionado={setDeptoSelecionado}
                            setLocal={setLocal}
                            setBaseSelecionada={setBaseSelecionada}
                            //setProfissionaisDisponiveis={setProfissionaisDisponiveis}
                            errors={errors}
                            setErrors={setErrors}
                    />
                    :
                    <>
                        <CampoTipoServicos 
                            label="Tipo de Serviço"
                            name="tipo_servico_id"
                            id="tipo_servico_id"
                            deptoSelecionado={deptoSelecionado}
                            error={errors.hasOwnProperty('tipo_servico_id')}
                            helperText={errors.tipo_servico_id || ""}
                        />

                        <SaidaOSCard ordemServico={ordemServico} />
                    </>
                }
                {isBasicOS()
                    ?<>
                        <MateriaisBox 
                            deptoSelecionado={deptoSelecionado} 
                            baseSelecionada={baseSelecionada}
                            inputName="saida_items" 
                        />

                        <BoxProfissionais
                            label= "Profissionais empregados"
                            // baseSelecionada={baseSelecionada}
                            // deptoSelecionado={deptoSelecionado}
                        />
                    </>
                    :<>
                        <OrdemMatsCard 
                            materiais={ordemMats} 
                            isLoading={isLoadingDados}
                        />

                        <OrdemProfsCard 
                            profissionais={ordemProfs}
                            isLoading={isLoadingDados}
                        />
                    </>
                }
            </FormContainer>
    );
}