import React from 'react';
import { 
    DialogContent, 
    DialogContentText,
    DialogActions, 
    Button,
} from '@mui/material';

const FeedbackDialog = ({reqResponse, setOpenAltSenha, setReqResponse}) => {
    return (
        <>
            <DialogContent>
                <DialogContentText>
                    {reqResponse.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                <Button
                    onClick={async () => {
                        setOpenAltSenha(false)
                        //timeout para evitar flicker de dialog
                        await(new Promise((res, rej) => {
                            setTimeout(() => res('true'), 500)
                        }))
                        setReqResponse('')
                    }}
                >
                    OK
                </Button>
            </DialogActions>
        </>
    )
}

export default FeedbackDialog