function renderInTheMiddle(
  ctx: CanvasRenderingContext2D,
  title: string,
  texts: string[],
): void {
  const center = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 };
  const startingHeightPoint = ctx.canvas.height / 5;

  ctx.fillStyle = '#44444499';
  ctx.textAlign = 'center';
  ctx.moveTo(center.x, center.y);
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillText(title, center.x, startingHeightPoint);
  ctx.font = '16px Arial';
  texts.forEach((r, idx) => {
    ctx.fillText(r, center.x, startingHeightPoint + 30 + idx * 20);
  });
  ctx.moveTo(-center.x, -center.y);
}

export function renderInsturctionsOverlay(ctx: CanvasRenderingContext2D): void {
  const title = `שש שעות - המשחק!${'\u200F'}`;
  const rules = [
    'במשחק שש שעות אתם נדרשים לתפוס את האוכל הנופל',
    'שימו לב! אתם בשריים אבל צריכים לאכול כל שעה כדי שהזמן יעבור',
    'אכלתם משהו פרווה? מעולה, עברה שעה',
    'אכלתם בשרי? חבל... שש שעות מתחילות מחדש',
    `אכלתם חלבי? נפסלתם!${'\u200F'}`,
    `איך מנצחים? צריך לאכול משהו חלבי אחרי שהסתיימו שש השעות (שימו לב לפינה השמאלית)${'\u200F'}`,
    'אה, עוד משהו. נפלו שלושה מאכלים פרווה לרצפה? נפסלתם',
    '',
    'השליטה במשחק בעזרת מקשי החיצים',
    '',
    `הקש רווח כדי להתחיל...${'\u200F'}`,
  ];

  renderInTheMiddle(ctx, title, rules);
}

export function renderFailedOverlay(ctx: CanvasRenderingContext2D): void {
  const title = `אכלת חלבי לפני הזמן 😦${'\u200F'}`;
  const texts = [
    'לא שופטים אותך, אתה בטח הולנדי או משהו',
    `מצד שני, אם אתה הולנדי מה אתה מחפש באפליקציה של שש שעות?${'\u200F'}`,
  ];

  renderInTheMiddle(ctx, title, texts);
}

export function renderSuccessfulOverlay(ctx: CanvasRenderingContext2D): void {
  const title = `הצלחת!${'\u200F'}`;
  const texts = [
    `אין כמו כוס קפה שמחכים לה שש שעות, לא?${'\u200F'}`,
    `או שאתה מאלו שאוהבים את תשעת הימים?${'\u200F'}`,
  ];
  renderInTheMiddle(ctx, title, texts);
}

export function renderTooManyMisses(ctx: CanvasRenderingContext2D): void {
  const title = `הפלת יותר מדי אוכל${'\u200F'}`;
  const texts = [
    `אנחנו יודעים שאוכל פרווה הוא לא תמיד טעים${'\u200F'}`,
    `אבל באמת! יש באפריקה מלא ילדים רעבים${'\u200F'}`,
    'והלוואי שלי היה כזה אוכל כשאני הייתי ילד',
    `ומה שווה כל השש שעות הזה עם כזה בל תשחית?${'\u200F'}`,
  ];
  renderInTheMiddle(ctx, title, texts);
}
