import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import videoRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

import Button from '../../../components/Button';
import FormField from '../../../components/FormField';

export default function CadastroVideo() {
  const history = useHistory();

  const [categorias, setCategorias] = useState([]);

  const categoryTitles = categorias.map(({ titulo }) => titulo);

  const { values, handleChange } = useForm({
    titulo: 'Video padrão',
    url: 'https://www.youtube.com/watch?v=jOAU81jdi-c',
    categoria: 'Front End',
  });

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
  }, []);

  return (
    <PageDefault>
      <h1>Página de Cadastro de Vídeo</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        // eslint-disable-next-line no-alert
        // alert('Video Cadastrado com sucesso!!!');

        const categoriaEscolhida = categorias.find(
          (categoria) => categoria.titulo === values.categoria,
        );

        console.log('categoria Escolhida:', categoriaEscolhida);

        videoRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhida.id,
        })
          .then(() => {
            console.log('Cadastrou com sucesso!');
            history.push('/');
          });
      }}
      >
        <FormField
          label="Titulo do Vídeo"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          type="text"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          type="text"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button type="submit">
          Cadastrar
        </Button>

      </form>

      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>
    </PageDefault>
  );
}
