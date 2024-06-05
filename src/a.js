const { default: axios } = require('axios');
const cheerio = require('cheerio');

const link = 'https://www.thegioididong.com/dtdd/iphone-15-pro-max'

const getS = async () => {
  const res = await axios.get(link)

  const string = res.data.toString()

  return '<ul class="parameter__list"> '+ string.split('<div class="parameter">')[1].split('</ul>')[0] +' </ul>';
}

const aaa = async () => {
  const htmll = await getS();

  // console.log(htmll);

  // Phân tích cú pháp HTML
  const $ = cheerio.load(htmll);

  // Lấy thông tin sản phẩm
  const productInfo = {};
  const p = []

  $('.parameter__list li').each((index, element) => {
    const key = $(element).find('.lileft').text().trim();
    const value = $(element).find('.liright span').text().trim();
    productInfo[key] = value;

    const i = { "t": key, "value": value }
    p.push(i)
  });

  p.forEach((element) => {
    console.log('{"title":"' + element.t + '","detail":"' + element.value + '"},');
  })
}

aaa()

