import React from 'react';
import { PacmanLoader } from 'react-spinners';
import { css } from '@emotion/react';

import { LoadingContainer, LoadingContent } from './styles';

interface LoadingProps {
  loading: boolean;
  iconSize: string;
}

export const Loading: React.FC<LoadingProps> = ({ loading, iconSize }) => {
  const override = css`
    display: block;
    margin: 1rem auto;
  `;

  return (
    <>
      {loading && (
        <LoadingContainer>
          <LoadingContent>
            <PacmanLoader
              loading={loading}
              size={iconSize}
              color="#FFFFFF"
              css={override}
            />
          </LoadingContent>
        </LoadingContainer>
      )}
    </>
  );
};
