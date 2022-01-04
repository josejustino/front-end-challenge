import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  .filter-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const Content = styled.div`
  .ant-checkbox-group {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    gap: 0.5rem;

    width: 100%;

    label.ant-checkbox-wrapper {
      span:last-child {
        font-size: 1rem;
        color: #fff;

        padding-right: 0;
      }
    }

    label.ant-checkbox-wrapper.ant-checkbox-group-item {
      margin-right: 0;
    }
  }
`;
