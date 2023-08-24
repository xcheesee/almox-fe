import React, { useState } from 'react';
import { 
    Box,
    Switch,
    FormGroup,
    FormControlLabel
} from '@mui/material';
import BoxMateriais from '../../BoxMateriais';
import BoxProfissionais from '../../BoxProfissionais';
import { objToArr, enviaNovaSaida, getOrdemDados, getProfissionais, setFormSnackbar, errorBuilder } from '../../../common/utils';
import { deptoAtom, matTipoListAtom, snackbarAtom, tipoServicoAtom } from '../../../atomStore';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import OSAutocomplete from '../../OSAutocomplete';
import SaidaOSCard from '../../SaidaOSCard';
import { FormSemOs } from '.';
import OrdemMatsCard from '../../OrdemMatsCard';
import OrdemProfsCard from '../../OrdemProfsCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FormContainer from '../../FormContainer';
import { useNavigate } from 'react-router-dom';
import CampoTipoServicos from '../../CampoTipoServicos';

export default function FormNovaSaida ({ 
    setCarregando, 
    setOpenConfirmar, 
    errors,
    setErrors,
    formId,
}) {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

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
    //const [tipoServicoSelecionado, setTipoServicoSelecionado] = useAtom(tipoServicoAtom)
    const setSnackbar = useSetAtom(snackbarAtom)
    const materiaisInterno = useAtomValue(matTipoListAtom)

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

    //confere se a o.s. nao possui tanto profissionais quanto materiais,
    //nao eh uma saida sem ordem e nao esta em carregamento
    function isBasicOS() {
        return (!isNoOSForm 
            && (!ordemProfs || ordemProfs.length === 0)
            && (!ordemMats || ordemMats.length === 0)
            && !isLoadingDados
        )
    }

    function formatItemForSaida(itemObjArr) {
        const saidaItens = itemObjArr.map(itemObj => {
            const saidaItem = {}
            saidaItem.id = itemObj.id
            //valores duplicados para conformidade entre envio de saida com e sem ordem de servico
            //TODO: implementar solucao sem o uso de duplicatas
            saidaItem.quantidade = itemObj.qtd
            saidaItem.enviado = itemObj.qtd
            return saidaItem
        })
        return saidaItens
    }
    
    function formatOrdemForSaida(ordem) {
        const saida = {}
        saida.departamento_id = ordem.departamento_id
        saida.origem_id = ordem.origem_id
        saida.local_servico_id = ordem.local_servico_id
        saida.ordem_servico_id = ordem.id
        saida.especificacao = ordem.especificacao
        saida.observacoes = ordem.observacoes

        return saida
    }

    const addMutation = useMutation( async ({formData: data, materiais: materiaisInterno}) => {
        setOpenConfirmar(false)
        setCarregando(true)
        try {
            await enviaNovaSaida({formData: data, materiais: materiaisInterno})
        } catch(e) {
            throw e
        }
    }, { onSuccess: async (res) => {
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
            //setFormSnackbar(setSnackbar, "", { error: true, status: res.status })
        }
    })

    async function sendSaida(e) {
        if(isNoOSForm) {
            const formData = new FormData(e.target)
            const itens = objToArr(materiaisInterno);
            const saidaItens = formatItemForSaida(itens)
            formData.append("almoxarife_nome", localStorage.getItem("username"))
            formData.append("almoxarife_email", localStorage.getItem("usermail"))
            formData.append("saida_items",  JSON.stringify(saidaItens))
            formData.append("saida_profissionais", JSON.stringify(profissionaisEmpregados))

            return addMutation.mutate({formData: formData}) 
        }

        let saida = formatOrdemForSaida(ordemServico)
        saida.almoxarife_nome = localStorage.getItem('username')
        saida.almoxarife_email = localStorage.getItem('usermail')
        //saida.tipo_servico_id = tipoServicoSelecionado

        let formData = new FormData()

        Object.entries(saida).forEach( keyVal => {
            formData.append(keyVal[0], keyVal[1])
        })

        return addMutation.mutate({ formData: formData })
    }

    return (
        <>
            <FormContainer
                id={formId}
                onSubmit={(e) => { 
                    e.preventDefault()
                    sendSaida(e)
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
                            setLocal={setLocal}
                            setBaseSelecionada={setBaseSelecionada}
                            setProfissionaisDisponiveis={setProfissionaisDisponiveis}
                            errors={errors}
                            setErrors={setErrors}
                    />
                    :
                    <>
                        <CampoTipoServicos 
                            label="Tipo de Serviço"
                            name="tipo_servico"
                            id="tipo_servico"
                            deptoSelecionado={deptoSelecionado}
                            error={errors.hasOwnProperty('tipo_servico_id')}
                            helperText={errors.tipo_servico_id || ""}
                        />

                        <SaidaOSCard ordemServico={ordemServico} />
                    </>
                }
            </FormContainer>

            {isNoOSForm
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
                :<></>
            }

            {isBasicOS()
                ?<>
                    <BoxMateriais
                        label="Material utilizado"
                        baseSelecionada={baseSelecionada}
                        deptoSelecionado={deptoSelecionado}
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
        </>
    );
}