import { ReactNode } from "react"

type TableProps = {
    children?: ReactNode,
    className?: string,

}

export const Table = ( props: TableProps ) => {
    return (
        <table className={`bg-slate-100 rounded-lg w-full overflow-hidden [&_th,td]:pl-2 [&_th,td]:text-start ${props.className}`}>
            { props.children }
        </table>
    )
}

export const Head = ( props: TableProps ) => {
    return (
        <thead className={`bg-slate-100 rounded-lg w-full overflow-hidden [&_th,td]:pl-2 [&_th,td]:text-start ${props.className}`}>
            { props.children }
        </thead>
    )
}

export const Row = ( props: TableProps ) => {
    return (
        <tr 
            className={`odd:bg-slate-300 ${props.className}`}
        >
            { props.children }
        </tr>
    )
}

export const HeadRow = ( props: TableProps ) => {
    return (
        <tr className={`${props.className}`}>
            { props.children }
        </tr>
    )
}

