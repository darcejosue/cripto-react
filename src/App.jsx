import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Formulario } from "./components/Formulario";
import { Resultado } from "./components/Resultado";
import { Spinner } from "./components/Spinner";

import ImagenCripto from "./img/imagen-criptos.png";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-botton: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Footer = styled.footer`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  margin-top: 80px;
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultados] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const { moneda, criptoMoneda } = monedas;
      const cotizarCripto = async () => {
        setCargando(true);
        setResultados({});
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultados(resultado.DISPLAY[criptoMoneda][moneda]);
        setCargando(false);
      };

      cotizarCripto();
    }
  }, [monedas]);

  return (
    <>
      <Contenedor>
        <Imagen src={ImagenCripto} alt="imagen de criptos" />
        <div>
          <Heading>Cotiza las criptomonedas al instante</Heading>
          <Formulario setMonedas={setMonedas} />
          {cargando && <Spinner />}
          {resultado.PRICE && <Resultado resultado={resultado} />}
        </div>
      </Contenedor>
      <Footer>
        Create by <span>Josue M Darce</span> <br />
        <a href="https://github.com/darcejosue?tab=repositories"><code>Github link</code> </a>
      </Footer>
    </>
  );
}

export default App;
