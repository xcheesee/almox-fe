import { Box, Checkbox, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { primeiraLetraMaiuscula } from "../../common/utils";

function SelectedMaterialList({selectedMaterials}) {

    const materialByTipos = {}; 
    selectedMaterials?.forEach((material) => {
        materialByTipos[material.tipo_item_id]
            ? materialByTipos[material.tipo_item_id].mats.push(material)
            : materialByTipos[material.tipo_item_id] = {nome: material.tipo_item, mats: [material]}
    })

    return Object.values(materialByTipos)?.map( val => {
        return (
            <Box className="pt-2">
                <Typography className="!text-2xl !text-primary-700">{primeiraLetraMaiuscula(val.nome)}</Typography>
                {val.mats.map( item =>  <Box className="px-4 text-lg font-thin text-primary-600 font-[Roboto]">
                        {item.nome} - <span className="font-bold">{item.qtd}</span> {item.medida}
                    </Box>
                )}
            </Box>
        )
    })
    
}

export default function MaterialList({materiais, isLoading, enabled}) {
    const [checkedItems, setCheckedItems] = useState([])

    let displayVal;
    if(!enabled) return <></>;

    if(isLoading) 
        displayVal = <Box className="w-full flex justify-center"><CircularProgress size={32}/></Box>;
    else if(materiais?.data?.data?.length === 0)  
        displayVal = <Typography className="text-red-500 pl-4">Nao ha materias desse tipo na base!</Typography>;
    else
        displayVal = materiais?.data?.data?.map( (val, index) => {
            const onList = checkedItems.some(item => item.id === val.id)
            const item = checkedItems.find(item => item.id === val.id) ?? {}

            return (
                <Box 
                    className="grid grid-cols-[min-content_1fr_min-content] justify-center" 
                    key={`idc-${index}`}
                >
                    <Checkbox 
                        checked={onList}
                        onChange={(e) => {
                            if(e.target.checked) {
                                setCheckedItems( prev => [...prev, {...val, qtd:0} ] )
                            } else {
                                setCheckedItems( prev => prev.filter(item => item.id != val.id) )
                            }

                        }}
                    />
                    <Typography className="flex justify-between items-center">
                        {val.nome}
                    </Typography>
                    {onList
                    &&<TextField
                        label="Qtd" 
                        className="w-20" 
                        value={item?.qtd} 
                        onChange={(e) => {
                            item.qtd = e.target.value
                            setCheckedItems(prev => {
                                const filtered = prev.filter(item => item.id !== val.id)
                                filtered.push(item)
                                return filtered
                            })
                        }}
                    />}
                </Box>
            );
        });

        return (
            <Box className="px-8 flex flex-col gap-2">
                <Box className="flex flex-col gap-2 max-h-80 py-2 overflow-y-auto">
                    {displayVal}
                </Box>
                {checkedItems.length !== 0 && 
                <Paper variant="outlined" className="flex flex-col gap-2 px-4 py-2 !bg-primary-100">
                    <p className="font-bold text-3xl text-primary-800 font-[Roboto]">Itens Selecionados</p>
                    <SelectedMaterialList selectedMaterials={checkedItems} />
                </Paper>
                }
            </Box>
        )
}