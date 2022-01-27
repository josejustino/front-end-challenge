import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  ForwardRefRenderFunction,
  ReactNode,
  useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer } from 'antd';
import { IconBaseProps } from 'react-icons';
import { FaChevronRight } from 'react-icons/fa';

import { Container, Content, Breadcrumb, HeaderButtons } from './styles';
import { Button } from '../Button';

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
  { breadcrumb, breadcrumbIcon, buttons, onSearch, drawerProps, children },
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
    if (onSearch) onSearch(value);
  };

  const handleNavigate = useCallback(
    (url?: string) => {
      if (!url) return;

      history.push(url);
    },
    [history],
  );

  const Breadcrumbs = useCallback(
    () => (
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
    ),
    [breadcrumb, breadcrumbIcon, handleNavigate],
  );

  useImperativeHandle(ref, () => {
    return { openFilter, closeFilter, searchFilter };
  });

  return (
    <Container>
      <Content>
        <Breadcrumbs />

        <HeaderButtons>
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
