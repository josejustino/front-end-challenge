import styled from 'styled-components';

export const Container = styled.div`
  background-color: #4953b8;
  box-shadow: 0 1px 3px 0px rgb(0 0 0 / 30%);

  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 4.7rem;
  z-index: 10;
  padding: 0 1.25rem 0 1.25rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0;
  padding-left: 0;
  padding-right: 0;
  position: relative;
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  .breadcrumb__item {
    display: flex;
    align-items: center;

    &:not(:first-child) {
      svg {
        fill: #d6d6d6;
      }
    }

    &.disabled {
      color: #d6d6d6;
    }

    .breadcrumb__text {
      display: inline-block;
      font-size: 1rem;
      font-weight: 500;
      margin: 0 0.5rem;

      &.navigate {
        cursor: pointer;
      }

      &.navigate:hover {
        color: #fff;
        text-decoration: underline;

        transition: color 0.2s;
      }
    }
  }
`;

export const HeaderButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  span.ant-input-search.ant-input-affix-wrapper {
    height: 33px;
    width: 256px;
  }

  button {
    margin-left: 8px !important;
    margin-right: 0 !important;
  }
`;
