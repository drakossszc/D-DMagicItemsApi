import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.css'

function Inicio() {
  const navigate = useNavigate()

  const [todosLosItems, setTodosLosItems] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [rareza, setRareza] = useState('Todas')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/2014/magic-items')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los objetos mágicos')
        }

        return response.json()
      })
      .then(data => {
        setTodosLosItems(data.results)
        setCargando(false)
      })
      .catch(error => {
        console.error('Error:', error)
        setCargando(false)
      })
  }, [])

  

  return (
    <main className="inicio">

      <h1>Objetos mágicos</h1>

      {/* Buscador */}
      <div className="controles">

        <input
          type="text"
          placeholder="Buscar objeto mágico..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* Filtro por rareza */}
        <select
          value={rareza}
          onChange={(e) => setRareza(e.target.value)}
        >
          <option value="Todas">Todas las rarezas</option>
          <option value="Common">Common</option>
          <option value="Uncommon">Uncommon</option>
          <option value="Rare">Rare</option>
          <option value="Very Rare">Very Rare</option>
          <option value="Legendary">Legendary</option>
          <option value="Artifact">Artifact</option>
        </select>

      </div>

      {/* Cantidad de resultados */}
      <p>
        Resultados: {itemsFiltrados.length}
      </p>

      {/* Lista */}
      <div className="c-lista">

        {itemsFiltrados.length > 0 ? (

          itemsFiltrados.map((item) => (

            <div
              className="c-lista-item"
              key={item.index}
              onClick={() => navigate(`/item/${item.index}`)}
            >

              <p className="item-id">
                #{item.index}
              </p>

              <p className="item-name">
                {item.name}
              </p>

              <p className="item-rarity">
                Rareza: {item.rarity}
              </p>

            </div>

          ))

        ) : (

          <p>
            No se encontraron objetos mágicos.
          </p>

        )}

      </div>

    </main>
  )
}

export default Inicio
