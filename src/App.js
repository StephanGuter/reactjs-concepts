import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'nodejs-concepts',
      url: 'https://github.com/StephanGuter/nodejs-concepts',
      techs: ['nodejs'],
    });
    
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/' + id);

    /*
      await api.get('repositories').then(response => {
        setRepositories(response.data);
      });
    */
   
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <h1>Repositories</h1>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            <ul>
              <li>{repository.title}</li>
              <li>{repository.techs}</li>
              <li>{repository.likes}</li>
            </ul>
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
