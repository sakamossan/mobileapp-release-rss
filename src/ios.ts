import axios from 'axios';
import { Feed } from 'feed';
import { strptime } from 'micro-strptime';

export async function iosRss(appId) {
  const url = 'https://itunes.apple.com/lookup?id=' + appId + '&country=JP';
  const resp = await axios.get(url);
  const appInfo = resp.data.results[0];
  const name = appInfo.trackName;
  const releaseNotes = appInfo.releaseNotes;
  const image = appInfo.artworkUrl100;
  const updated: Date = strptime(
    appInfo.currentVersionReleaseDate,
    '%Y-%m-%dT%H:%M:%S%Z',
  );
  const version = appInfo.version;
  const link = 'https://apps.apple.com/jp/app/id' + appId;

  const feed = new Feed({
    title: name + 'for iOS update information.',
    description: name + 'for iOS update information.',
    generator: 'mobileapp-releasse-rss by sakamossan. https://github.com/sakamossan/mobileapp-release-rss',
    id: link,
    link: link,
    updated: updated,
    language: 'ja', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: image,
    favicon: 'https://www.apple.com/favicon.ico',
    copyright: 'Crawled from App Store',
    feedLinks: {},
    author: {},
  });
  feed.addItem({
    title: name + ' for iOS updated. version:' + version,
    guid: `iOS:${appId}:v:${version}`,
    link: link,
    description: releaseNotes,
    date: updated,
  });
  return feed.rss2();
}
