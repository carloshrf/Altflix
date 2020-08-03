import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PageDefault from '../../../components/PageDefault';
import Button from '../../../components/Button';
import FormField from '../../../components/FormField';
import Modal from '../../../components/Modal';

import useForm from '../../../hooks/useForm';

import categoryRepository from '../../../repositories/categorias';

export default function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '#000',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {
    const URL_TOP = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://altflix.herokuapp.com/categorias';

    fetch(URL_TOP)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias([
          ...resposta,
        ]);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    setCategorias([...categorias, values]);

    categoryRepository.create(values);

    clearForm(valoresIniciais);
  }

  function handleRemove(e) {
    e.preventDefault();

    const { id } = e.target;

    const remainingCategories = categorias.filter((categoria) => categoria.id !== Number(id));

    setCategorias(remainingCategories);

    categoryRepository.remove(id);
  }

  function handleEdit(e) {
    e.preventDefault();

    setToggleModal(!toggleModal);
    console.log('edit', e.target.id);
  }

  function modalHandler(e) {
    e.preventDefault();
    setToggleModal(!toggleModal);
  }

  return (
    <PageDefault>
      <h1>
        Página de Cadastro de Categoria:
        { ` ${values.titulo}` }
      </h1>

      <form onSubmit={handleSubmit}>

        <FormField
          label="Nome da categoria"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
        <div>
          Carregando...
        </div>
      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.titulo}>
            {categoria.titulo}
            <button type="button" id={categoria.id} onClick={handleEdit}>editar</button>
            <button type="button" id={categoria.id} onClick={handleRemove}>remover</button>
          </li>
        ))}
      </ul>

      <Modal show={toggleModal} modalClosed={modalHandler}>
        Testando modal para edição de categoria :p
      </Modal>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}
