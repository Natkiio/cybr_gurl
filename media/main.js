(function () {
  const vscode = acquireVsCodeApi();
  const root = document.documentElement;

  // Base durations for the CSS keyframe animations (see style.css).
  const BASE = { breathe: 6000, glow: 3200, error: 11000 };
  let scale = 1;

  function apply() {
    root.style.setProperty('--breathe-duration', `${BASE.breathe * scale}ms`);
    root.style.setProperty('--glow-duration', `${BASE.glow * scale}ms`);
    root.style.setProperty('--error-duration', `${BASE.error * scale}ms`);
  }

  apply();

  // speedUp/slowDown commands scale the animation durations: lower scale
  // (speedUp) means faster breathing/glow/error-cycle, higher scale means slower.
  window.addEventListener('message', (event) => {
    const msg = event.data;
    if (msg.type === 'speed') {
      // delta < 0 => speed up => shrink duration; delta > 0 => slow down.
      const factor = msg.delta < 0 ? 0.8 : 1.25;
      scale = Math.max(0.25, Math.min(4, scale * factor));
      apply();
    }
  });
})();
