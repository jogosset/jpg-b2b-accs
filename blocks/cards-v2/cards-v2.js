export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'cards-v2-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-v2-card';

    const cells = [...row.children];
    const titleText = cells[0]?.textContent.trim() || '';
    const bodyCell = cells[1] || null;
    const bgColor = cells[2]?.textContent.trim() || '';
    const textColor = cells[3]?.textContent.trim() || '';

    // Apply per-card colors as CSS custom properties on the <li>
    if (bgColor) li.style.setProperty('--cv2-bg', bgColor);
    if (textColor) li.style.setProperty('--cv2-text', textColor);

    // Title
    if (titleText) {
      const h3 = document.createElement('h3');
      h3.className = 'cards-v2-title';
      h3.textContent = titleText;
      li.append(h3);
    }

    // Body — preserve richtext HTML from the source cell
    if (bodyCell) {
      const bodyDiv = document.createElement('div');
      bodyDiv.className = 'cards-v2-body';
      if (bodyCell.children.length > 0) {
        while (bodyCell.firstChild) bodyDiv.append(bodyCell.firstChild);
      } else {
        const p = document.createElement('p');
        p.textContent = bodyCell.textContent.trim();
        bodyDiv.append(p);
      }
      li.append(bodyDiv);
    }

    ul.append(li);
  });

  block.replaceChildren(ul);
}
