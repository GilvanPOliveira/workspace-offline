# Checklist Lighthouse (meta 100/100/100/100)

## Performance
- Evitar JS inicial grande (code split quando necessário)
- Imagens otimizadas (webp/avif), width/height definidos
- Evitar layout shift (CLS): reservar espaço, fontes estáveis
- Usar `defer`/`type="module"` corretamente (Vite já ajuda)

## SEO
- Title e meta description adequados
- `robots`, `canonical` (placeholder ok no começo)
- `lang="pt-BR"`
- Headings corretos (h1 único por página)
- Links com texto descritivo

## Accessibility
- Foco visível (`:focus-visible`)
- Contraste adequado
- Labels e `aria-*` quando necessário
- Sem “div button”
- Teclado cobre fluxos principais

## Best Practices
- Sem erros no console
- HTTPS (em produção)
- Sem bibliotecas suspeitas
- CSP (opcional mais pra frente)

## Evidência por fase
- Fase 1: SEO ≥ 95, A11y ≥ 95
- Final: 100 em tudo (ou justificar 98/99 com motivo técnico)
