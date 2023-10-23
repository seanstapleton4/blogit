const rp = require('request-promise');
const url = "https://www.nerdfitness.com/blog/";
const fs = require('fs');

rp(url)
    .then(function(html) {
        // yep
        // console.log(html);

        let them = getTextNodesBetweenTags(html, 'entry-title');

        fs.writeFile('headers.txt', html, function(err) {
            if (err) throw err;
            console.log('Saved!');
        });


    })
    .catch(function(err) {
        // nope
        console.log(err);
        return false;
    });



    function getTextNodesBetweenTags(rootNode, startTagClass) {
        var h1Nodes = Array.from(rootNode.getElementsByClassName(startTagClass));
        var allTextNodes = [];
    
        h1Nodes.forEach(h1Node => {
            Array.from(h1Node.childNodes).forEach(childNode => {
                if (childNode.nodeType === 3 && !/^\s*$/.test(childNode.nodeValue)) {
                    allTextNodes.push(childNode);
                }
            });
        });
    
        return allTextNodes;
    }
    
    // Example usage:
    var textNodes = getTextNodesBetweenTags(rootNode, 'entry-title');
    
    let array = [];
    for (var i = 0, len = textNodes.length; i < len; ++i) {
        array.push(textNodes[i].nodeValue);
    }

    console.log(array);


return false;