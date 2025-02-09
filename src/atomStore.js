import { atom } from 'jotai'

// state manager utilizado: jotai
// https://jotai.org/

export const filtrosAtom = atom('')

export const sortAtom = atom('')

export const pageAtom = atom(1)

export const excluirAtom = atom(false)

export const snackbarAtom = atom({
    open: false,
    severity: 'success',
    message: 'Sucesso!',
})