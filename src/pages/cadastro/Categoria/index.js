import React, { useState } from 'react';
import PageDefault from '../../../components/PageDefault';

import { Link } from 'react-router-dom';

import FormField from '../../../components/FormField';

export default function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const [ categorias, setCategorias ] = useState([]);
  const [ values, setValues ] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCategorias([...categorias, values]);

    setValues(valoresIniciais);
  }

  function handleChange(e) {
    const { value } = e.target;
    console.log(values);
    console.log(value, e.target.getAttribute('name'));

    setValue(
      e.target.getAttribute('name'),
      value
    );
  }

  return (
    <PageDefault>
      <h1>Página de Cadastro de Categoria: { values.nome }</h1>

      <form onSubmit={handleSubmit}>

      <FormField
        label="Nome da categoria"
        type="text"
        name="nome"
        value={values.nome}
        onChange={handleChange}
      />

      <div>
        <label>
          Descrição:
          <textarea
            type="text"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
          />
        </label>
      </div>

      <FormField
        label="Cor"
        type="color"
        name="cor"
        value={values.cor}
        onChange={handleChange}
      />

        <button>
          Cadastrar
        </button>
      </form>

      <ul>
        {categorias.map((categoria, indice) => {
          return (
            <li key={`${categoria}${indice}`}>
              {categoria.nome}
            </li>
          );
        })}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  )
}