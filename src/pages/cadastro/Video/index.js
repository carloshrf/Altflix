import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import videoRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

import Button from '../../../components/Button';
import FormField from '../../../components/FormField';

const CreateCategoryButton = styled(Link)`
  padding: 17px 10px 15px;
  background-color: #C20A00;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  justify-items: center;
  display: inline-block;
  transition: background-color, color 0.2s;
  color: #c3c3c3;

  &:hover {
    background-color: #8F0800;
    color: #FFF;
  }
`;

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

        const categoriaEscolhida = categorias.find(
          (categoria) => categoria.titulo === values.categoria,
        );

        videoRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhida.id,
        })
          .then(() => {
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

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit">
            Cadastrar
          </Button>

          <CreateCategoryButton to="/cadastro/categoria">
            Cadastrar Categoria
          </CreateCategoryButton>
        </div>

      </form>
    </PageDefault>
  );
}
