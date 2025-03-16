function toBR(amount: number, options={ cifrao: true }){
    if(options.cifrao){
        return amount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }else{
        return amount.toLocaleString('pt-br', {minimumFractionDigits: 2})
    }
}

function toISO(valor: string){
    try{
        return Number(valor).toFixed(2)
    }catch (error) {
        console.log(error)
        return "0"
    }
}

const useCurrency = {
    toBR,
    toISO
}

export default useCurrency