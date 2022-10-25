import React, { useState } from 'react';
import { 
    Dialog, 
} from '@mui/material';
import FeedbackDialog from './FeedbackDialog';
import SenhaForm from './SenhaForm';

const DialogAltSenh = ({ openAltSenha, setOpenAltSenha, }) => {
    const [reqResponse, setReqResponse] = useState('')

    return(
        <Dialog open={openAltSenha} fullWidth={reqResponse === ''} maxWidth="md">
           {reqResponse === ''
                ? <SenhaForm 
                    setReqResponse={setReqResponse}
                    setOpenAltSenha={setOpenAltSenha}
                />
                : <FeedbackDialog
                    setOpenAltSenha={setOpenAltSenha}
                    setReqResponse={setReqResponse}
                    reqResponse={reqResponse}
                />
            }
        </Dialog>
    )
}

export default DialogAltSenh