import { useState } from 'react';
import './CalculadoraStyle.css';

function Calculadora() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [resultado, setResultado] = useState([]);
  const [envioHabilitado, setEnvioHabilitado] = useState(false);

  const negaAlturaNegativa = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setAltura(value);
    } else {
      setAltura('');
    }
    setEnvioHabilitado(value !== '' && peso !== '');
  };

  const negaPesoNegativo = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setPeso(value);
    } else {
      setPeso('');
    }
    setEnvioHabilitado(altura !== '' && value !== '');
  };

  const calculaIMC = () => {
    const alturaPessoa = altura / 100;
    const imc = peso / (alturaPessoa * alturaPessoa);
    const classificar = getClasseIMC(imc);
    setResultado([...resultado, { altura, peso, imc: imc.toFixed(2), classificar}]);
    setAltura ('');
    setPeso('');
  };

const getClasseIMC = (imc) => {
  if (imc < 18.5) return 'Abaixo do peso';
  else if (imc < 24.9) return 'Peso normal';
  else if (imc < 29.9) return 'Sobrepeso';
  else if (imc < 34.9) return 'Obesidade grau I';
  else if (imc < 39.9) return 'Obesidade grau II';
  else return 'Obesidade grau III';
};

return (
  <div className="Calculadora">
    <h1>Calculadora IMC</h1>
    <div>
      <label>Altura em centímetros:</label>
      <input type="number" value={altura} onChange={negaAlturaNegativa} required />
    </div>
    <div>
      <label>Peso em kg:</label>
      <input type="number" value={peso} onChange={negaPesoNegativo} required />
    </div>
    <button onClick={calculaIMC} disabled={!envioHabilitado}>Calcular IMC</button>
    <h2>Resultado:</h2>
    <table>
      <thead>
        <tr>
          <th>Altura</th>
          <th>Peso</th>
          <th>IMC</th>
          <th>Classificação</th>
        </tr>
      </thead>
    <tbody>
      {resultado.map((resultado, index) => (
        <tr key={index}>
          <td>{resultado.altura}</td>
          <td>{resultado.peso}</td>
          <td>{resultado.imc}</td>
          <td>{resultado.classificar}</td>
        </tr>
      ))}
    </tbody>
    </table>
  </div>
)
}

export default Calculadora;