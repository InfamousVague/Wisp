import React, { forwardRef, useMemo, useState, useCallback } from 'react';
import { View, Pressable, Modal, TextInput, SectionList, SafeAreaView, StyleSheet, Text as RNText } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import Svg, { Path, Polyline, Circle, Line } from 'react-native-svg';
import { useThemeColors } from '../../providers';

export interface LocaleOption { code: string; label: string; nativeLabel?: string; region?: string; }

export const DEFAULT_LOCALE_OPTIONS: LocaleOption[] = [
  { code: 'en-US', label: 'English (US)', nativeLabel: 'English', region: 'Americas' },
  { code: 'es-ES', label: 'Spanish (Spain)', nativeLabel: 'Español', region: 'Europe' },
  { code: 'pt-BR', label: 'Portuguese (Brazil)', nativeLabel: 'Português', region: 'Americas' },
  { code: 'fr-FR', label: 'French (France)', nativeLabel: 'Français', region: 'Europe' },
  { code: 'de-DE', label: 'German (Germany)', nativeLabel: 'Deutsch', region: 'Europe' },
  { code: 'it-IT', label: 'Italian (Italy)', nativeLabel: 'Italiano', region: 'Europe' },
  { code: 'nl-NL', label: 'Dutch (Netherlands)', nativeLabel: 'Nederlands', region: 'Europe' },
  { code: 'sv-SE', label: 'Swedish (Sweden)', nativeLabel: 'Svenska', region: 'Europe' },
  { code: 'ru-RU', label: 'Russian (Russia)', nativeLabel: 'Русский', region: 'Europe' },
  { code: 'ja-JP', label: 'Japanese (Japan)', nativeLabel: '日本語', region: 'Asia' },
  { code: 'ko-KR', label: 'Korean (South Korea)', nativeLabel: '한국어', region: 'Asia' },
  { code: 'zh-CN', label: 'Chinese (Simplified)', nativeLabel: '中文(简体)', region: 'Asia' },
  { code: 'zh-TW', label: 'Chinese (Traditional)', nativeLabel: '中文(繁體)', region: 'Asia' },
  { code: 'hi-IN', label: 'Hindi (India)', nativeLabel: 'हिन्दी', region: 'Asia' },
  { code: 'ar-SA', label: 'Arabic (Saudi Arabia)', nativeLabel: 'العربية', region: 'Middle East' },
];
const REGION_ORDER = ['Americas', 'Europe', 'Asia', 'Middle East'];
type LocalePickerSize = 'sm' | 'md' | 'lg';
const sizeMap: Record<LocalePickerSize, { height: number; fontSize: number; paddingX: number; iconSize: number }> = {
  sm: { height: 32, fontSize: 13, paddingX: 10, iconSize: 14 },
  md: { height: 40, fontSize: 14, paddingX: 14, iconSize: 16 },
  lg: { height: 48, fontSize: 16, paddingX: 16, iconSize: 18 },
};
export interface LocalePickerProps {
  value?: string; defaultValue?: string; onChange?: (code: string) => void; options?: LocaleOption[];
  size?: LocalePickerSize; placeholder?: string; searchable?: boolean; disabled?: boolean;
  label?: string; groupByRegion?: boolean; style?: ViewStyle;
}
export const LocalePicker = forwardRef<View, LocalePickerProps>(function LocalePicker(
  { value: controlledValue, defaultValue, onChange, options: optionsProp, size = 'md',
    placeholder = 'Select language', searchable = true, disabled = false, label, groupByRegion = true, style: userStyle }, ref,
) {
  const themeColors = useThemeColors();
  const cfg = sizeMap[size];
  const options = optionsProp ?? DEFAULT_LOCALE_OPTIONS;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const selectedValue = isControlled ? controlledValue : internalValue;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectedOption = options.find((opt) => opt.code === selectedValue);
  const handleSelect = useCallback((code: string) => { if (!isControlled) setInternalValue(code); onChange?.(code); setIsOpen(false); setSearchQuery(''); }, [isControlled, onChange]);
  const filteredOptions = useMemo(() => { if (!searchQuery.trim()) return options; const q = searchQuery.toLowerCase(); return options.filter((opt) => opt.label.toLowerCase().includes(q) || (opt.nativeLabel && opt.nativeLabel.toLowerCase().includes(q)) || opt.code.toLowerCase().includes(q)); }, [options, searchQuery]);
  const sections = useMemo(() => {
    if (!groupByRegion) return [{ title: '', data: filteredOptions }];
    const groups: Record<string, LocaleOption[]> = {}; const ungrouped: LocaleOption[] = [];
    for (const opt of filteredOptions) { if (opt.region) { if (!groups[opt.region]) groups[opt.region] = []; groups[opt.region].push(opt); } else ungrouped.push(opt); }
    const sortedRegions = Object.keys(groups).sort((a, b) => { const ai = REGION_ORDER.indexOf(a); const bi = REGION_ORDER.indexOf(b); return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi); });
    const result = sortedRegions.map((r) => ({ title: r, data: groups[r] })); if (ungrouped.length > 0) result.push({ title: 'Other', data: ungrouped }); return result;
  }, [filteredOptions, groupByRegion]);
  const triggerStyle = useMemo<ViewStyle>(() => ({ flexDirection: 'row', alignItems: 'center', height: cfg.height, paddingHorizontal: cfg.paddingX, borderRadius: 8, borderWidth: 1, borderColor: themeColors.border.subtle, backgroundColor: themeColors.background.surface, gap: 8, opacity: disabled ? 0.4 : 1 }), [cfg, themeColors, disabled]);
  return (
    <View ref={ref} style={[{ gap: 6 }, userStyle]}>
      {label && <RNText style={{ fontSize: 14, fontWeight: '500', color: themeColors.text.primary } as TextStyle}>{label}</RNText>}
      <Pressable onPress={() => !disabled && setIsOpen(true)} disabled={disabled} accessibilityRole="button" style={triggerStyle}>
        <Svg width={cfg.iconSize} height={cfg.iconSize} viewBox="0 0 24 24" fill="none"><Circle cx={12} cy={12} r={9} stroke={themeColors.text.secondary} strokeWidth={2} /><Line x1={3.6} y1={9} x2={20.4} y2={9} stroke={themeColors.text.secondary} strokeWidth={2} /><Line x1={3.6} y1={15} x2={20.4} y2={15} stroke={themeColors.text.secondary} strokeWidth={2} /><Path d="M12 3a15 15 0 014 18" stroke={themeColors.text.secondary} strokeWidth={2} strokeLinecap="round" /><Path d="M12 3a15 15 0 00-4 18" stroke={themeColors.text.secondary} strokeWidth={2} strokeLinecap="round" /></Svg>
        <RNText style={{ flex: 1, fontSize: cfg.fontSize, color: selectedOption ? themeColors.text.primary : themeColors.text.muted } as TextStyle} numberOfLines={1}>{selectedOption ? selectedOption.label : placeholder}</RNText>
        <Svg width={cfg.iconSize} height={cfg.iconSize} viewBox="0 0 24 24" fill="none"><Polyline points="6 9 12 15 18 9" stroke={themeColors.text.secondary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>
      </Pressable>
      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => { setIsOpen(false); setSearchQuery(''); }} statusBarTranslucent>
        <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]} onPress={() => { setIsOpen(false); setSearchQuery(''); }}>
          <SafeAreaView style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View style={{ backgroundColor: themeColors.background.raised, borderRadius: 16, maxHeight: '70%', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 24, elevation: 8 }}>
                {label && <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}><RNText style={{ fontSize: 16, fontWeight: '600', color: themeColors.text.onRaised } as TextStyle}>{label}</RNText></View>}
                {searchable && <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}><TextInput value={searchQuery} onChangeText={setSearchQuery} placeholder="Search..." placeholderTextColor={themeColors.text.muted} autoFocus style={{ height: 36, borderRadius: 8, borderWidth: 1, borderColor: themeColors.border.subtle, backgroundColor: themeColors.background.surface, paddingHorizontal: 12, fontSize: 14, color: themeColors.text.onRaised } as TextStyle} /></View>}
                <SectionList sections={sections} keyExtractor={(item) => item.code} renderSectionHeader={({ section }) => section.title ? <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 }}><RNText style={{ fontSize: 11, fontWeight: '600', color: themeColors.text.onRaisedSecondary, textTransform: 'uppercase', letterSpacing: 0.5 } as TextStyle}>{section.title}</RNText></View> : null}
                  renderItem={({ item }) => { const isSelected = item.code === selectedValue; return (<Pressable onPress={() => handleSelect(item.code)} style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: pressed ? themeColors.accent.highlight : 'transparent' })}><RNText style={{ flex: 1, fontSize: 14, fontWeight: isSelected ? '600' : '400', color: themeColors.text.onRaised } as TextStyle} numberOfLines={1}>{item.label}</RNText>{item.nativeLabel && item.nativeLabel !== item.label && <RNText style={{ fontSize: 13, color: themeColors.text.onRaisedSecondary } as TextStyle}>{item.nativeLabel}</RNText>}{isSelected && <Svg width={16} height={16} viewBox="0 0 24 24" fill="none"><Polyline points="20 6 9 17 4 12" stroke={themeColors.accent.primary} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" /></Svg>}</Pressable>); }}
                  ListEmptyComponent={<View style={{ padding: 24, alignItems: 'center' }}><RNText style={{ fontSize: 14, color: themeColors.text.onRaisedSecondary } as TextStyle}>No results found</RNText></View>} />
              </View>
            </Pressable>
          </SafeAreaView>
        </Pressable>
      </Modal>
    </View>
  );
});
LocalePicker.displayName = 'LocalePicker';
