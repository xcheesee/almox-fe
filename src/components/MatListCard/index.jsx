//import { InputAdornment, MenuItem, MenuList, Paper, TextField, Typography } from "@mui/material";
//import { Box } from "@mui/system";
//import { IconButton } from "@mui/material";
//import DeleteIcon from '@mui/icons-material/Delete';
//import { useQuery } from "@tanstack/react-query";
//import { useEffect, useRef, useState } from "react";
//
//export default function MatListCard({ tipo, mats, getMats, modSelectedMat, delSelectedMat }) {
//  const [qtdError, setQtdError] = useState({})
//
//  const matsQuery = useQuery({ 
//    queryKey: ['mats', tipo], 
//    queryFn: () => getMats(tipo.id), 
//    onSuccess: res => {allMatsRef.current = res.data }
//  }) 
//
//  const qtdRef = useRef([])
//  const allMatsRef = useRef([])
//
//  if (matsQuery.isLoading) return <></>
//  return(
//    <Paper className="p-4 grid grid-rows-[min-content_1fr] my-4">
//      <Typography className="pb-4 capitalize" variant="h6">{tipo?.nome}</Typography>
//      { mats?.map( (ele, index) => (
//        <Box key={`tipo-${tipo.id}ele-${ele.id}i-${index}`} className="grid grid-cols-[1fr_1fr_min-content] gap-4 mb-4">
//          <TextField
//            select
//            size="small"
//            id="mat"
//            name="mat"
//            onChange={(e) => {
//              let mat = allMatsRef.current.find(ele => ele.id === e.target.value)
//              if (mats.find(ele => ele.id === mat.id)) return
//              let materials = [...mats]
//              materials[index] = mat
//              
//              return modSelectedMat(allMatsRef.current.find( ele => ele.id === materials[index].id), tipo.id, index) 
//            }}  
//            value={ele.id}
//            label="Material"
//          >
//            {matsQuery.isLoading 
//              ? <MenuItem></MenuItem>
//              : matsQuery.data.data?.map((val, index) => <MenuItem value={val.id} key={index} className="flex justify-between"> {val.nome} </MenuItem>)
//            }
//          </TextField>
//          <TextField 
//            label="Quantidade"
//            id="qtd"
//            name="qtd"
//            InputProps={{ endAdornment: <InputAdornment position="end">/ {ele.quantidade} {ele.medida}</InputAdornment> }}
//            inputRef={ ref => qtdRef["current"][index] = ref }
//            defaultValue={ele.qtd}
//            error={qtdError[index]}
//            helperText={ qtdError[index] ? 'Quantidade usada não pode exceder a quantidade em estoque.' : '' }
//            onBlur={ () => {
//              if(qtdRef["current"][index].value > ele.quantidade) {
//                setQtdError(prev => ({...prev, [index]: true}))
//                return
//              }
//              setQtdError(prev => ({...prev, [index]: false}))
//              modSelectedMat({...ele, qtd: qtdRef["current"][index].value }, tipo.id, index)
//            } }
//            size="small"
//          />
//
//
//          <Box className="flex">
//            <IconButton onClick={() => delSelectedMat(tipo.id, index)}>
//              <DeleteIcon />
//            </IconButton>
//          </Box>
//        </Box>
//      ))}
//    </Paper>
//  )
//}
