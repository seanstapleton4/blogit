const rp = require('request-promise');
const url = "https://www.nerdfitness.com/blog/";
const fs = require('fs');
const DOMParser = require('dom-parser');

rp(url)
    .then(function(html) {
        // yep
        // console.log(html);

        let them = getTextNodesBetweenTags(html, 'entry-title');

        fs.writeFile('headers.txt', html, function(err) {
            if (err) throw err;
            console.log('Saved!');
        });

        let array = [];
        for (var i = 0, len = them.length; i < len; ++i) {
            array.push(them[i].nodeValue);
        }


    })
    .catch(function(err) {
        // nope
        console.log(err);
        return false;
    });

    const parser = new DOMParser();
    function getTextNodesBetweenTags(htmlString, startTagClass) {
        const doc = parser.parseFromString(htmlString, 'text/html');
        const h1Nodes = doc.getElementsByTagName('h1');
        const allTextNodes = [];
    
        Array.from(h1Nodes).forEach(h1Node => {
            // Ensure we're only working with h1 elements that have the specified class
            if (h1Node.getAttribute('class') === startTagClass) {
                Array.from(h1Node.childNodes).forEach(childNode => {
                    if (childNode.nodeType === 3 && !/^\s*$/.test(childNode.textContent)) {
                        allTextNodes.push(childNode.textContent);
                    }
                });
            }
        });
    
        return allTextNodes;
    }

return false;