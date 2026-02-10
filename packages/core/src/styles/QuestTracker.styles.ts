/**
 * @module components/quest-tracker
 * @description Style builders for the Wisp QuestTracker component.
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { QuestTrackerSizeConfig } from '../types/QuestTracker.types';
import { fontFamilyStacks } from '../tokens/shared';

// ---------------------------------------------------------------------------
// Container
// ---------------------------------------------------------------------------

export function buildQuestTrackerContainerStyle(
  themeColors: ThemeColors,
  sizeConfig: QuestTrackerSizeConfig,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: themeColors.background.canvas,
    border: `1px solid ${themeColors.border.subtle}`,
    borderRadius: 10,
    fontFamily: fontFamilyStacks.sans,
    overflow: 'hidden',
  };
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

export function buildQuestTrackerHeaderStyle(
  sizeConfig: QuestTrackerSizeConfig,
  collapsible: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: sizeConfig.padding,
    cursor: collapsible ? 'pointer' : 'default',
    userSelect: 'none',
  };
}

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------

export function buildQuestTrackerTitleStyle(
  themeColors: ThemeColors,
  sizeConfig: QuestTrackerSizeConfig,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.titleFontSize,
    fontWeight: 600,
    lineHeight: 1.4,
    color: themeColors.text.primary,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Chevron
// ---------------------------------------------------------------------------

export function buildQuestTrackerChevronStyle(
  themeColors: ThemeColors,
  expanded: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: themeColors.text.muted,
    transition: 'transform 200ms ease',
    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  };
}

// ---------------------------------------------------------------------------
// Objective list
// ---------------------------------------------------------------------------

export function buildQuestTrackerListStyle(
  sizeConfig: QuestTrackerSizeConfig,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: sizeConfig.gap,
    padding: `0 ${sizeConfig.padding.split(' ')[1]} ${sizeConfig.padding.split(' ')[0]}`,
  };
}

// ---------------------------------------------------------------------------
// Objective row
// ---------------------------------------------------------------------------

export function buildQuestTrackerObjectiveStyle(
  clickable: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: clickable ? 'pointer' : 'default',
  };
}

// ---------------------------------------------------------------------------
// Indicator
// ---------------------------------------------------------------------------

export function buildQuestTrackerIndicatorStyle(
  themeColors: ThemeColors,
  sizeConfig: QuestTrackerSizeConfig,
  status: 'incomplete' | 'complete' | 'in-progress',
): CSSStyleObject {
  const base: CSSStyleObject = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: sizeConfig.indicatorSize,
    height: sizeConfig.indicatorSize,
    borderRadius: sizeConfig.indicatorSize / 2,
  };

  switch (status) {
    case 'complete':
      return {
        ...base,
        backgroundColor: themeColors.status.success,
        color: '#FFFFFF',
      };
    case 'in-progress':
      return {
        ...base,
        border: `2px solid ${themeColors.status.info}`,
        backgroundColor: 'transparent',
        color: themeColors.status.info,
      };
    case 'incomplete':
    default:
      return {
        ...base,
        border: `2px solid ${themeColors.border.subtle}`,
        backgroundColor: 'transparent',
        color: 'transparent',
      };
  }
}

// ---------------------------------------------------------------------------
// Objective label
// ---------------------------------------------------------------------------

export function buildQuestTrackerLabelStyle(
  themeColors: ThemeColors,
  sizeConfig: QuestTrackerSizeConfig,
  status: 'incomplete' | 'complete' | 'in-progress',
): CSSStyleObject {
  return {
    fontSize: sizeConfig.labelFontSize,
    fontWeight: 400,
    lineHeight: 1.43,
    color: status === 'complete' ? themeColors.text.muted : themeColors.text.primary,
    textDecoration: status === 'complete' ? 'line-through' : 'none',
    margin: 0,
    flex: 1,
    minWidth: 0,
  };
}

// ---------------------------------------------------------------------------
// Counter text
// ---------------------------------------------------------------------------

export function buildQuestTrackerCounterStyle(
  themeColors: ThemeColors,
  sizeConfig: QuestTrackerSizeConfig,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.labelFontSize - 1,
    fontWeight: 500,
    color: themeColors.text.muted,
    whiteSpace: 'nowrap',
  };
}

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------

export function buildQuestTrackerProgressTrackStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    width: '100%',
    height: 4,
    backgroundColor: themeColors.border.subtle,
    borderRadius: 0,
  };
}

export function buildQuestTrackerProgressBarStyle(
  themeColors: ThemeColors,
  progress: number,
): CSSStyleObject {
  return {
    width: `${Math.min(Math.max(progress, 0), 100)}%`,
    height: '100%',
    backgroundColor: themeColors.status.success,
    transition: 'width 500ms ease',
  };
}
