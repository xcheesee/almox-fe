import React from 'react';
import { DateRangePicker, CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import './CampoDataRange.css'
import pt_BR from 'rsuite/locales/pt_BR'

const CampoDataRange = ({intervalo, onChange, label, separador, size, placeholder, className}) => {
    //input recebido e convertido ao formato permitido de DateRangePicker. 
    //'T00:00:00' previne que datas sejam alteradas devido ao conflito de timezones e a implementacao de new Date()
    const datas = intervalo[0] === ''
        ? [null , null] 
        : [new Date(intervalo[0]+'T00:00:00'), new Date(intervalo[1]+'T00:00:00')];
    
    return (
        <div className={`inputContainer ${className}`}>
            <span className='input'>{label}</span>
            <CustomProvider locale={pt_BR}>
                <DateRangePicker
                    character={separador}
                    value={datas}
                    format={"dd/MM/yyyy"}
                    placeholder={placeholder}
                    onChange={
                        //tranforma o output em string aaaa-mm-dd e envia-o para setFiltros
                        e => {
                            e !== null 
                            ? onChange([e[0]?.toLocaleDateString('fr-CA') , e[1]?.toLocaleDateString('fr-CA')])
                            : onChange([''])
                        }
                    }
                    size={size}
                />
            </CustomProvider>
        </div>
    )
}

export default CampoDataRange