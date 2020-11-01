import React, { useEffect, useState } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then((response)=>{
      setRepositories(response.data)
    })
  })
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:"tuliooov",
      url:"123456",
      techs:["Node", "react"]
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    const repositoryIndex = repositories.findIndex(repository => repository.id === id)
    const tmp = repositories
    tmp.splice(repositoryIndex,1)
    setRepositories(tmp)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => 
        (<li key={index}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
