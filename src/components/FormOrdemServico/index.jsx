import React, { useEffect, useState } from 'react';
import { 
    MenuItem,
    TextField,
    Box,
    Typography 
} from '@mui/material';
import FormContainer from '../FormContainer';
import Selecao from '../Selecao';
import CampoLocais from '../CampoLocais';
import BoxMateriais from '../BoxMateriais';
import style from './style';
import { enviaEdicao, enviaNovoForm } from '../../common/utils';

const departamentos = JSON.parse(localStorage.getItem('departamentos'));

const FormOrdemServico = (props) => {
    const { 
        defaultValue, 
        setCarregando, 
        setOpenEditar, 
        setOpenConfirmar, 
        navigate, 
        acao, 
        materiais,
        setSnackbar, 
        setHouveMudanca, 
        errors,
        setErrors,
        locais,
        carregandoLocais
    } = props;

    const [materiaisInterno, setMateriaisInterno] = useState(materiais);
    
    useEffect(() => setMateriaisInterno(materiais), [materiais]);

    return (
        <>
        <FormContainer
            id="nova-ordem"
            onSubmit={(e) => {
                acao === 'editar'
                    ? enviaEdicao(
                        e, 
                        setHouveMudanca,
                        'ordem_servico', 
                        defaultValue.id, 
                        setCarregando, 
                        setOpenEditar, 
                        setOpenConfirmar,
                        setSnackbar,
                        'Ordem de serviço',
                        setErrors,
                        materiaisInterno,
                        'ordem_servico_items'
                    )
                    : enviaNovoForm(
                        e, 
                        'ordem_servico', 
                        'ordemservico', 
                        setCarregando, 
                        setOpenConfirmar, 
                        navigate,
                        setSnackbar,
                        'Ordem de serviço',
                        setErrors,
                        materiaisInterno,
                        'ordem_servico_items'
                    )
            }}
        >
            <Selecao
                label="Departamento"
                name="departamento_id"
                defaultValue={defaultValue?.departamento_id}
                error={errors.hasOwnProperty('departamento_id')}
                helperText={errors.departamento_id || ""}
                required
            >
                {Object.entries(departamentos).map(departamento => (
                    <MenuItem key={departamento[0]} value={departamento[0]}>
                        {departamento[1]}
                    </MenuItem>
                ))}
            </Selecao>
        
            <TextField 
                defaultValue={defaultValue?.data_inicio_servico}
                type="datetime-local"
                name="data_inicio_servico"
                label="Data de início do serviço"
                InputLabelProps={{ shrink: true }}
                error={errors.hasOwnProperty('data_inicio_servico')}
                helperText={errors.data_inicio_servico || ""}
                required
                fullWidth
            />
        
            <TextField 
                defaultValue={defaultValue?.data_fim_servico}
                type="datetime-local"
                name="data_fim_servico"
                label="Data de fim do serviço"
                InputLabelProps={{ shrink: true }}
                error={errors.hasOwnProperty('data_fim_servico')}
                helperText={errors.data_fim_servico || ""}
                fullWidth
            />

            <CampoLocais
                label="Base de origem dos materiais"
                name="origem_id"
                defaultValue={defaultValue?.origem_id}
                error={errors.hasOwnProperty('origem_id')}
                helperText={errors.origem_id || ""}
                locais={locais}
                carregando={carregandoLocais}
                required
            />

            <CampoLocais 
                label="Local de serviço"
                name="local_servico_id"
                defaultValue={defaultValue?.local_servico_id}
                error={errors.hasOwnProperty('local_servico_id')}
                helperText={errors.local_servico_id || ""}
                locais={locais}
                carregando={carregandoLocais}
                required
            />
        
            <TextField 
                defaultValue={defaultValue?.especificacao}
                name="especificacao"
                label="Especificação"
                multiline
                minRows={4}
                error={errors.hasOwnProperty('especificacao')}
                helperText={errors.especificacao || ""}
                fullWidth
            />
        
            <Selecao
                name="profissional"
                label="Profissional"
                error={errors.hasOwnProperty('profissional')}
                helperText={errors.profissional || ""}
                defaultValue={defaultValue?.profissional}
            >
                <MenuItem value="Fulano">Fulano</MenuItem>
                <MenuItem value="Sicrano">Sicrano</MenuItem>
                <MenuItem value="Beltrano">Beltrano</MenuItem>
                <MenuItem value="José">José</MenuItem>
                <MenuItem value="Maria">Maria</MenuItem>
            </Selecao>
        
            <TextField 
                defaultValue={defaultValue?.horas_execucao}
                name="horas_execucao"
                label="Horas de serviço"
                error={errors.hasOwnProperty('horas_execucao')}
                helperText={errors.horas_execucao || ""}
                fullWidth
            />
        
            <TextField 
                defaultValue={defaultValue?.observacoes}
                name="observacoes"
                label="Serviços extras/obervações"
                multiline
                minRows={4}
                error={errors.hasOwnProperty('observacoes')}
                helperText={errors.observacoes || ""}
                fullWidth
            />
        
            <Box>
                <Typography 
                    sx={style.subtituloForm} 
                >
                    Almoxarife responsável
                </Typography>
                
                <Box 
                    className="flex flex-col gap-10 my-4"
                >
                    <TextField 
                        defaultValue={defaultValue?.almoxarife_nome}
                        name="almoxarife_nome"
                        label="Nome"
                        error={errors.hasOwnProperty('almoxarife_nome')}
                        helperText={errors.almoxarife_nome || ""}
                        required
                        fullWidth
                    />
        
                    <TextField 
                        defaultValue={defaultValue?.almoxarife_email}
                        name="almoxarife_email"
                        label="E-mail"
                        type="email"
                        error={errors.hasOwnProperty('almoxarife_email')}
                        helperText={errors.almoxarife_email || ""}
                        required
                        fullWidth
                    />
                </Box>

            </Box>
        </FormContainer>
        
        {acao === 'editar'
        ?
            ""
        :
            <BoxMateriais 
                label="Material utilizado"
                materiais={materiaisInterno}
                setMateriais={setMateriaisInterno}
            />
        }
        </>
    );
}
    

export default FormOrdemServico;