
type Location = {
    bairro: string; 
    cep: string; 
    complemento: string; 
    localidade: string; 
    logradouro: string;
    uf: string 
 }
 
 export async function getAddress ( cepLocation : string): Promise <Location> {

    const response = await fetch(`https://viacep.com.br/ws/${cepLocation }/json/`)
 
    const data = await response.json()
 
    const { bairro, cep, complemento, localidade, logradouro, uf} = await data 
   
    return {
       bairro,
       cep,
       complemento, 
       localidade, 
       logradouro,
       uf
    }
 }