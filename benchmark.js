const { performance } = require('perf_hooks');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const numAnchors = 10000;
let html = '<body>';
for (let i = 0; i < numAnchors; i++) {
    html += `<a href="#section${i}">Link ${i}</a>`;
}
html += '</body>';

const dom = new JSDOM(html);
const document = dom.window.document;

function benchmarkQuerySelectorAll() {
    const start = performance.now();
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Mock handler
        });
    });
    const end = performance.now();
    return end - start;
}

function benchmarkEventDelegation() {
    const start = performance.now();
    document.body.addEventListener('click', function (e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            // Mock handler
        }
    });
    const end = performance.now();
    return end - start;
}

const timeQSA = benchmarkQuerySelectorAll();
const timeDelegation = benchmarkEventDelegation();

console.log(`querySelectorAll time: ${timeQSA.toFixed(2)} ms`);
console.log(`Event delegation time: ${timeDelegation.toFixed(2)} ms`);
console.log(`Speedup: ${(timeQSA / timeDelegation).toFixed(2)}x`);
