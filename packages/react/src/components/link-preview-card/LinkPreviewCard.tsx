/**
 * @module LinkPreviewCard
 * @description URL preview card showing title, description, image, and domain.
 */
import React, { forwardRef, useMemo, useCallback } from 'react';
import type { LinkPreviewCardProps } from '@wisp-ui/core/types/LinkPreviewCard.types';
import {
  resolveLinkPreviewCardColors,
  buildLinkPreviewCardContainerStyle,
  buildLinkPreviewImageStyle,
  buildLinkPreviewContentStyle,
  buildLinkPreviewTitleStyle,
  buildLinkPreviewDescriptionStyle,
  buildLinkPreviewDomainRowStyle,
  buildLinkPreviewFaviconStyle,
  buildLinkPreviewDomainStyle,
  buildLinkPreviewSkeletonStyle,
  buildLinkPreviewSkeletonImageStyle,
  buildLinkPreviewSkeletonLineStyle,
} from '@wisp-ui/core/styles/LinkPreviewCard.styles';
import { useTheme } from '../../providers';

// ---------------------------------------------------------------------------
// Helper: extract domain from URL
// ---------------------------------------------------------------------------

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// ---------------------------------------------------------------------------
// LinkPreviewCard
// ---------------------------------------------------------------------------

/**
 * LinkPreviewCard — URL preview card with image, title, description, and domain.
 *
 * @remarks
 * Renders Open Graph-style link previews like those seen in Telegram, Slack,
 * and Discord. Supports vertical (image on top) and horizontal (image on side)
 * layouts with three size presets.
 *
 * @example
 * ```tsx
 * <LinkPreviewCard
 *   url="https://github.com/wisp-ui/wisp"
 *   title="Wisp UI Kit"
 *   description="A monochrome, cross-platform UI kit for React and React Native."
 *   siteName="GitHub"
 *   image="https://opengraph.githubassets.com/..."
 * />
 * ```
 */
export const LinkPreviewCard = forwardRef<HTMLDivElement, LinkPreviewCardProps>(
  function LinkPreviewCard(
    {
      url,
      title,
      description,
      image,
      siteName,
      favicon,
      size = 'md',
      layout = 'vertical',
      onPress,
      loading = false,
      skeleton = false,
      style: userStyle,
      className,
      ...rest
    },
    ref,
  ) {
    const { theme } = useTheme();

    const colors = useMemo(
      () => resolveLinkPreviewCardColors(theme),
      [theme],
    );

    // ------ Skeleton ------
    if (skeleton) {
      const skelContainer = useMemo(
        () => buildLinkPreviewSkeletonStyle(layout, size, theme),
        [layout, size, theme],
      );
      const skelImage = useMemo(
        () => buildLinkPreviewSkeletonImageStyle(layout, size, theme),
        [layout, size, theme],
      );
      const skelLine1 = useMemo(
        () => buildLinkPreviewSkeletonLineStyle('70%', 14, theme),
        [theme],
      );
      const skelLine2 = useMemo(
        () => buildLinkPreviewSkeletonLineStyle('90%', 12, theme),
        [theme],
      );
      const skelLine3 = useMemo(
        () => buildLinkPreviewSkeletonLineStyle('40%', 11, theme),
        [theme],
      );
      const contentStyle = useMemo(
        () => buildLinkPreviewContentStyle(size),
        [size],
      );

      return (
        <div
          ref={ref}
          aria-hidden
          className={className}
          style={{ ...skelContainer, ...userStyle }}
          {...rest}
        >
          <div style={skelImage} />
          <div style={contentStyle}>
            <div style={skelLine1} />
            <div style={skelLine2} />
            <div style={skelLine3} />
          </div>
        </div>
      );
    }

    // ------ Normal render ------
    const containerStyle = useMemo(
      () => buildLinkPreviewCardContainerStyle(colors, layout, size, theme),
      [colors, layout, size, theme],
    );

    const imageStyle = useMemo(
      () => (image ? buildLinkPreviewImageStyle(layout, size) : undefined),
      [image, layout, size],
    );

    const contentStyle = useMemo(
      () => buildLinkPreviewContentStyle(size),
      [size],
    );

    const titleStyle = useMemo(
      () => buildLinkPreviewTitleStyle(colors, size, theme),
      [colors, size, theme],
    );

    const descStyle = useMemo(
      () => (description ? buildLinkPreviewDescriptionStyle(colors, size, theme) : undefined),
      [description, colors, size, theme],
    );

    const domainRowStyle = useMemo(
      () => buildLinkPreviewDomainRowStyle(),
      [],
    );

    const faviconStyle = useMemo(
      () => buildLinkPreviewFaviconStyle(),
      [],
    );

    const domainStyle = useMemo(
      () => buildLinkPreviewDomainStyle(colors, size, theme),
      [colors, size, theme],
    );

    const displayDomain = siteName || extractDomain(url);

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (onPress) {
          onPress();
        } else {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      },
      [onPress, url],
    );

    return (
      <div
        ref={ref}
        role="link"
        tabIndex={0}
        className={className}
        style={{ ...containerStyle, ...userStyle }}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent);
          }
        }}
        {...rest}
      >
        {/* Image */}
        {image && (
          <img
            src={image}
            alt={title || 'Link preview'}
            style={imageStyle}
            loading="lazy"
          />
        )}

        {/* Content */}
        <div style={contentStyle}>
          {title && <div style={titleStyle}>{title}</div>}
          {description && <div style={descStyle}>{description}</div>}

          {/* Domain row */}
          <div style={domainRowStyle}>
            {favicon && <img src={favicon} alt="" style={faviconStyle} />}
            <span style={domainStyle}>{displayDomain}</span>
          </div>
        </div>
      </div>
    );
  },
);

LinkPreviewCard.displayName = 'LinkPreviewCard';
