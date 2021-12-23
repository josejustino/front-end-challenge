import React, { useEffect, useState } from 'react';

import { useModal } from '../../hooks/useModal';

import { API_KEY } from '../../config';

import api from '../../services/api';

import {
  ContainerOverlay,
  ContainerModal,
  ButtonsGroup,
  ButtonCancel,
  ButtonConfirm,
} from './styles';

interface GenresProps {
  id: number;
  name: string;
}

interface GenresResponseProps {
  genres: Array<GenresProps>;
}

const FiltroModal: React.FC = () => {
  const [genresList, setGenresList] = useState<Array<GenresProps>>([]);

  const { modalState, closeModal } = useModal();
  const { visible } = modalState;

  useEffect(() => {
    api
      .get<GenresResponseProps>(`genre/movie/list`, {
        params: {
          api_key: API_KEY,
          language: 'pt-BR',
        },
      })
      .then(({ status, data }) => {
        if (status === 200) {
          const { genres } = data;

          setGenresList(genres);
        }
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <>
      {visible && (
        <ContainerOverlay>
          <ContainerModal>
            <span className="title">Filtro por Gênero</span>
            <div className="genres">
              {genresList?.map(genre => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>
            <ButtonsGroup>
              <ButtonCancel type="button" onClick={closeModal}>
                Cancelar
              </ButtonCancel>
              <ButtonConfirm type="button">Confirmar</ButtonConfirm>
            </ButtonsGroup>
          </ContainerModal>
        </ContainerOverlay>
      )}
    </>
  );
};

export default FiltroModal;
