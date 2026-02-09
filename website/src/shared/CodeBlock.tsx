import React, { useState, useCallback, useMemo } from 'react';
import { useThemeColors } from '@wisp-ui/react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Lightweight JSX/TSX syntax highlighter
// ---------------------------------------------------------------------------

const DARK_TOKEN_COLORS = {
  tag: '#7dd3fc',        // Component/element names — sky-300
  attr: '#c4b5fd',       // Prop names — violet-300
  string: '#86efac',     // String values — green-300
  keyword: '#f0abfc',    // import, from, const, etc. — fuchsa-300
  comment: 'rgba(255, 255, 255, 0.35)',
  bracket: '#fcd34d',    // < > { } — amber-300
  punctuation: 'rgba(255, 255, 255, 0.5)',
  number: '#fdba74',     // Numbers — orange-300
  default: 'rgba(255, 255, 255, 0.85)',
};

const LIGHT_TOKEN_COLORS = {
  tag: '#0369a1',        // Component/element names — sky-700
  attr: '#6d28d9',       // Prop names — violet-700
  string: '#15803d',     // String values — green-700
  keyword: '#a21caf',    // import, from, const, etc. — fuchsia-700
  comment: 'rgba(0, 0, 0, 0.4)',
  bracket: '#b45309',    // < > { } — amber-700
  punctuation: 'rgba(0, 0, 0, 0.55)',
  number: '#c2410c',     // Numbers — orange-700
  default: 'rgba(0, 0, 0, 0.9)',
};

interface Token {
  type: keyof typeof DARK_TOKEN_COLORS;
  text: string;
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  // Comment line
  if (line.trimStart().startsWith('//')) {
    return [{ type: 'comment', text: line }];
  }

  // Block comment
  if (line.trimStart().startsWith('/*') || line.trimStart().startsWith('*')) {
    return [{ type: 'comment', text: line }];
  }

  while (i < line.length) {
    // Whitespace
    if (line[i] === ' ' || line[i] === '\t') {
      let end = i;
      while (end < line.length && (line[end] === ' ' || line[end] === '\t')) end++;
      tokens.push({ type: 'default', text: line.slice(i, end) });
      i = end;
      continue;
    }

    // Inline comment
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ type: 'comment', text: line.slice(i) });
      break;
    }

    // JSX string (double quotes)
    if (line[i] === '"') {
      let end = i + 1;
      while (end < line.length && line[end] !== '"') end++;
      tokens.push({ type: 'string', text: line.slice(i, end + 1) });
      i = end + 1;
      continue;
    }

    // JSX string (single quotes)
    if (line[i] === "'") {
      let end = i + 1;
      while (end < line.length && line[end] !== "'") end++;
      tokens.push({ type: 'string', text: line.slice(i, end + 1) });
      i = end + 1;
      continue;
    }

    // Template string
    if (line[i] === '`') {
      let end = i + 1;
      while (end < line.length && line[end] !== '`') end++;
      tokens.push({ type: 'string', text: line.slice(i, end + 1) });
      i = end + 1;
      continue;
    }

    // Brackets and JSX tags
    if (line[i] === '<') {
      tokens.push({ type: 'bracket', text: '<' });
      i++;
      // Check for closing slash
      if (i < line.length && line[i] === '/') {
        tokens.push({ type: 'bracket', text: '/' });
        i++;
      }
      // Component/element name
      let end = i;
      while (end < line.length && /[a-zA-Z0-9._]/.test(line[end])) end++;
      if (end > i) {
        tokens.push({ type: 'tag', text: line.slice(i, end) });
        i = end;
      }
      continue;
    }

    if (line[i] === '>' || line[i] === '/') {
      if (line[i] === '/' && line[i + 1] === '>') {
        tokens.push({ type: 'bracket', text: '/>' });
        i += 2;
      } else {
        tokens.push({ type: 'bracket', text: line[i] });
        i++;
      }
      continue;
    }

    // Braces
    if (line[i] === '{' || line[i] === '}') {
      tokens.push({ type: 'bracket', text: line[i] });
      i++;
      continue;
    }

    // Parentheses and other punctuation
    if ('()[],:;='.includes(line[i])) {
      tokens.push({ type: 'punctuation', text: line[i] });
      i++;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(line[i])) {
      let end = i;
      while (end < line.length && /[0-9.]/.test(line[end])) end++;
      tokens.push({ type: 'number', text: line.slice(i, end) });
      i = end;
      continue;
    }

    // Words (identifiers, keywords, props)
    if (/[a-zA-Z_$]/.test(line[i])) {
      let end = i;
      while (end < line.length && /[a-zA-Z0-9_$]/.test(line[end])) end++;
      const word = line.slice(i, end);

      // Check keywords
      const keywords = ['import', 'from', 'export', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'true', 'false', 'null', 'undefined', 'new', 'type', 'interface', 'as', 'default'];
      if (keywords.includes(word)) {
        tokens.push({ type: 'keyword', text: word });
      }
      // Check if it's a prop (followed by =)
      else if (end < line.length && line[end] === '=') {
        tokens.push({ type: 'attr', text: word });
      }
      // Check if it looks like a component name (starts with uppercase after <)
      else if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
        tokens.push({ type: 'tag', text: word });
      }
      else {
        tokens.push({ type: 'default', text: word });
      }
      i = end;
      continue;
    }

    // Everything else
    tokens.push({ type: 'default', text: line[i] });
    i++;
  }

  return tokens;
}

function highlightCode(code: string, isDark: boolean): React.ReactNode[] {
  const colors = isDark ? DARK_TOKEN_COLORS : LIGHT_TOKEN_COLORS;
  return code.split('\n').map((line, lineIdx) => {
    const tokens = tokenizeLine(line);
    return (
      <React.Fragment key={lineIdx}>
        {lineIdx > 0 && '\n'}
        {tokens.map((token, tokenIdx) => (
          <span key={tokenIdx} style={{ color: colors[token.type] }}>
            {token.text}
          </span>
        ))}
      </React.Fragment>
    );
  });
}

// ---------------------------------------------------------------------------
// CodeBlock component
// ---------------------------------------------------------------------------

export function CodeBlock({ code, style: userStyle }: CodeBlockProps) {
  const colors = useThemeColors();
  const [copied, setCopied] = useState(false);
  const isDark = colors.background.canvas === '#000000' || colors.text.primary === '#F5F5F5';

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  const highlighted = useMemo(() => highlightCode(code, isDark), [code, isDark]);

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.03)',
        borderRadius: 10,
        padding: '16px 20px',
        overflow: 'auto',
        border: isDark ? undefined : '1px solid rgba(0, 0, 0, 0.08)',
        ...userStyle,
      }}
    >
      {/* Copy button */}
      <div
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          cursor: 'pointer',
          padding: 6,
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
        }}
        title="Copy to clipboard"
      >
        {copied ? (
          <Check size={14} color={isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'} />
        ) : (
          <Copy size={14} color={isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.35)'} />
        )}
      </div>

      <pre
        style={{
          margin: 0,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          lineHeight: 1.6,
          color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.9)',
          whiteSpace: 'pre',
          overflowX: 'auto',
        }}
      >
        {highlighted}
      </pre>
    </div>
  );
}
