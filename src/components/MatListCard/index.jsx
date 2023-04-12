import { InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Selecao from "../Selecao";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function MatListCard({tipo, mats}) {
  console.log(mats)
  return(
  <Paper className="p-4 grid grid-rows-[min-content_1fr] my-4">
      <Typography className="pb-4 capitalize" variant="h6">{tipo?.nome}</Typography>
      <Box className="grid grid-cols-[1fr_1fr_min-content] gap-4">
        { mats?.map(ele => (
        <>
        <Selecao
          size="small"
          label={ele.id}
        >
        </Selecao>
        <TextField 
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment> 
          }}
          defaultValue={ele.quantidade}
          size="small"
        />


        <Box className="flex">
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
        </>
        ))}
      </Box>
  </Paper>

  )
}
