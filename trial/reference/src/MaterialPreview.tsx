import { useId, useState } from 'react';

export function MaterialPreview() {
  const id = useId();
  const [position, setPosition] = useState(50);
  return <section className="material-preview" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>See the material</h2>
    <p>Move the backdrop to compare a solid surface with glass. Both use the same colours and content.</p>
    <div className="material-preview__pair">
      {['solid', 'glass'].map(material => <figure key={material}>
        <div className="material-preview__scene" aria-hidden="true">
          <div className="material-preview__backdrop" style={{ transform: `translateX(${(position - 50) * 1.5}px)` }}>
            <span>Flame &amp; Ink</span><span>Flame &amp; Ink</span><span>Flame &amp; Ink</span>
          </div>
          <div className="material-preview__surface" data-material={material}>
            <strong>Ritam UI</strong><span>Projects</span>
          </div>
        </div>
        <figcaption>{material === 'solid' ? 'Solid — hides the backdrop' : 'Glass — softly reveals and blurs it'}</figcaption>
      </figure>)}
    </div>
    <label className="material-preview__slider" htmlFor={`${id}-position`}>Move backdrop
      <input id={`${id}-position`} type="range" min="0" max="100" value={position}
        onChange={event => setPosition(Number(event.target.value))} />
    </label>
    <p className="appearance-note">This demo previews transparency even when your device reduces it. High-contrast settings still take priority. Turn off “Preview glass effects” in Appearance to return to your device preferences.</p>
    <p className="material-preview__contrast-note appearance-note">Your contrast settings are keeping both samples solid.</p>
    <p className="material-preview__unsupported-note appearance-note">This browser does not support the glass effect. Both samples use solid surfaces.</p>
  </section>;
}
