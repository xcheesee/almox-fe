import { Box, Checkbox, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { primeiraLetraMaiuscula } from "../../common/utils";

function SelectedMaterialList({
    selectedMaterials
}) {

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
                        {item.nome} - <span className="font-bold">{item.quantidade}</span> {item.medida}
                    </Box>
                )}
            </Box>
        )
    })
    
}

export default function MaterialList({
    materiais, 
    isLoading, 
    enabled,
    defaultValue,
    inputName,
}) {
    //formata valores recebido de um get de materiais pertencentes a um determinado item, para utilizacao do componente
    console.log(defaultValue)
    const formattedDefault = defaultValue?.map((item) => ({
            id: item.item_id,
            nome: item.item,
            medida: item.medida,
            medida_id: item.medida_id,
            tipo_item_id: item.tipo_item_id,
            tipo_item: item.tipo_item,
            quantidade: item.quantidade,
        })
    )
    console.log(formattedDefault)
    const [checkedItems, setCheckedItems] = useState(formattedDefault ?? [])
    //transforma o objeto em string para enviar os valores dos itens selecionados caso utilizado dentro de um form que envia dados por meio de onSubmit 
    const inputData = JSON.stringify(checkedItems)

    let displayVal;
    if(!enabled) 
        displayVal = <></>;
    else if(isLoading) 
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
                                setCheckedItems( prev => [...prev, {...val, quantidade:0} ] )
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
                        value={item?.quantidade} 
                        onChange={(e) => {
                            item.quantidade = e.target.value
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
                {/** input escondido que mantem os itens selecionados pelo usuario */}
                <input value={inputData} className="hidden" name={inputName} />
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