import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const cells = [...row.children];

    const bgColor = cells[2]?.textContent.trim();
    const textColor = cells[3]?.textContent.trim();
    if (bgColor) li.style.backgroundColor = bgColor;
    if (textColor) li.style.color = textColor;

    // Only move image and text columns into li
    if (cells[0]) li.append(cells[0]);
    if (cells[1]) li.append(cells[1]);

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);
}
