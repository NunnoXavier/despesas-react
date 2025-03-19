import { ChangeEvent } from "react"

type InputProps = {
    type?: | 'text' | 'date' | 'tel' | 'email' | 'number' | 'password',
    className?: string,
    label?: string,
    bg?: string,
    value?: any,
    onChange: (e:ChangeEvent<HTMLInputElement>) => void,
    id?: string,
    readOnly?: boolean
}

const Input = ( { type, className, label, bg, value, onChange, id, readOnly }:InputProps ) => {

    return (
        <div className={`${className} border border-slate-300 rounded-md px-2 relative h-fit`}>
            <span className={`text-xs text-slate-400 ${bg || 'bg-white'}  px-1 absolute left-3 -top-2`}>{ label }</span>
            <input 
                type={ type } 
                id={id}
                className="w-full py-2 outline-0"
                value={value}
                onChange={onChange} 
                readOnly={readOnly}                                   

            />
        </div>
    )
}

export default Input