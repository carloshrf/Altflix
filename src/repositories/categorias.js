import URL_BACKEND_TOP from '../config';

const URL_CATEGORIES = `${URL_BACKEND_TOP}/categorias`;

function getAll() {
  return fetch(`${URL_CATEGORIES}`)
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }

      throw new Error('Não foi possível receber os dados :(');
    });
}

function getAllWithVideos() {
  return fetch(`${URL_CATEGORIES}?_embed=videos`)
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }

      throw new Error('Não foi possível receber os dados :(');
    });
}

function create(categoria) {
  return fetch(`${URL_CATEGORIES}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(categoria),
  })
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }

      throw new Error('Não foi possível cadastrar os dados :(');
    });
}

function remove(categoriaId) {
  return fetch(`${URL_CATEGORIES}/${categoriaId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  }).then(async (respostaDoServidor) => {
    if (respostaDoServidor.ok) {
      return console.log('Categoria removida!');
    }

    throw new Error('Não foi possível remover esta categoria.');
  });
}

export default {
  getAllWithVideos,
  getAll,
  create,
  remove,
};
