const getAudio = async url => {
  const site = await fetch(url, {
    method: 'GET',
    headers: {'Content-Type': 'text/html'},
  });
  const html = await site.text();
  const getSrc = new RegExp('<audio.+?src="(.+?)".+?/?>');
  const src = html.match(getSrc)[1];
  console.log(src);

  return src;
};
export default getAudio;
