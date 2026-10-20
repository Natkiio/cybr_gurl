# cybr_gurl

An animated cyberpunk character (swap out image in future) in red that lives in their own sidebar panel, always visible while you code.

## Install

1. Open the Extensions view → `...` menu → **Install from VSIX...**
2. Pick `cybrgurl-pet-0.0.1.vsix`
3. Click the new pet icon in the Activity Bar (left edge) to open her panel.


## Notes

VS Code extensions can't draw a freely-floating overlay on top of the editor — there's no API for that.
This instead docks the image in a persistent Activity Bar view, the same approach `vscode-pets` uses, so they are
on screen continuously as long as the panel is open.
