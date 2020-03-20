const getAudio = async word => {
  const site = await fetch(`https://www.lexico.com/definition/${word}`, {
    method: 'GET',
    headers: {'Content-Type': 'text/html'},
  });
  const html = await site.text();
  const getSrc = new RegExp('<audio.+?src="(.+?)".+?/?>');
  const src = html.match(getSrc)[1];

  return src;
};
export default getAudio;
