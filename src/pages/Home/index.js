import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageDefault from '../../components/PageDefault';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';

import categoriasRepository from '../../repositories/categorias';

const Warning = styled.h2`
  text-align: center;
  padding-top: 30px;
`;

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    categoriasRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        setDadosIniciais(categoriasComVideos);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <PageDefault paddingAll={0}>

      {/* eslint-disable-next-line no-nested-ternary */}
      {loading ? <span>Carregando...</span> : dadosIniciais.length >= 1 && dadosIniciais !== []
        ? dadosIniciais.map((categoria, indice) => {
          if (indice === 0) {
            return (
              <div key={categoria.id}>
                <BannerMain
                  videoTitle={dadosIniciais[0].videos[0].titulo}
                  url={dadosIniciais[0].videos[0].url}
                  videoDescription="O que é Front-end? Trabalhando na área os termos HTML, CSS e Javascript"
                />
                <Carousel
                  ignoreFirstVideo
                  category={dadosIniciais[0]}
                />
              </div>
            );
          }

          return (
            <Carousel
              key={categoria.id}
              category={categoria}
            />
          );
        })
        : <Warning>Não há vídeos disponíveis :(. Adicione clicando em Novo vídeo!</Warning>}

    </PageDefault>
  );
}

export default Home;
