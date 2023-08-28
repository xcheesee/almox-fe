import { profissionaisAtom } from "../../../atomStore";
import DialogConfirmaEdicao from "../../DialogConfirmaEdicao";
import DialogEditar from "../../DialogEditar";
import FormContainer from "../../FormContainer";
import OrdemMatsCard from "../../OrdemMatsCard";
import { useAtom } from 'jotai';

export default function DialogEditaSaida({ 
    formId, 
    open,
    setOpen,
    defaultValue,
    materiais,
    carregando,
    openConfirmar,
    setOpenConfirmar,
    setOpenExcluir,
    children
}) {
    

    return(
        <>
        <DialogEditar
            titulo="Editar Saida de Materiais"
            openEditar={open}
            setOpenEditar={setOpen}
            defaultValue={defaultValue}
            carregando={carregando}
            setOpenConfirmar={setOpenConfirmar}
            setOpenExcluir={setOpenExcluir}
        >
            { children }
            <OrdemMatsCard materiais={materiais} isLoading={carregando}/>
        </DialogEditar>

        <DialogConfirmaEdicao
            texto="Saida de Materiais"
            id={defaultValue.id}
            openConfirmar={openConfirmar}
            setOpenConfirmar={setOpenConfirmar}
            form={formId}
        />
        </>
    )
}