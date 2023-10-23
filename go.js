const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function fetchAndExtract(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;

        const $ = cheerio.load(html);

        const headers = [];
        $('h1.entry-title').each((i, element) => {
            if (i < 3) {
                const titleText = $(element).text().trim();
                const href = $(element).find('a').attr('href');
                headers.push({ title: titleText, href: href });
            }
        });

        return headers;
    } catch (error) {
        console.error("Error fetching the web page:", error);
        return [];
    }
}

function writeToFile(headers) {
    const currentDateTime = new Date().toLocaleString();
    const formattedData = headers.map(header => {
        return `${currentDateTime}\nTitle: ${header.title}\nURL: ${header.href}\n`;
    }).join('\n');

    fs.writeFileSync('headers.txt', formattedData);
    console.log('Data written to headers.txt');
}

// run
const url = 'https://www.nerdfitness.com/blog/';
fetchAndExtract(url).then(headers => {
    writeToFile(headers);
});
