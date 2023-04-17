import { InputAdornment, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

export default function MatListCard({ tipo, mats, getMats, modSelectedMat, delSelectedMat }) {
  const [allMats, setAllMats] = useState([])
  const matsQuery = useQuery({ 
    queryKey: ['mats', tipo], 
    queryFn: () => getMats(tipo.id), 
    onSuccess: res => setAllMats(res.data) 
  }) 

  const itemRef = useRef([])
  const qtdRef = useRef([])

  if (matsQuery.isLoading) return <></>
  return(
    <Paper className="p-4 grid grid-rows-[min-content_1fr] my-4">
      <Typography className="pb-4 capitalize" variant="h6">{tipo?.nome}</Typography>
      { mats?.map( (ele, index) => (
        <Box key={`tipo-${tipo.id}ele-${ele.id}i-${index}`} className="grid grid-cols-[1fr_1fr_min-content] gap-4 mb-4">
          <TextField
            select
            size="small"
            id="mat"
            defaultValue={ele.id}
            inputRef={ref => itemRef["current"][index] = ref}
            label="Material"
            //sobrescreve o valor de quantidade total pois nao eh utilizado em card de modificacao
            onBlur={ () => {
              if (mats.find(ele => ele.id === itemRef["current"][index].value)) return
              modSelectedMat(allMats.find( ele => ele.id === itemRef["current"][index].value), tipo.id, index)
            }}

          >
            {matsQuery.isLoading 
              ? <MenuItem></MenuItem>
              : allMats?.map((val, index) => <MenuItem value={val.id} key={index} className="flex justify-between"> {val.nome} </MenuItem>)
            }
          </TextField>
          <TextField 
            label="Quantidade"
            id="qtd"
            InputProps={{
              endAdornment: <InputAdornment position="end">/ {ele.quantidade} {ele.medida}</InputAdornment> 
            }}
            inputRef={ ref => qtdRef["current"][index] = ref }
            defaultValue={ele.qtd}
            onBlur={ () => {
              modSelectedMat({...ele, qtd: qtdRef["current"][index].value }, tipo.id, index)
            }}
            size="small"
          />


          <Box className="flex">
            <IconButton onClick={() => delSelectedMat(tipo.id, index)} >
              <DeleteIcon   />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Paper>

  )
}
