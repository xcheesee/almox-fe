import { MenuItem, TextField } from '@mui/material';
import { useQuery } from "@tanstack/react-query"
import { getLocais } from '../../common/utils';

const CampoLocais = ({
    name, 
    label, 
    defaultValue="", 
    value="",
    tipo, 
    depto="", 
    getAllBases=false, 
    disabled,
    onChange=() => {}, 
    onLocaisQuery=() => {},
}) => {

    const locais = useQuery({
        queryKey: ['locais', depto, tipo], 
        queryFn: () => getLocais(depto, tipo), 
        enabled: !!depto,
        onSuccess: (res) => {
            onLocaisQuery(res, defaultValue) 
        }
    })

    if(locais.isFetching) return (
        <TextField
            select
            disabled
            SelectProps={{ value: 0}}
        >
            <MenuItem value={0}>Carregando...</MenuItem>
        </TextField>

    )

    if(!!defaultValue) {
        return (
            <TextField
                select
                defaultValue={defaultValue}
                name={name}
                label={label}
                disabled={disabled}
                fullWidth
                required
            >
                {locais?.data
                    ?.filter( local => local.tipo === tipo )
                    ?.map(local => (
                        <MenuItem key={local.id} value={local.id}>
                            {local.nome}
                        </MenuItem>
                    ))
                ?? <MenuItem></MenuItem>}
            </TextField>
        )

    }

    return (
        <TextField
            select
            onChange={onChange}
            value={value}
            name={name}
            label={label}
            disabled={disabled}
            fullWidth
            required
        >
            {locais?.data
                ?.filter( local => local.tipo === tipo )
                ?.map(local => (
                    <MenuItem key={local.id} value={local.id}>
                        {local.nome}
                    </MenuItem>
                ))
            ?? <MenuItem></MenuItem>}
        </TextField>
)};

export default CampoLocais;