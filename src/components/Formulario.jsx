import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Error } from "./Error";
import { useSelectMonedas } from "../hooks/useSelectMonedas";
import { monedas } from "../data/moneda";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

export const Formulario = ({setMonedas}) => {
  const [criptos, setCripto] = useState([]);
  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas);
  const [criptoMoneda, SelectCriptoMonedas] = useSelectMonedas(
    "Elige tu criptomoneda",
    criptos
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`; //${moneda}
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCripto = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });

      setCripto(arrayCripto);
    };
    consultarAPI();
  }, []);

  const handleCotizar = (e) => {
    e.preventDefault();
    if ([moneda,criptoMoneda].includes('')){
      setError(true);
      return
    }
    setError(false);
    setMonedas({moneda,criptoMoneda});
  };

  return (<>
    {error && <Error>Todos los campos son obligatorios</Error>}  
    <form onSubmit={handleCotizar}>
      <SelectMonedas />
      <SelectCriptoMonedas />
      <InputSubmit type="submit" value="Cotizar" />
    </form>
  
  </>);
};
