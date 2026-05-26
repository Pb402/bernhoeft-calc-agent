import { useState, useEffect, useRef } from "react";

const COLORS = {
  navy: "#0C2340",
  navyLight: "#3D4F66",
  red: "#E74C3C",
  redDark: "#C0392B",
  gray: "#9EA7B3",
  grayAlt: "#878787",
  white: "#FFFFFF",
  green: "#2ECC71",
  yellow: "#F1C40F",
};

const FORMAT_OPTIONS = [
  { id: "square", label: "Post Quadrado", size: "1080×1080", icon: "⬛", aspect: 1 },
  { id: "vertical", label: "Post Vertical", size: "1080×1350", icon: "📱", aspect: 1350 / 1080 },
  { id: "stories", label: "Stories / Reels", size: "1080×1920", icon: "🎬", aspect: 1920 / 1080 },
  { id: "slides", label: "Apresentação", size: "1920×1080", icon: "🖥️", aspect: 1080 / 1920 },
];

const TEMPLATE_OPTIONS = [
  { id: "conteudo", label: "Post de Conteúdo", icon: "📊" },
  { id: "evento", label: "Evento / Mesa Redonda", icon: "🎯" },
  { id: "lancamento", label: "Lançamento", icon: "🚀" },
  { id: "carrossel", label: "Carrossel", icon: "🔄" },
  { id: "depoimento", label: "Depoimento / Case", icon: "🤝" },
  { id: "dado", label: "Dado / Estatística", icon: "📈" },
];

function GeometricBg() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <circle cx="1100" cy="-60" r="220" fill="none" stroke={COLORS.red} strokeWidth="3" opacity="0.25" />
      <circle cx="1080" cy="-40" r="160" fill="none" stroke={COLORS.red} strokeWidth="2" opacity="0.15" />
      <rect x="-60" y="680" width="160" height="160" fill="none" stroke={COLORS.navyLight} strokeWidth="2" opacity="0.3" transform="rotate(20 -60 680)" />
      <line x1="0" y1="200" x2="0" y2="600" stroke={COLORS.red} strokeWidth="1" opacity="0.2" />
      <rect x="600" y="760" width="8" height="8" fill={COLORS.red} opacity="0.5" />
      <rect x="640" y="760" width="8" height="8" fill={COLORS.red} opacity="0.3" />
      <rect x="680" y="760" width="8" height="8" fill={COLORS.red} opacity="0.2" />
    </svg>
  );
}

function LivePreview({ form }) {
  const { titulo, subtitulo, mensagem, selo, cta, formato, template } = form;
  const fmt = FORMAT_OPTIONS.find((f) => f.id === formato) || FORMAT_OPTIONS[0];
  const isWide = fmt.aspect < 0.7;
  const previewH = isWide ? 140 : fmt.aspect > 1.5 ? 340 : fmt.aspect > 1.1 ? 280 : 240;

  return (
    <div
      style={{
        width: "100%",
        height: previewH,
        background: `linear-gradient(160deg, ${COLORS.navy} 0%, #081830 100%)`,
        borderRadius: 12,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Noto Sans', sans-serif",
        display: "flex",
        flexDirection: isWide ? "row" : "column",
        border: `1px solid rgba(255,255,255,0.08)`,
      }}
    >
      {/* Geometric canto sup direito */}
      <svg style={{ position: "absolute", top: 0, right: 0, width: 90, height: 90, pointerEvents: "none" }} viewBox="0 0 90 90">
        <circle cx="82" cy="8" r="44" fill="none" stroke={COLORS.red} strokeWidth="3" opacity="0.5" />
        <circle cx="82" cy="8" r="26" fill="none" stroke={COLORS.red} strokeWidth="2" opacity="0.3" />
      </svg>
      {/* Geometric canto inf esq */}
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: 60, height: 60, pointerEvents: "none" }} viewBox="0 0 60 60">
        <rect x="-14" y="38" width="40" height="40" fill="none" stroke={COLORS.navyLight} strokeWidth="2" opacity="0.5" transform="rotate(15 -14 38)" />
      </svg>

      {/* Selo */}
      {selo && (
        <div style={{
          position: "absolute", top: 10, right: 8,
          background: COLORS.red, color: "#fff",
          fontSize: 8, fontWeight: 700, padding: "3px 8px",
          borderRadius: 3, letterSpacing: 1, textTransform: "uppercase", zIndex: 2,
        }}>{selo}</div>
      )}

      {/* Linha vertical micro */}
      <div style={{ position: "absolute", left: 20, top: "15%", bottom: "15%", width: 1, background: "rgba(255,255,255,0.15)" }} />

      {/* Conteúdo */}
      <div style={{ flex: 1, padding: isWide ? "20px 28px" : "18px 22px", display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 1, marginLeft: 10 }}>
        {template === "lancamento" && (
          <div style={{ color: COLORS.red, fontSize: 8, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
            LANÇAMENTO 🚀
          </div>
        )}
        {template === "evento" && (
          <div style={{ color: COLORS.gray, fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
            MESA REDONDA 🎯
          </div>
        )}

        <div style={{
          color: "#fff", fontWeight: 800,
          fontSize: isWide ? 13 : 16,
          lineHeight: 1.15, marginBottom: 6, maxWidth: isWide ? "60%" : "100%",
        }}>
          {titulo || "Título do Post"}
        </div>

        {subtitulo && (
          <div style={{
            color: "rgba(255,255,255,0.7)", fontWeight: 500,
            fontSize: isWide ? 9 : 11, marginBottom: 8,
          }}>
            {subtitulo}
          </div>
        )}

        {mensagem && (
          <>
            <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.3)", marginBottom: 8 }} />
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: isWide ? 8 : 9, lineHeight: 1.5, maxWidth: isWide ? "55%" : "100%" }}>
              {mensagem.slice(0, 120)}{mensagem.length > 120 ? "…" : ""}
            </div>
          </>
        )}

        {cta && (
          <div style={{
            display: "inline-flex", alignItems: "center", marginTop: 10,
            background: COLORS.red, color: "#fff",
            borderRadius: 20, padding: "4px 14px",
            fontSize: 8, fontWeight: 700, width: "fit-content",
          }}>
            {cta}
          </div>
        )}
      </div>

      {/* Rodapé logo */}
      <div style={{
        position: "absolute", bottom: 10, left: isWide ? 28 : 22,
        color: "rgba(255,255,255,0.45)", fontSize: 7, fontWeight: 600, letterSpacing: 1,
      }}>
        BERNHOEFT CÁLCULOS JUDICIAIS · @bernhoeftcalc
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 3, height: 18, background: COLORS.red, borderRadius: 2 }} />
        <span style={{ color: COLORS.gray, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children, icon }) {
  return (
    <button onClick={onClick} style={{
      background: active ? COLORS.red : "rgba(255,255,255,0.05)",
      border: `1px solid ${active ? COLORS.red : "rgba(255,255,255,0.12)"}`,
      color: active ? "#fff" : COLORS.gray,
      borderRadius: 8, padding: "8px 14px",
      fontSize: 12, fontWeight: active ? 700 : 400,
      cursor: "pointer", transition: "all 0.2s",
      display: "flex", alignItems: "center", gap: 6,
    }}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", color: COLORS.gray, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8, padding: "10px 14px",
  color: "#fff", fontSize: 13, outline: "none",
  fontFamily: "'Noto Sans', sans-serif",
  transition: "border-color 0.2s",
};

const STEPS = ["Formato", "Template", "Conteúdo", "Preview & Gerar"];

export default function BernhoeftAgent() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [canvaUrl, setCanvaUrl] = useState(null);
  const [form, setForm] = useState({
    formato: "square",
    template: "conteudo",
    titulo: "",
    subtitulo: "",
    mensagem: "",
    selo: "",
    rodape: "",
    cta: "",
    bgStyle: "escuro",
    tamanhoTitulo: "grande",
    notas: "",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const callClaude = async (prompt, systemPrompt) => {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    return data.content?.[0]?.text || "";
  };

  const generateCanvaQuery = async () => {
    setLoading(true);
    setResult(null);
    try {
      const system = `Você é um especialista em marketing para a Bernhoeft Cálculos Judiciais.
Gere APENAS um JSON com os seguintes campos (sem markdown, sem texto extra):
{
  "canvaQuery": "descrição em inglês para busca no Canva",
  "designType": "instagram_post | poster | presentation | flyer",
  "copyFinal": "copy final otimizada para o post",
  "hashtags": ["#tag1", "#tag2"],
  "sugestoes": ["sugestão 1", "sugestão 2"]
}`;

      const prompt = `Crie um brief de design para:
Formato: ${FORMAT_OPTIONS.find(f => f.id === form.formato)?.label}
Template: ${TEMPLATE_OPTIONS.find(t => t.id === form.template)?.label}
Título: ${form.titulo}
Subtítulo: ${form.subtitulo}
Mensagem: ${form.mensagem}
Selo: ${form.selo}
CTA: ${form.cta}
Fundo: ${form.bgStyle}
Notas: ${form.notas}

Identidade Bernhoeft: azul escuro #0C2340, vermelho #E74C3C, Noto Sans, estilo corporativo premium jurídico.`;

      const raw = await callClaude(prompt, system);
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch (e) {
      setResult({ error: "Erro ao gerar. Tente novamente.", canvaQuery: "", copyFinal: "", hashtags: [], sugestoes: [] });
    }
    setLoading(false);
  };

  const canOpenCanva = result && result.canvaQuery;

  const openCanva = () => {
    const q = encodeURIComponent(`Bernhoeft Cálculos Judiciais ${result.canvaQuery} navy blue red corporate legal`);
    window.open(`https://www.canva.com/search/templates?q=${q}`, "_blank");
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div style={{
      minHeight: "100vh", background: "#060E1A",
      fontFamily: "'Noto Sans', sans-serif", color: "#fff",
      position: "relative", overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <GeometricBg />

      {/* Header */}
      <div style={{
        position: "relative", zIndex: 1,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "20px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 36, height: 36, background: COLORS.red,
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 14, letterSpacing: -1,
          }}>BC</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: 0.5 }}>BERNHOEFT CÁLCULOS</div>
            <div style={{ color: COLORS.gray, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Agente de Marketing</div>
          </div>
        </div>
        <div style={{ color: COLORS.gray, fontSize: 11, letterSpacing: 1 }}>
          @bernhoeftcalc
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: "rgba(255,255,255,0.05)", position: "relative", zIndex: 1 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: COLORS.red, transition: "width 0.4s ease" }} />
      </div>

      {/* Steps indicator */}
      <div style={{ display: "flex", gap: 0, position: "relative", zIndex: 1, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {STEPS.map((s, i) => (
          <button key={i} onClick={() => i < step + 1 && setStep(i)} style={{
            flex: 1, padding: "12px 8px",
            background: i === step ? "rgba(231,76,60,0.08)" : "transparent",
            border: "none", borderBottom: i === step ? `2px solid ${COLORS.red}` : "2px solid transparent",
            color: i === step ? "#fff" : i < step ? COLORS.gray : "rgba(255,255,255,0.2)",
            fontSize: 11, fontWeight: i === step ? 700 : 400,
            cursor: i <= step ? "pointer" : "default",
            transition: "all 0.2s", letterSpacing: 0.5,
            fontFamily: "'Noto Sans', sans-serif",
          }}>
            <span style={{ marginRight: 4, fontSize: 12 }}>
              {i < step ? "✓" : `0${i + 1}`}
            </span>
            {s}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px", position: "relative", zIndex: 1 }}>

        {/* STEP 0 — Formato */}
        {step === 0 && (
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Escolha o Formato</h2>
            <p style={{ color: COLORS.gray, fontSize: 13, marginBottom: 28 }}>Selecione onde o material será publicado.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {FORMAT_OPTIONS.map((f) => (
                <button key={f.id} onClick={() => set("formato", f.id)} style={{
                  background: form.formato === f.id ? "rgba(231,76,60,0.12)" : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${form.formato === f.id ? COLORS.red : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 10, padding: "18px 20px",
                  cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                  color: "#fff", fontFamily: "'Noto Sans', sans-serif",
                }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{f.label}</div>
                  <div style={{ color: COLORS.gray, fontSize: 11 }}>{f.size}px</div>
                </button>
              ))}
            </div>

            <div style={{ marginTop: 32, textAlign: "right" }}>
              <button onClick={() => setStep(1)} style={{
                background: COLORS.red, color: "#fff", border: "none",
                borderRadius: 8, padding: "12px 28px", fontWeight: 700,
                fontSize: 13, cursor: "pointer", fontFamily: "'Noto Sans', sans-serif",
              }}>
                Próximo →
              </button>
            </div>
          </div>
        )}

        {/* STEP 1 — Template */}
        {step === 1 && (
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Tipo de Material</h2>
            <p style={{ color: COLORS.gray, fontSize: 13, marginBottom: 28 }}>Qual é o objetivo do post?</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {TEMPLATE_OPTIONS.map((t) => (
                <button key={t.id} onClick={() => set("template", t.id)} style={{
                  background: form.template === t.id ? "rgba(231,76,60,0.12)" : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${form.template === t.id ? COLORS.red : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 10, padding: "16px 14px",
                  cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                  color: "#fff", fontFamily: "'Noto Sans', sans-serif",
                }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{t.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>{t.label}</div>
                </button>
              ))}
            </div>

            <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(0)} style={{
                background: "transparent", color: COLORS.gray, border: `1px solid rgba(255,255,255,0.1)`,
                borderRadius: 8, padding: "12px 24px", fontWeight: 600,
                fontSize: 13, cursor: "pointer", fontFamily: "'Noto Sans', sans-serif",
              }}>← Voltar</button>
              <button onClick={() => setStep(2)} style={{
                background: COLORS.red, color: "#fff", border: "none",
                borderRadius: 8, padding: "12px 28px", fontWeight: 700,
                fontSize: 13, cursor: "pointer", fontFamily: "'Noto Sans', sans-serif",
              }}>Próximo →</button>
            </div>
          </div>
        )}

        {/* STEP 2 — Conteúdo */}
        {step === 2 && (
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Conteúdo do Material</h2>
            <p style={{ color: COLORS.gray, fontSize: 13, marginBottom: 28 }}>Preencha as informações do post.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <Field label="Título Principal *">
                  <input value={form.titulo} onChange={e => set("titulo", e.target.value)}
                    placeholder="Ex: Prazo Prescricional nas Ações Trabalhistas" style={inputStyle} />
                </Field>
                <Field label="Subtítulo">
                  <input value={form.subtitulo} onChange={e => set("subtitulo", e.target.value)}
                    placeholder="Ex: O que todo advogado precisa saber" style={inputStyle} />
                </Field>
                <Field label="Mensagem Principal">
                  <textarea value={form.mensagem} onChange={e => set("mensagem", e.target.value)}
                    placeholder="Texto do post ou detalhes do conteúdo..."
                    rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                </Field>
                <Field label="Selo / Badge (opcional)">
                  <input value={form.selo} onChange={e => set("selo", e.target.value)}
                    placeholder="Ex: EDIÇÃO EXCLUSIVA | NOVO" style={inputStyle} />
                </Field>
              </div>
              <div>
                <Field label="Botão CTA">
                  <input value={form.cta} onChange={e => set("cta", e.target.value)}
                    placeholder="Ex: Saiba Mais | Inscreva-se" style={inputStyle} />
                </Field>

                <Field label="Estilo de Fundo">
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {[
                      { id: "escuro", label: "Azul Escuro" },
                      { id: "preto", label: "Preto Premium" },
                      { id: "gradiente", label: "Gradiente" },
                      { id: "branco", label: "Branco Limpo" },
                    ].map(b => (
                      <Chip key={b.id} active={form.bgStyle === b.id} onClick={() => set("bgStyle", b.id)}>
                        {b.label}
                      </Chip>
                    ))}
                  </div>
                </Field>

                <Field label="Tamanho do Título">
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      { id: "pequeno", label: "Pequeno" },
                      { id: "medio", label: "Médio" },
                      { id: "grande", label: "Grande" },
                    ].map(b => (
                      <Chip key={b.id} active={form.tamanhoTitulo === b.id} onClick={() => set("tamanhoTitulo", b.id)}>
                        {b.label}
                      </Chip>
                    ))}
                  </div>
                </Field>

                <Field label="Notas Adicionais">
                  <textarea value={form.notas} onChange={e => set("notas", e.target.value)}
                    placeholder="Informações extras: data do evento, palestrante, localização..."
                    rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                </Field>
              </div>
            </div>

            <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(1)} style={{
                background: "transparent", color: COLORS.gray, border: `1px solid rgba(255,255,255,0.1)`,
                borderRadius: 8, padding: "12px 24px", fontWeight: 600,
                fontSize: 13, cursor: "pointer", fontFamily: "'Noto Sans', sans-serif",
              }}>← Voltar</button>
              <button onClick={() => setStep(3)} disabled={!form.titulo} style={{
                background: form.titulo ? COLORS.red : "rgba(255,255,255,0.05)",
                color: form.titulo ? "#fff" : COLORS.gray, border: "none",
                borderRadius: 8, padding: "12px 28px", fontWeight: 700,
                fontSize: 13, cursor: form.titulo ? "pointer" : "default",
                fontFamily: "'Noto Sans', sans-serif",
              }}>Ver Preview →</button>
            </div>
          </div>
        )}

        {/* STEP 3 — Preview & Gerar */}
        {step === 3 && (
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Preview & Geração</h2>
            <p style={{ color: COLORS.gray, fontSize: 13, marginBottom: 24 }}>Confira o preview e gere o brief para o Canva.</p>

            <Section title="Preview do Material">
              <LivePreview form={form} />
              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: COLORS.gray }}>
                  {FORMAT_OPTIONS.find(f => f.id === form.formato)?.label}
                </span>
                <span style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: COLORS.gray }}>
                  {TEMPLATE_OPTIONS.find(t => t.id === form.template)?.label}
                </span>
              </div>
            </Section>

            <Section title="Brief do Material">
              <div style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10, padding: "18px 20px",
              }}>
                {[
                  ["Título", form.titulo],
                  ["Subtítulo", form.subtitulo],
                  ["Mensagem", form.mensagem],
                  ["Selo", form.selo],
                  ["CTA", form.cta],
                  ["Fundo", form.bgStyle],
                  ["Notas", form.notas],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 12, marginBottom: 10, fontSize: 12 }}>
                    <span style={{ color: COLORS.gray, minWidth: 80, fontWeight: 600 }}>{k}:</span>
                    <span style={{ color: "#fff", lineHeight: 1.5 }}>{v}</span>
                  </div>
                ))}
              </div>
            </Section>

            {!result && !loading && (
              <button onClick={generateCanvaQuery} style={{
                width: "100%", background: COLORS.red, color: "#fff", border: "none",
                borderRadius: 10, padding: "16px", fontWeight: 800, fontSize: 15,
                cursor: "pointer", letterSpacing: 0.5, fontFamily: "'Noto Sans', sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}>
                🚀 Gerar Brief com IA
              </button>
            )}

            {loading && (
              <div style={{ textAlign: "center", padding: "32px", color: COLORS.gray }}>
                <div style={{ fontSize: 28, marginBottom: 12, animation: "spin 1s linear infinite" }}>⚙️</div>
                <p style={{ fontSize: 13 }}>Gerando brief de design com IA...</p>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {result && !result.error && (
              <div>
                <Section title="Resultado da IA">
                  <div style={{
                    background: "rgba(46,204,113,0.06)", border: `1px solid rgba(46,204,113,0.2)`,
                    borderRadius: 10, padding: "20px",
                  }}>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ color: COLORS.gray, fontSize: 10, letterSpacing: 2, fontWeight: 700, marginBottom: 6 }}>COPY FINAL</div>
                      <div style={{ color: "#fff", fontSize: 13, lineHeight: 1.6 }}>{result.copyFinal}</div>
                    </div>
                    {result.hashtags?.length > 0 && (
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ color: COLORS.gray, fontSize: 10, letterSpacing: 2, fontWeight: 700, marginBottom: 6 }}>HASHTAGS</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {result.hashtags.map(h => (
                            <span key={h} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "3px 10px", fontSize: 11, color: COLORS.gray }}>
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.sugestoes?.length > 0 && (
                      <div>
                        <div style={{ color: COLORS.gray, fontSize: 10, letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>SUGESTÕES DE DESIGN</div>
                        {result.sugestoes.map((s, i) => (
                          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                            <span style={{ color: COLORS.red, fontWeight: 700 }}>→</span> {s}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Section>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <button onClick={openCanva} style={{
                    background: "#7B2FBE", color: "#fff", border: "none",
                    borderRadius: 10, padding: "14px", fontWeight: 700, fontSize: 13,
                    cursor: "pointer", fontFamily: "'Noto Sans', sans-serif",
                  }}>
                    🎨 Abrir no Canva
                  </button>
                  <button onClick={() => { setResult(null); setStep(0); setForm({ formato: "square", template: "conteudo", titulo: "", subtitulo: "", mensagem: "", selo: "", rodape: "", cta: "", bgStyle: "escuro", tamanhoTitulo: "grande", notas: "" }); }} style={{
                    background: "transparent", color: COLORS.gray, border: `1px solid rgba(255,255,255,0.1)`,
                    borderRadius: 10, padding: "14px", fontWeight: 600, fontSize: 13,
                    cursor: "pointer", fontFamily: "'Noto Sans', sans-serif",
                  }}>
                    + Novo Material
                  </button>
                </div>
              </div>
            )}

            {result?.error && (
              <div style={{ background: "rgba(231,76,60,0.1)", border: `1px solid rgba(231,76,60,0.3)`, borderRadius: 10, padding: 16, color: COLORS.red, fontSize: 13 }}>
                {result.error}
              </div>
            )}

            {!result && !loading && (
              <button onClick={() => setStep(2)} style={{
                background: "transparent", color: COLORS.gray, border: `1px solid rgba(255,255,255,0.1)`,
                borderRadius: 8, padding: "12px 24px", fontWeight: 600,
                fontSize: 13, cursor: "pointer", fontFamily: "'Noto Sans', sans-serif",
                marginTop: 12,
              }}>← Editar Conteúdo</button>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: 40,
      }}>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, letterSpacing: 1 }}>
          BERNHOEFT CÁLCULOS JUDICIAIS · AGENTE DE MARKETING v1.0
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.red, opacity: 0.7 }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.navy }} />
        </div>
      </div>
    </div>
  );
}
