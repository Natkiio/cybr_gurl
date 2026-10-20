# Cyberpunk Pet

An animated ASCII-art cyberpunk girl in red that lives in her own sidebar panel, always visible while you code.

## Install

1. Open the Extensions view → `...` menu → **Install from VSIX...**
2. Pick `cyberpunk-pet-0.0.1.vsix`
3. Click the new pet icon in the Activity Bar (left edge) to open her panel.

## Commands

- `Cyberpunk Pet: Speed Up Animation`
- `Cyberpunk Pet: Slow Down Animation`

## Notes

VS Code extensions can't draw a freely-floating overlay on top of the editor — there's no API for that.
This instead docks her in a persistent Activity Bar view, the same approach `vscode-pets` uses, so she's
on screen continuously as long as the panel is open (drag it to the bottom panel bar if you want her
beside the terminal instead of the sidebar).
