const clean = require('../app/lib/clean');

describe('clean.forFields', () => {
  test('returns object when field is present', () => {
    const obj = { id: 1, title: 'Test' };
    expect(clean.forFields(obj, 'title')).toEqual(obj);
  });

  test('returns false when field is empty', () => {
    const obj = { id: 1, title: ' ' };
    expect(clean.forFields(obj, 'title')).toBe(false);
  });

  test('returns false when field is missing', () => {
    const obj = { id: 1 };
    expect(clean.forFields(obj, 'title')).toBe(false);
  });

  test('supports array of required fields', () => {
    const obj = { id: 1, title: 'A', author: 'me' };
    expect(clean.forFields(obj, ['title', 'author'])).toEqual(obj);
  });

  test('matches object specification', () => {
    const obj = { id: 1, format: 'epub' };
    expect(clean.forFields(obj, { format: 'epub' })).toEqual(obj);
  });

  test('filters array of objects', () => {
    const data = [
      { id: 1, title: 'A' },
      { id: 2, title: '' },
      { id: 3, title: 'C' }
    ];
    expect(clean.forFields(data, 'title')).toEqual([
      { id: 1, title: 'A' },
      { id: 3, title: 'C' }
    ]);
  });
});

describe('clean.dups', () => {
  test('removes duplicate entries by id', () => {
    const items = [
      { id: 1, title: 'A' },
      { id: 2, title: 'B' },
      { id: 1, title: 'A again' }
    ];
    expect(clean.dups(items)).toEqual([
      { id: 1, title: 'A' },
      { id: 2, title: 'B' }
    ]);
  });
});
