const rp = require('request-promise');
const url = "https://www.nerdfitness.com/blog/";
const fs = require('fs');

rp(url)
    .then(function(html) {
        // yep
        // console.log(html);



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



function disect(haystack, start, end) {
    var past = false;
    var reachedEnd = false;
    var results = [];

    function getThemFromThat(that) {
        if(that == start) {
            past = true;
        } else if(that == end) {
            reachedEnd = true;
        } else if(them.nodeType == 3) {
            if(past && !reachedEnd && !/^\s*$/.test(them.nodeValue)) {
                results.push(them);
            }
        } else {
            for (var x = 0, len = them.childNodes.length; x < len; ++x) {
                getThemFromThat(them.childNodes[x]);
            }
        }
    }

    getThemFromThat(haystack);
    return results;

}

return false;