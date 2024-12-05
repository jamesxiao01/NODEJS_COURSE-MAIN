const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { PrismaClient } = require('@prisma/client')
const mongoose = require('mongoose')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

mongoose.connect(

)


app.listen(3000, () => {
    console.log('server running');
})

app.get('/scrape/images', async (req, res) => {
    try {
        const BASE_URL = 'https://books.toscrape.com';
        const response = await axios.get(BASE_URL)
        const $ = cheerio.load(response.data)
        const results = []

        const books = $('article.product_pod').slice(0, 10)

        for (let i = 0; i < books.length; i++) {
            const title = book.find('h3 a').attr('title')
            const priceText = book.find('.price_color').text().replace('£', '')
            const rating = book.find('p.star-rating').attr('class').split(' ')[1]
            const relativeImageUrl = book.find('img').attr('src')
            const imageUrl = new URL(relativeImageUrl, baseUrl).toString()

            const imageResponse = await axios.get(imageUrl, {
                responseType: 'arraybuffer'
            })

            new Image({
                image_data: imageResponse.data,
                content_type: imageResponse.headers['content-type']
            })

            await image.save()

            try {
                const imageName = `book-${i + 1}.jpg`
                console.log(`正在下載：${imageUrl}`)
                const savedPath = await downloadImage(imageUrl, imageName)

                result.push({
                    savedPath
                })
            } catch (error) {
                console.error(error.message)
            }
        }

        res.json({
            status: 'success'
        })
    } catch (err) {
        console.error(err.message)
    }
})