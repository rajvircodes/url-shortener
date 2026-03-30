import { useState } from "react";
import useUrls from "../hooks/useUrls";

const UrlShortener = () => {
  const [input, setInput]     = useState("");
  const [copied, setCopied]   = useState(false);
  const { result, loading, error, shorten } = useUrls();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    shorten(input.trim());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="wrapper">
      {/* ── Hero Text ── */}
      <div className="hero">
        <div className="badge">URL Shortener</div>
        <h1>Shorten.<br />Share.<br />Done.</h1>
        <p className="sub">Paste any long link and get a clean, short URL instantly.</p>
      </div>

      {/* ── Form ── */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="url"
            className="url-input"
            placeholder="https://your-very-long-url.com/goes/here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" className="btn-shorten" disabled={loading}>
            {loading ? <span className="spinner" /> : "Shorten →"}
          </button>
        </div>
        {error && <p className="msg error">⚠ {error}</p>}
      </form>

      {/* ── Result ── */}
      {result && (
        <div className="result-card">
          <div className="result-inner">
            <div className="result-left">
              <span className="result-label">Your short link</span>
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noreferrer"
                className="result-url"
              >
                {result.shortUrl}
              </a>
            </div>
            <button className={`btn-copy ${copied ? "copied" : ""}`} onClick={handleCopy}>
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
          <p className="original-url" title={result.originalUrl}>
            ↳ {result.originalUrl.length > 60
              ? result.originalUrl.slice(0, 60) + "…"
              : result.originalUrl}
          </p>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;