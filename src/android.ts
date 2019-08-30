import axios from 'axios';
import { load } from 'cheerio';
import { Feed } from 'feed';
import { strptime } from 'micro-strptime';

export async function androidRss(appId) {
  const url = `https://play.google.com/store/apps/details?id=${appId}&hl=ja`;
  const resp = await axios.get(url);
  const $ = load(resp.data);
  const datePublished: Date = strptime(
    resp.data.match(/(\d+年\d+月\d+日)/)[1],
    '%Y年%m月%d日',
  );
  const dateFormated =
    datePublished.getFullYear() +
    '/' +
    datePublished.getMonth() +
    '/' +
    datePublished.getDate();
  const name = $('[itemprop=name]').text();
  const image = $('img[itemprop=image]')
    .first()
    .attr('src');

  // 先に br を line break に変えておく
  $('div[itemprop=description]')
    .eq(1)
    .find('span')
    .find('br')
    .replaceWith('\n');

  const recentChange = $('div[itemprop=description]')
    .eq(1)
    .find('span')
    .text();

  const feed = new Feed({
    title: name + 'for Anroid update information.',
    description: name + 'for Android update information.',
    generator:
      'mobileapp-releasse-rss by sakamossan. https://github.com/sakamossan/mobileapp-release-rss',
    id: url,
    link: url,
    updated: datePublished,
    language: 'ja', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: image,
    favicon: 'https://www.gstatic.com/android/market_images/web/favicon_v2.ico',
    copyright: 'Crawled from GooglePlay',
    feedLinks: {},
    author: {},
  });
  feed.addItem({
    title: name + ' for Android updated. published:' + dateFormated,
    guid: `Android:${appId}:v:${dateFormated}`,
    link: url,
    description: recentChange,
    date: datePublished,
  });
  return feed.rss2();
}
