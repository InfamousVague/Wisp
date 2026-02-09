/**
 * @module Navbar
 */
import React, { forwardRef, useMemo, createContext, useContext } from 'react';
import type {
  NavbarProps,
  NavbarBrandProps,
  NavbarContentProps,
  NavbarItemProps,
  NavbarVariant,
} from '@wisp-ui/core/types/Navbar.types';
import {
  buildNavbarStyle,
  buildNavbarBrandStyle,
  buildNavbarContentStyle,
  buildNavbarItemStyle,
} from '@wisp-ui/core/styles/Navbar.styles';
import { useThemeColors } from '../../providers';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface NavbarContextValue {
  variant: NavbarVariant;
}

const NavbarContext = createContext<NavbarContextValue>({ variant: 'solid' });

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  function Navbar(
    {
      variant = 'solid',
      sticky = false,
      height = 56,
      children,
      style: userStyle,
      className,
      ...rest
    },
    ref,
  ) {
    const themeColors = useThemeColors();

    const navStyle = useMemo(
      () => buildNavbarStyle(variant, sticky, height, themeColors),
      [variant, sticky, height, themeColors],
    );

    const ctx = useMemo(() => ({ variant }), [variant]);

    return (
      <NavbarContext.Provider value={ctx}>
        <nav ref={ref} style={{ ...navStyle, ...userStyle }} className={className} {...rest}>
          {children}
        </nav>
      </NavbarContext.Provider>
    );
  },
);
Navbar.displayName = 'Navbar';

// ---------------------------------------------------------------------------
// NavbarBrand
// ---------------------------------------------------------------------------

export const NavbarBrand = forwardRef<HTMLDivElement, NavbarBrandProps>(
  function NavbarBrand({ children, style: userStyle, className, ...rest }, ref) {
    const brandStyle = useMemo(() => buildNavbarBrandStyle(), []);

    return (
      <div ref={ref} style={{ ...brandStyle, ...userStyle }} className={className} {...rest}>
        {children}
      </div>
    );
  },
);
NavbarBrand.displayName = 'NavbarBrand';

// ---------------------------------------------------------------------------
// NavbarContent
// ---------------------------------------------------------------------------

export const NavbarContent = forwardRef<HTMLDivElement, NavbarContentProps>(
  function NavbarContent(
    { align = 'end', children, style: userStyle, className, ...rest },
    ref,
  ) {
    const contentStyle = useMemo(() => buildNavbarContentStyle(align), [align]);

    return (
      <div ref={ref} style={{ ...contentStyle, ...userStyle }} className={className} {...rest}>
        {children}
      </div>
    );
  },
);
NavbarContent.displayName = 'NavbarContent';

// ---------------------------------------------------------------------------
// NavbarItem
// ---------------------------------------------------------------------------

export const NavbarItem = forwardRef<HTMLDivElement, NavbarItemProps>(
  function NavbarItem(
    { active = false, children, style: userStyle, className, ...rest },
    ref,
  ) {
    const themeColors = useThemeColors();
    const { variant } = useContext(NavbarContext);
    const isSolid = variant === 'solid';

    const itemStyle = useMemo(
      () => buildNavbarItemStyle(active, themeColors, isSolid),
      [active, themeColors, isSolid],
    );

    return (
      <div ref={ref} style={{ ...itemStyle, ...userStyle }} className={className} {...rest}>
        {children}
      </div>
    );
  },
);
NavbarItem.displayName = 'NavbarItem';
