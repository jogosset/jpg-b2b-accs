export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const cells = [...row.children];

    const titleText = cells[0]?.textContent.trim() || '';
    const bodyCell = cells[1] || null;
    const bgColor = cells[2]?.textContent.trim() || '';
    const textColor = cells[3]?.textContent.trim() || '';

    if (bgColor) li.style.backgroundColor = bgColor;
    if (textColor) li.style.color = textColor;

    if (titleText) {
      const h3 = document.createElement('h3');
      h3.textContent = titleText;
      li.append(h3);
    }

    if (bodyCell) {
      const div = document.createElement('div');
      div.className = 'cards-v2-body';
      if (bodyCell.children.length > 0) {
        while (bodyCell.firstChild) div.append(bodyCell.firstChild);
      } else if (bodyCell.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = bodyCell.textContent.trim();
        div.append(p);
      }
      li.append(div);
    }

    ul.append(li);
  });

  block.replaceChildren(ul);
}
