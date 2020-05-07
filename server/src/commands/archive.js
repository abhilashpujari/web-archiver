const puppeteer = require('puppeteer');
const Cloudinary = require('../services/cloudinary');
const Archive = require('../models/Archive');
const Attachment = require('../models/Attachment');
const fs = require('fs');

module.exports = async () => {

    console.log('Started Archiving...');

    let firstTrendingTitle = '';
    let url = 'https://www.ndtv.com/top-stories';

    const imageDirectory = 'uploads';
    const fileName = `${(new Date()).getTime()}_ndtv_news.png`;
    const imageFile = `${imageDirectory}/${fileName}`;
    const browser = await puppeteer.launch({args: ["--disable-notifications"]});
    const page = await browser.newPage();

    await page.setViewport({width: 1366, height: 768});
    await page.goto(url);

    try {
        // Wait for selector to load
        await page.waitForSelector('.trending_insidelist1');

        // grab the top story
        firstTrendingTitle = await page.$eval('.trending_insidelist1 ul li:nth-child(1) .description a', e => e.innerText);
    } catch (error) {}

    await page.screenshot({
        path: `${imageFile}`,
        fullPage: true
    })

    await browser.close();

    const cloudinary = new Cloudinary();
    const image = await cloudinary.upload(imageFile);

    const attachment = await Attachment.create({
        url : image.url,
        name: fileName,
        tag: '_archive_image',
        isPublic: true,
        mimeType: 'image/png',
        imageData: {
            width: image.width,
            height: image.height,
            size: image.size,
            thumbnail: image.thumbnail
        }
    });

    const archive = await Archive.create({
        source: {
            name: 'NDTV News',
            url: url,
            title: firstTrendingTitle,
        },
        attachment: attachment
    });

    //Delete the file from uploads directory once all process is done
    try {
        fs.unlinkSync(imageFile)
    } catch(err) {
        console.log(err);
    }

    console.log('Done!!!');
    process.exit(1);
}