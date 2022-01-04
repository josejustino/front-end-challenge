interface MovieImageProps {
  name: string;
  path: string;
  size: string;
  pathFallback?: string;
}

const IMAGE_PATH = 'https://www.themoviedb.org/t/p/';

export const movieImageSrc = (
  path: string,
  size: string,
  pathFallback = '',
): string => {
  const basePath = `${IMAGE_PATH}/${size}`;
  return path ? `${basePath}${path}` : `${basePath}${pathFallback}`;
};

export const MovieImage: React.FC<MovieImageProps> = ({
  name,
  path,
  size,
  pathFallback,
}) => {
  function buildSrc() {
    return movieImageSrc(path, size, pathFallback);
  }

  return <img loading="lazy" src={buildSrc()} alt={name} />;
};
