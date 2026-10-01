import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import './style.css'

function Inicio() {

  const navigate = useNavigate();
  const [todoslositems, setTodoslositems] = useState([]);

  useEffect(() => {
    // Consumimos el endpoint de objetos mágicos de la versión 2014 / SRD
    fetch(`https://dnd5eapi.co`)
      .then(response => response.json())
      .then(responseData => setTodoslositems(responseData.results))
      .catch(error => console.error("Error:", error));
  }, []); 

  console.log(todoslositems);

  if (todoslositems.length === 0) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="c-lista">
      {todoslositems.map((item) => (
        <div 
          className='c-lista-item' // Cambiado para mayor consistencia de nombres
          key={item.index}          // Es mejor poner el key en el contenedor principal del map
          onClick={() => navigate(`/item/${item.index}`)} // Redirige usando el index único del objeto mágico
        >
          {/* El campo 'index' es el identificador de texto amigable (ej: 'bag-of-holding') */}
          <p className="item-id">#{item.index}</p>
          <p className="item-name">{item.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Inicio