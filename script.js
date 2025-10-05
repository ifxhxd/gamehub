async function init(){
  const res = await fetch('games.json');
  const games = await res.json();
  const grid = document.getElementById('grid');
  const tpl = document.getElementById('card-template');

  function render(list){
    grid.innerHTML = '';
    list.forEach(g => {
      const node = tpl.content.cloneNode(true);
      node.querySelector('.thumb').src = g.thumb || 'images/fallback.jpg';
      node.querySelector('.thumb').alt = g.title;
      node.querySelector('.title').textContent = g.title;
      node.querySelector('.desc').textContent = g.desc;
      node.querySelector('.tags').textContent = (g.tags||[]).join(' • ');
      const actions = node.querySelector('.actions');

      if(g.storeUrl){
        const a = document.createElement('a'); a.href = g.storeUrl; a.textContent = 'Bekijk winkel'; a.target='_blank'; a.rel='noopener';
        actions.appendChild(a);
      }
      if(g.downloadUrl){
        const b = document.createElement('a'); b.href = g.downloadUrl; b.textContent = 'Download'; b.target='_blank'; b.rel='noopener';
        actions.appendChild(b);
      }
      grid.appendChild(node);
    });
  }

  document.getElementById('search').addEventListener('input', (e)=>{
    const q = e.target.value.toLowerCase();
    render(games.filter(g=> (g.title + ' ' + g.desc + ' ' + (g.tags||[]).join(' ')).toLowerCase().includes(q)));
  });

  render(games);
}

init().catch(e=> console.error(e));
