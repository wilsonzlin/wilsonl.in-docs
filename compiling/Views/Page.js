"use strict";

const Page = ({ viewportTitle, headerListings, tocCategories, articleHtml }) => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        
                <title>${ viewportTitle } | wilsonl.in Docs</title>
        
                <link rel="stylesheet" href="../_common/app.css">
                <noscript>
                    <link rel="stylesheet" href="../_common/app.noscript.css">
                </noscript>
        
                <script defer src="../_common/app.js"></script>
            </head>
        
            <body>
                <div id="gradient-body-background"></div>
        
                <header id="header" class="no-select">
                    <span id="logo">w.l</span>
                    <ul id="listings">
                        ${ headerListings }
                    </ul>
        
                    <button id="settings-menu-button">&hellip;</button>
                    <select>
                        <option>Lacklustre</option>
                        <option>Verbose</option>
                        <option>Unclear</option>
                        <option>Confusing</option>
                        <option>Digressive</option>
                        <option>Misleading</option>
                        <option>Misplaced</option>
                        <option>Disorganised</option>
                        <option>Erroneous</option>
                        <option>Substandard</option>
                        <option>Stale</option>
                    </select>
                    <menu id="settings-menu">
                        <button class="settings-button" value="pane settings"></button>
                        <button class="settings-button" value="toggle dark theme"></button>
                        <button class="settings-button" value="send feedback"></button>
                        <button class="settings-button" value="about"></button>
                    </menu>
                </header>
        
                <main id="main">
                    <div id="pane-container" class="no-select" tabindex="0">
                        <div id="pane-open-button">w.l</div>
                        <nav id="pane">
                            <input id="toc-search" placeholder="Search for an article">
                            <dl id="toc-categories">
                                ${ tocCategories }
                            </dl>
                        </nav>
                    </div>
        
        
                    <div id="article-container">
                        ${ articleHtml }
                    </div>
                </main>
            </body>
        </html>
    `;
};

module.exports = Page;
