import { MenuItem, TextField } from '@mui/material';
import { useQuery } from "@tanstack/react-query"
import { getLocais } from '../../common/utils';
import React, { useState } from 'react';

const CampoBase = React.forwardRef(({
	name,
	label,
	defaultValue = null,
	value = null,
	tipo = "",
	depto = "",
	getAll = false,
	disabled = false,
	onChange = () => { },
	onLocaisQuery = () => { },
	restrito = false,
	required = false,
	...other
},
	ref
) => {
	const [dftVal, setDftVal] = useState(defaultValue ?? "")
	const locais = useQuery({
		queryKey: ['locais', depto, tipo, restrito],
		queryFn: () => getLocais(depto, tipo, restrito),
		enabled: !!depto || getAll,
		onSuccess: (res) => {
			onLocaisQuery(res, defaultValue)
		}
	})

	if (locais.isFetching) return (
		<TextField
			select
			value={0}
			disabled
			ref={ref}
			{...other}
		>
			<MenuItem value={0}>Carregando...</MenuItem>
		</TextField>
	);

	if (value === null) return (
		<TextField
			select
			value={dftVal}
			onChange={(e) => {
				setDftVal(e.target.value)
				onChange(e)
			}}
			name={name}
			label={label}
			disabled={disabled}
			fullWidth
			required={required}
			ref={ref}
			{...other}
		>
			{locais.data?.map((local, i) => (
				<MenuItem value={local.id} key={`local-${i}`}>
					{local.nome}
				</MenuItem>
			))
				?? <MenuItem></MenuItem>}
		</TextField>
	);


	return (
		<TextField
			select
			onChange={onChange}
			value={value}
			name={name}
			label={label}
			disabled={disabled}
			fullWidth
			required={required}
			ref={ref}
			{...other}
		>
			{locais.data?.map(local => (
				<MenuItem key={local.id} value={local}>
					{local.nome}
				</MenuItem>
			))
				?? <MenuItem></MenuItem>}
		</TextField>
	)
});

export default CampoBase;
