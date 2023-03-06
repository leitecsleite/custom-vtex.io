# Componente Customizado para buscar o endereço

### Para iniciar, dentro da pasta custom roda o comando: 

`npm start`

Abre na porta [http://localhost:3000](http://localhost:3000).

Declarei o componente fora da pasta component custom/src/GetLocation.tsx 

```
import GetLocation from "./components/GetLocation";

export default GetLocation; 

```

O próximo passo é declarar o componente num bloco json custom/store/interfaces.json

Nome do bloco io chamei de "Search-Address"

```
{
  "Search-Address":{
    "component": "GetLocation"
  }  
}

```

Feito isso, para usar os blocos customizados dentro do theme do vtex.io precisei declarar dentro da pasta theme/manisfest.json a pasta custom. 

```
 "lojão.custom":"0.x"
 
```

