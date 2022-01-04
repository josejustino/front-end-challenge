import React, { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Checkbox } from 'antd';

import api from '../../../../../services/api';

import { Container, Content } from './styles';

interface GenresProps {
  control: Control<{
    genres: Array<string>;
  }>;
}

interface GenresResponseProps {
  genres: Array<{
    id: number;
    name: string;
  }>;
}

interface GenresFilters {
  label: string;
  value: string;
}

export const Genres: React.FC<GenresProps> = ({ control, ...props }) => {
  const [genresList, setGenresList] = useState<Array<GenresFilters>>([]);

  useEffect(() => {
    api
      .get<GenresResponseProps>(`genre/movie/list`)
      .then(({ status, data }) => {
        if (status === 200) {
          const { genres } = data;

          setGenresList(
            genres?.map(genre => {
              return {
                label: genre?.name,
                value: genre?.id?.toString(),
              };
            }),
          );
        }
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <Controller
      name="genres"
      control={control}
      render={({ field }) => (
        <Container>
          <span className="filter-title">Filtro por Gênero</span>
          <Content>
            <Checkbox.Group options={genresList} {...field} {...props} />
          </Content>
        </Container>
      )}
    />
  );
};
