import axios from 'axios';
import { Feed } from 'feed';
import { strptime } from 'micro-strptime';

const { FEED_URL } = process.env;

export async function ios_rss(appId) {
  const url = 'https://itunes.apple.com/lookup?id=' + appId + '&country=JP';
  const resp = await axios.get(url);
  const appInfo = resp.data.results[0];
  const name = appInfo.trackName;
  console.log(name);
  const releaseNotes = appInfo.releaseNotes;
  const image = appInfo.artworkUrl100;
  const updated: Date = strptime(appInfo.currentVersionReleaseDate,'%Y-%m-%dT%H:%M:%S%Z');

  const feed = new Feed({
    title: 'mobileapp-release-rss',
    description: 'mobileapp-release-rss',
    id: FEED_URL,
    link: FEED_URL,
    updated: updated,
    language: 'ja', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: image,
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
    content: releaseNotes,
    date: updated,
  });
  return feed.rss2();
}
