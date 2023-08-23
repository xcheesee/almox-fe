import { atom } from 'jotai'

// state manager utilizado: jotai
// https://jotai.org/

export const filtrosAtom = atom('')

export const sortAtom = atom('')

export const pageAtom = atom(1)

export const matsAtom = atom([])

export const detalhesAtom = atom(false)

export const excluirAtom = atom(false)

export const profissionaisAtom = atom([])

export const deptoAtom = atom('')

export const statusAtom = atom('')

export const snackbarAtom = atom({
    open: false,
    severity: 'success',
    message: 'Sucesso!',
})

export const matTipoListAtom = atom({})

export const tipoServicoAtom = atom({})
