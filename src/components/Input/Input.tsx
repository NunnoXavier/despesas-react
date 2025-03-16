import { ChangeEvent } from "react"

type InputProps = {
    type?: | 'text' | 'date' | 'tel' | 'email' | 'number' | 'password',
    className?: string,
    label?: string,
    bg?: string,
    value?: any,
    onChange: (e:ChangeEvent<HTMLInputElement>) => void,
    id?: string
}

const Input = ( { type, className, label, bg, value, onChange, id }:InputProps ) => {

    return (
        <div className={`${className} border border-gray-400 rounded-md px-2 relative h-fit`}>
            <span className={`text-xs text-gray-400 ${bg || 'bg-white'}  px-1 absolute left-3 -top-2`}>{ label }</span>
            <input 
                type={ type } 
                id={id}
                className="w-full py-2 outline-0"
                value={value}
                onChange={onChange}                                    

            />
        </div>
    )
}

export default Input