import { ChangeEvent, ReactNode } from "react"

type SelectProps = {
    className?: string,
    label?: string,
    bg?: string,
    value?: any,
    onChange?: (e:ChangeEvent<HTMLSelectElement>) => void,
    id?: string,
    children?: ReactNode
}

const Select = ( { className, label, bg, value, onChange, id, children }:SelectProps ) => {

    return (
        <div className={`${className} border border-slate-300 rounded-md px-2 relative h-fit`}>
            <span className={`text-xs text-slate-400 ${bg||'bg-white'}  px-1 absolute left-3 -top-2`}>{ label }</span>
            <select 
                id={id}
                className="w-full py-2 outline-0"
                value={value}
                onChange={onChange}
            >
            `{ children }
            </select>
        </div>
    )
}

export default Select