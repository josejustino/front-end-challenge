import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  ForwardRefRenderFunction,
  ReactNode,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer } from 'antd';
import { IconBaseProps } from 'react-icons';
import { FaChevronRight } from 'react-icons/fa';

import { Container, Content, Breadcrumb, HeaderButtons } from './styles';
import { Button } from '../Button';
// import { SearchFilter } from '../SearchFilter';

interface BreadcrumbProps {
  title: string;
  url?: string;
}

interface HeaderProps {
  breadcrumb: Array<BreadcrumbProps>;
  breadcrumbIcon: React.ComponentType<IconBaseProps>;
  buttons?: Array<{
    content: string;
    marginLess?: boolean;
    color?: string;
    onClick?: () => void;
  }>;
  drawerProps?: object;
  onSearch?: (value: string) => void;
  children?: ReactNode;
}

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

  const handleNavigate = (url?: string) => {
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

          {children && (
            <Button
              content="Filtrar"
              size="middle"
              marginLess
              onClick={openFilter}
            />
          )}

          {buttons?.map(buttonProps => {
            return <Button key={buttonProps?.content} {...buttonProps} />;
          })}
        </HeaderButtons>

        {children && (
          <Drawer
            placement="top"
            closable={false}
            visible={showFilters}
            getContainer={false}
            bodyStyle={{ background: '#37343c' }}
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
