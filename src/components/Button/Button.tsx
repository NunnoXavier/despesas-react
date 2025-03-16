import { ReactNode } from "react"

type ButtonProps = {
    children?: ReactNode,
    className?: string,
    onClick?: () => void
}

const Button = ( { children, className, onClick }: ButtonProps ) => {
    return (
        <button 
            className={` ${className} bg-slate-600 text-white rounded-md hover:bg-slate-400`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button