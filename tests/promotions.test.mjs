import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  dismissPromotion,
  getPromotionCalendarDate,
  isPromotionActive,
  isPromotionDismissed,
} from '../src/utils/promotions.js';

const campaign = {
  enabled: true,
  startDate: '2026-11-10',
  endDate: '2026-12-10',
  timeZone: 'America/Costa_Rica',
  dismissalKey: 'playpop-promotion-nov-dec-2026-dismissed',
};

for (const [timestamp, eligible] of [
  ['2026-11-10T05:59:59.999Z', false],
  ['2026-11-10T06:00:00.000Z', true],
  ['2026-11-20T18:00:00.000Z', true],
  ['2026-12-10T06:00:00.000Z', true],
  ['2026-12-11T05:59:59.999Z', true],
  ['2026-12-11T06:00:00.000Z', false],
]) {
  test(`campaign eligibility at Costa Rica boundary ${timestamp}`, () => {
    assert.equal(isPromotionActive(campaign, new Date(timestamp)), eligible);
  });
}

test('calendar date uses Costa Rica rather than the host time zone or UTC', () => {
  assert.equal(
    getPromotionCalendarDate(new Date('2026-12-11T03:00:00Z'), campaign.timeZone),
    '2026-12-10',
  );
  assert.equal(
    isPromotionActive({ ...campaign, enabled: false }, new Date('2026-11-20T12:00:00Z')),
    false,
  );
  assert.equal(isPromotionActive(campaign, new Date('invalid')), false);
});

test('dismissal reads without writing, persists on close, and uses campaign-specific keys', () => {
  const previous = globalThis.window;
  const data = new Map();
  const writes = [];
  globalThis.window = {
    localStorage: {
      getItem: (key) => data.get(key),
      setItem: (key, value) => {
        data.set(key, value);
        writes.push([key, value]);
      },
    },
  };
  try {
    assert.equal(isPromotionDismissed(campaign), false);
    assert.equal(writes.length, 0);
    dismissPromotion(campaign);
    assert.deepEqual(writes, [[campaign.dismissalKey, 'true']]);
    assert.equal(isPromotionDismissed(campaign), true);
    assert.equal(isPromotionDismissed({ ...campaign, dismissalKey: 'another-campaign' }), false);
  } finally {
    globalThis.window = previous;
  }
});

for (const failure of ['getter', 'read', 'write']) {
  test(`storage ${failure} failure is safe and dismissal remains in memory`, () => {
    const previous = globalThis.window;
    const isolated = { ...campaign, dismissalKey: `restricted-${failure}` };
    globalThis.window =
      failure === 'getter'
        ? {
            get localStorage() {
              throw new Error('SecurityError');
            },
          }
        : {
            localStorage: {
              getItem() {
                if (failure === 'read') throw new Error('SecurityError');
                return null;
              },
              setItem() {
                throw new Error('QuotaExceededError');
              },
            },
          };
    try {
      assert.equal(isPromotionDismissed(isolated), false);
      assert.doesNotThrow(() => dismissPromotion(isolated));
      assert.equal(isPromotionDismissed(isolated), true);
    } finally {
      globalThis.window = previous;
    }
  });
}
