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

function maskCurrency (rawValue: string){
    let numericValue = rawValue.replace(/\D/g, ""); // Remove caracteres não numéricos
    numericValue = (parseInt(numericValue, 10) || 0).toString();

    if (numericValue.length < 3) {
      numericValue = numericValue.padStart(3, "0");
    }

    let cents = numericValue.slice(-2);
    let reais = numericValue.slice(0, -2);
    //reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${reais}.${cents}`;
}

const useCurrency = {
    toBR,
    toISO,
    maskCurrency
}


export default useCurrency