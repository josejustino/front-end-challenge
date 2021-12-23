import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  ForwardRefRenderFunction,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { IconBaseProps } from 'react-icons';
import { FaChevronRight } from 'react-icons/fa';

import { Container, Content, Breadcrumb, HeaderButtons } from './styles';
// import { SearchFilter } from '../SearchFilter';

interface Breadcrumb {
  title: string;
  url: string;
}

type HeaderProps = {
  breadcrumb: Array<Breadcrumb>;
  breadcrumbIcon: React.ComponentType<IconBaseProps>;
  buttons?: Array<object>;
  drawerProps?: object;
  onSearch?: (value: string) => void;
};

const HeaderComponent: ForwardRefRenderFunction<{}, HeaderProps> = (
  {
    breadcrumb,
    breadcrumbIcon,
    buttons,
    onSearch = value => value,
    drawerProps,
    children,
  },
  ref,
) => {
  const history = useHistory();

  const [showFilters, setShowFilters] = useState(false);

  const openFilter = () => {
    setShowFilters(true);
  };

  const closeFilter = () => {
    setShowFilters(false);
  };

  const searchFilter = (value: string) => {
    onSearch(value);
  };

  const handleNavigate = (url: string) => {
    if (!url) return;

    history.push(url);
  };

  const Breadcrumbs = () => (
    <Breadcrumb>
      {breadcrumb.map((b, index) => {
        const Icon = index === 0 ? breadcrumbIcon : FaChevronRight;

        return (
          <div
            key={b?.title}
            className={
              index < breadcrumb.length - 1
                ? 'breadcrumb__item disabled'
                : 'breadcrumb__item'
            }
          >
            <Icon size={index === 0 ? 25 : 12} />
            <span
              className={
                b?.url ? 'breadcrumb__text navigate' : 'breadcrumb__text'
              }
              onClick={() => handleNavigate(b?.url)}
            >
              {b?.title}
            </span>
          </div>
        );
      })}
    </Breadcrumb>
  );

  useImperativeHandle(ref, () => {
    return { openFilter, closeFilter, searchFilter };
  });

  return (
    <Container>
      <Content>
        <Breadcrumbs />

        <HeaderButtons>
          {/* {onSearch && (
            <SearchFilter
              width="256px"
              name="search"
              placeholder="Digite e aperte Enter"
              onSearch={searchFilter}
            />
          )} */}

          {/* {children && (
            <Button
              content="Filtrar"
              icon="filter"
              size="small"
              labelPosition="left"
              color="green"
              onClick={openFilter}
            />
          )}

          {buttons?.map(buttonProps => {
            return <Button key={buttonProps?.content} {...buttonProps} />;
          })} */}
        </HeaderButtons>

        {children && (
          <Drawer
            placement="top"
            closable={false}
            visible={showFilters}
            getContainer={false}
            style={{ position: 'absolute' }}
            {...drawerProps}
          >
            {children}
          </Drawer>
        )}
      </Content>
    </Container>
  );
};

export const Header = forwardRef(HeaderComponent);
