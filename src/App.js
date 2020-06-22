import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'title test',
      url: 'http://github/test',
      techs: ['react'],
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      setRepositories(repositories.filter((repo) => repo.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title} - id: {repository.id}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
