"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const Page = ({ url, viewportTitle, documentationsListItemsHtml, tocCategoriesHtml, articleHtml }) => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        
                <title>${ viewportTitle } | wilsonl.in Docs</title>
        
                <link rel="stylesheet" href="/docs/_common/app.css">
                <noscript>
                    <link rel="stylesheet" href="/docs/_common/app.noscript.css">
                </noscript>
        
                <script defer src="/docs/_common/app.js"></script>
            </head>
        
            <body>
                <div id="gradient-body-background"></div>
                
                <div id="feedback" class="no-select">
                    <form id="feedback-form" method="post" action="https://fb.wilsonl.in/feedback">
                        <input type="hidden" name="page" value="${ escapeHTML(url) }">
                        
                        <h2>Help improve this page</h2>
                        
                        <label>
                            <span class="feedback-form-section-heading">Title</span>
                            <input class="feedback-form-text-input" name="title" maxlength="200" placeholder="Optional">
                        </label>
                        
                        <label>
                            <span class="feedback-form-section-heading">Message</span>
                            <textarea class="feedback-form-text-input" name="message" rows="8" maxlength="1000" placeholder="Optional"></textarea>
                        </label>
                        
                        <div>
                            <span class="feedback-form-section-heading">Rating</span>
                            <input name="rating" type="range" min="1" max="5" step="1">
                        </div>
                        
                        <div id="feedback-form-keywords">
                            <span class="feedback-form-section-heading">Keywords</span>
                            <label>
                                <input type="checkbox" name="keywords" value="Incomplete">
                                <span>Incomplete</span>
                            </label>
                            <label>
                                <input type="checkbox" name="keywords" value="Lacklustre">
                                <span>Lacklustre</span>
                            </label>
                            <label>
                                <input type="checkbox" name="keywords" value="Verbose">
                                <span>Verbose</span>
                            </label>
                            <label>
                                <input type="checkbox" name="keywords" value="Unclear">
                                <span>Unclear</span>
                            </label>
                            <label>
                                <input type="checkbox" name="keywords" value="Confusing">
                                <span>Confusing</span>
                            </label>
                            <label>
                                <input type="checkbox" name="keywords" value="Digressive">
                                <span>Digressive</span>
                            </label>
                            <label>
                                <input type="checkbox" name="keywords" value="Misleading">
                                <span>Misleading</span>
                            </label>
                            <label>
                                <input type="checkbox" name="keywords" value="Misplaced">
                                <span>Misplaced</span>
                            </label>
                            <label>
                                <input type="checkbox" name="keywords" value="Disorganised">
                                <span>Disorganised</span>
                            </label>
                            <label>
                                <input type="checkbox" name="keywords" value="Erroneous">
                                <span>Erroneous</span>
                            </label>
                            <label>
                                <input type="checkbox" name="keywords" value="Substandard">
                                <span>Substandard</span>
                            </label>
                            <label>
                                <input type="checkbox" name="keywords" value="Stale">
                                <span>Stale</span>
                            </label>
                        </div>
                        
                        <button>Send feedback</button>
                        <a href="#" id="feedback-close">Close</a>
                    </form>
                </div>
        
                <header id="header" class="no-select">
                    <span id="logo">w.l</span>
                    <ul id="documentations-list">
                        ${ documentationsListItemsHtml }
                    </ul>
                    
                    <div id="header-controls">
                        <a href="#feedback">Feedback</a>
                    </div>
                </header>
        
                <main id="main">
                    <nav id="pane" class="no-select">
                        <input id="toc-search" placeholder="Search for an article">
                        <dl id="toc-categories">
                            ${ tocCategoriesHtml }
                        </dl>
                    </nav>
        
        
                    <article id="article">
                        ${ articleHtml }
                    </article>
                </main>
            </body>
        </html>
    `;
};

module.exports = Page;
