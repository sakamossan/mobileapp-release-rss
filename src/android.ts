import axios from 'axios';
import { load } from 'cheerio';
import { Feed } from 'feed';
import { strptime } from 'micro-strptime';

const { FEED_URL } = process.env;

export async function androidRss(appId) {
  const url = `https://play.google.com/store/apps/details?id=${appId}&hl=ja`;
  const resp = await axios.get(url);
  const $ = load(resp.data);
  const datePublished: Date = strptime(
    resp.data.match(/(\d+年\d+月\d+日)/)[1],
    '%Y年%m月%d日',
  );
  const name = $('[itemprop=name]').text();
  const recentChange = $('div[itemprop=description]')
    .last()
    .children('content')
    .text();

  const feed = new Feed({
    title: 'mobileapp-release-rss',
    description: 'mobileapp-release-rss',
    id: FEED_URL,
    link: FEED_URL,
    updated: datePublished,
    language: 'ja', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: 'https://www.hounddogdigital.com/wp-content/uploads/2017/04/mobile_apps.jpg',
    favicon: 'http://actualidadradio.com/favicon.ico/favicon-96x96.png',
    copyright: 'All rights reserved 2019, John Doe',
    feedLinks: {
      json: 'https://example.com/json',
      atom: 'https://example.com/atom',
    },
    author: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      link: 'https://example.com/johndoe',
    },
  });
  feed.addItem({
    title: name,
    id: url,
    link: url,
    description: name,
    content: recentChange,
    date: datePublished,
  });
  return feed.rss2();
}
