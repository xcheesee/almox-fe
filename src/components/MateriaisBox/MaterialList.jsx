import { Box, Checkbox, CircularProgress, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import { primeiraLetraMaiuscula } from "../../common/utils";
import CampoNumero from "../CampoNumero";

function SelectedMaterialList({
    selectedMaterials
}) {

    const materialByTipos = {};
    selectedMaterials?.forEach((material) => {
        materialByTipos[material.tipo_item_id]
            ? materialByTipos[material.tipo_item_id].mats.push(material)
            : materialByTipos[material.tipo_item_id] = { nome: material.tipo_item, mats: [material] }
    })

    return Object.values(materialByTipos)?.map((val, i) => {
        return (
            <Box className="pt-2" key={`material-${i}`}>
                <Typography className="!text-2xl !text-primary-700">{primeiraLetraMaiuscula(val.nome)}</Typography>
                <Box className="divide-y-2 divide-primary-300">
                    {val.mats.map((item, i) =>
                        <Box className="px-4 text-lg font-thin text-primary-600 font-[Roboto] flex justify-between gap-4" key={`item-${i}`}>
                            <span>{item.nome}</span>  <span><span className="font-bold">{item.quantidade}</span> {item.medida}</span>
                        </Box>
                    )}

                </Box>
            </Box>
        )
    })

}

export default function MaterialList({
    materiais,
    isLoading,
    enabled,
    defaultValue,
    update,
    inputName,
    entrada,
}) {
    //formata valores recebido de um get de materiais pertencentes a um determinado item, para utilizacao do componente
    //
    const formattedDefault = useMemo(
        () => defaultValue?.map((item) => ({
            id: item.item_id,
            nome: item.item,
            medida: item.medida,
            medida_id: item.medida_id,
            tipo_item_id: item.tipo_item_id,
            tipo_item: item.tipo_item,
            //estoque: item.estoque,
            quantidade: item.quantidade
        })
        ),
        [defaultValue]
    )

    const estoqueClassName = entrada ? "hidden" : "";
    const [checkedItems, setCheckedItems] = useState(formattedDefault ?? [])

    //transforma o objeto em string para enviar os valores dos itens selecionados 
    //caso utilizado dentro de um form que envia dados por meio de onSubmit 
    const inputData = JSON.stringify(checkedItems)

    useEffect(() => {
        setCheckedItems(formattedDefault ?? [])
    }, [update])

    let displayVal;
    if (!enabled)
        displayVal = <></>;
    else if (isLoading)
        displayVal = <Box className="w-full flex justify-center"><CircularProgress size={32} /></Box>;
    else if (materiais?.data?.data?.length === 0)
        displayVal = <Typography className="text-red-500 pl-4">Nao ha materias desse tipo na base!</Typography>;
    else
        displayVal = materiais?.data?.data?.map((val, index) => {
            const onList = checkedItems.some(item => item.id === val.id)
            const item = checkedItems.find(item => item.id === val.id) ?? {}

            return (
                <Box
                    className="grid lg:grid-cols-[min-content_1fr_min-content_8rem] grid-cols-[min-content_1fr_1fr] gap-y-4 min-h-20 pt-4 pb-2 justify-center items-center"
                    key={`idc-${index}`}
                >
                    <Checkbox
                        checked={onList}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setCheckedItems(prev => [...prev, { ...val, quantidade: 0 }])
                            } else {
                                setCheckedItems(prev => prev.filter(item => item.id !== val.id))
                            }

                        }}
                    />
                    <Typography className="flex justify-between items-center max-lg:col-span-2">
                        {val.nome}
                    </Typography>
                    {onList
                        && <>
                            <CampoNumero
                                label="Qtd"
                                mask="9999999"
                                maskChar=""
                                className="w-20 max-lg:col-start-2 max-lg:w-full"
                                value={item?.quantidade}
                                onChange={(e) => {
                                    item.quantidade = e.target.value
                                    setCheckedItems(prev => {
                                        const filtered = prev.filter(item => item.id !== val.id)
                                        filtered.push(item)
                                        return filtered
                                    })
                                }}
                            />
                            <Typography className={estoqueClassName + " whitespace-nowrap px-2"}>/{val.estoque}</Typography>
                        </>}
                </Box>
            );
        });

    return (
        <Box className="lg:px-8 flex flex-col gap-4">
            {/** input escondido que mantem os itens selecionados pelo usuario */}
            <input value={inputData} readOnly className="hidden" name={inputName} />
            <Box className="flex flex-col max-h-80 py-2 overflow-y-auto">
                <Box className="flex flex-col gap-2 divide-y-2">
                    {displayVal}
                </Box>
            </Box>
            {checkedItems.length !== 0 &&
                <Paper variant="outlined" className="flex flex-col gap-4 px-4 py-2 !bg-primary-100">
                    <p className="font-bold text-3xl text-primary-800 font-[Roboto]">Itens Selecionados</p>
                    <SelectedMaterialList selectedMaterials={checkedItems} />
                </Paper>
            }
        </Box>
    )
}
