
type IDate = | Date | string 

function parseDb(dt: string){
    //espera-se em dt: "2025-02-25T00:00:00.000Z"

    const dtSlice = dt.slice(0,10)
    //espera-se em dtSlice: "yyyy-mm-dd"

    const dtArray = dtSlice.split('-')
    //espera-se em arrayData: ["yyyy", "mm", "dd"]

    const dtDate = new Date(Number(dtArray[0]), Number(dtArray[1])-1, Number(dtArray[2]))
    return dtDate
}

function parse(dt: IDate){
    const formatedDate = new Date(dt)
    // const options = {
    //   timeZone: 'America/Sao_Paulo',
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    // }

    const dateUTC = new Date(formatedDate.getTime() + (formatedDate.getTimezoneOffset() * 60000))
    
    if(!dateUTC || dateUTC <= new Date('1970-01-02')){
        return ""
    }else{
        //return dataUTC.toLocaleDateString('en-US', opcoes) 
        // return dateUTC.toISOString().slice(0,10)
        return dateUTC.toISOString().slice(0,10)
    }
}

function startOfMonth( dt: IDate ){
    const date:Date = typeof dt === 'string'? new Date(dt) : dt

    return new Date( date.getFullYear(), date.getMonth() , 1 ).toISOString().slice(0,10)    
}

function endOfMonth( dt: IDate ){
    const date:Date = typeof dt === 'string'? new Date(dt) : dt

    return new Date( date.getFullYear(), date.getMonth() +1 , 0 ).toISOString().slice(0,10)    
}

function dateBr(dt: IDate){
    if(!dt || dt === null){
        return ""
    }

    try{
        const formattedDate = new Date(dt)
        const options:Intl.DateTimeFormatOptions = {
          timeZone: 'America/Sao_Paulo',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }
    
        const dateUTC = new Date(formattedDate.getTime() + (formattedDate.getTimezoneOffset() * 60000))
        return dateUTC.toLocaleString('pt-BR', options);
    }catch(error){
        console.log(error)
        return ""
    }
}

const useDate = {
        parse,
        parseDb,
        dateBr,
        startOfMonth,
        endOfMonth
}


export default useDate