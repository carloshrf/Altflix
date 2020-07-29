import React, { useState } from 'react';
import PageDefault from '../../../components/PageDefault';

import { Link } from 'react-router-dom';

export default function CadastroCategoria() {
  const [ categorias, setCategorias ] = useState(['Teste', 'Categoria2']);
  const [ values, setValues ] = useState({
    nome: '',
    descricao: '',
    cor: '#000000',
  });

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCategorias([...categorias, values]);
  }

  return (
    <PageDefault>
      <h1>Página de Cadastro de Categoria: { values.nome }</h1>

      <form onSubmit={handleSubmit}>

      <div>

        <label>
            Nome da Categoria:
            <input
              type="text"
              value={values.nome}
              onChange={(e) => {
                setValue('nome', e.target.value);
              }}
            />
        </label>

      </div>

      <div>
        <label>
          Descrição:
          <textarea
            type="text"
            value={values.descricao}
            onChange={(e) => {
              setValue('descricao', e.target.value);
            }}
          />
        </label>
      </div>

      <div>
        <label>
          Cor:
          <input
            type="color"
            value={values.cor}
            onChange={(e) => {
              setValue('cor', e.target.value);
            }}
          />
        </label>
      </div>

        <button>
          Cadastrar
        </button>
      </form>

      

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  )
}