const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchAndExtract(url) {
    try {
        // Fetch the web page
        const response = await axios.get(url);
        const html = response.data;

        // Load the HTML content into cheerio
        const $ = cheerio.load(html);

        // Extract content of h1 tags with class 'entry-title'
        const titles = [];
        $('h1.entry-title').each((i, element) => {
            titles.push($(element).text().trim());
        });

        return titles;
    } catch (error) {
        console.error("Error fetching the web page:", error);
        return [];
    }
}

// Example usage:
const url = 'https://www.nerdfitness.com/blog/';  // Replace with your target URL
fetchAndExtract(url).then(titles => {
    console.log(titles);

    fs.writeFile('headers.txt', titles.join('\n'), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

});
