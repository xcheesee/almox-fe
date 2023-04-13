import { InputAdornment, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function MatListCard({ tipo, mats, getMats, delSelectedMat }) {
  const matsQuery = useQuery({ queryKey: ['mats', tipo], queryFn: () => getMats(tipo.id), onSuccess: res => setAllMats(res.data) }) 
  const [allMats, setAllMats] = useState([])
  return(
    <Paper className="p-4 grid grid-rows-[min-content_1fr] my-4">
      <Typography className="pb-4 capitalize" variant="h6">{tipo?.nome}</Typography>
        { mats?.map( (ele, index) => (
        <Box key={`tipo-${tipo.id}ele-${ele.id}i-${index}`} className="grid grid-cols-[1fr_1fr_min-content] gap-4 mb-4">
            <TextField
              select
              size="small"
              value={ele.id}
              label="Material"
            >
              {matsQuery.isLoading 
                ? <MenuItem></MenuItem>
                : allMats?.map((val, index) => <MenuItem value={val.id} key={index} className="flex justify-between"> {val.nome} </MenuItem>)
              }
            </TextField>
            <TextField 
              label="Quantidade"
              InputProps={{
                endAdornment: <InputAdornment position="end">{ele.medida}</InputAdornment> 
              }}
              defaultValue={ele.qtd}
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
