export function renderInsturctionsOverlay(ctx: CanvasRenderingContext2D): void {
  const center = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 };
  const title = `שש שעות - המשחק!${'\u200F'}`;
  const rules = [
    'במשחק שש שעות אתם נדרשים לתפוס את האוכל הנופל',
    'שימו לב! אתם בשריים אבל צריכים לאכול כל שעה כדי שהזמן יעבור',
    'אכלתם משהו פרווה? מעולה, עברה שעה',
    'אכלתם בשרי? חבל... שש שעות מתחילות מחדש',
    `אכלתם חלבי? נפסלתם!${'\u200F'}`,
    `איך מנצחים? צריך לאכול משהו חלבי אחרי שהסתיימו שש השעות (שימו לב לפינה השמאלית)${'\u200F'}`,
    'אה, עוד משהו. נפלו שלושה מאכלים פרווה לרצפה? בל תשחית! נפסלתם',
    '',
    `הקש רווח כדי להתחיל...${'\u200F'}`,
  ];

  const startingHeightPoint = ctx.canvas.height / 5;

  ctx.fillStyle = '#44444499';
  ctx.textAlign = 'center';
  ctx.moveTo(center.x, center.y);
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillText(title, center.x, startingHeightPoint);
  ctx.font = '16px Arial';
  rules.forEach((r, idx) => {
    ctx.fillText(r, center.x, startingHeightPoint + 30 + idx * 20);
  });
  ctx.moveTo(-center.x, -center.y);
}

export function renderFailedOverlay(ctx: CanvasRenderingContext2D): void {
  const center = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 };
}
