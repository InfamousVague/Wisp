import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarSection,
  SidebarItem,
  Text,
  useThemeColors,
} from '@wisp-ui/react';
import {
  Palette,
  Layers,
  LayoutGrid,
  Component,
  Home,
  BookOpen,
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { label: 'Home', path: '/', icon: Home },
      { label: 'Docs', path: '/docs', icon: BookOpen },
    ],
  },
  {
    label: 'Library',
    items: [
      { label: 'Tokens', path: '/tokens', icon: Palette },
      { label: 'Primitives', path: '/primitives', icon: Layers },
      { label: 'Layouts', path: '/layouts', icon: LayoutGrid },
      { label: 'Components', path: '/components', icon: Component },
    ],
  },
];

export function NavSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const colors = useThemeColors();

  return (
    <Sidebar
      width="default"
      position="left"
      style={{
        width: '100%',
        borderRight: 'none',
        borderRadius: 0,
        height: '100%',
      }}
    >
      {/* Logo area */}
      <div style={{ padding: '20px 16px 12px' }}>
        <div
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <Text size="lg" weight="bold">
            wisp
          </Text>
          <Text size="xs" color="tertiary" weight="semibold">
            UI Kit
          </Text>
        </div>
      </div>

      {/* Nav sections */}
      {NAV_SECTIONS.map((section) => (
        <SidebarSection key={section.label} title={section.label}>
          {section.items.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <SidebarItem
                key={item.path}
                icon={<item.icon size={16} />}
                label={item.label}
                active={isActive}
                onClick={() => navigate(item.path)}
              />
            );
          })}
        </SidebarSection>
      ))}
    </Sidebar>
  );
}
