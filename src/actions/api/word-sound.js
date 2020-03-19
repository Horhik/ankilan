const getAudio = async word => {
  const site = await fetch(word, {
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
